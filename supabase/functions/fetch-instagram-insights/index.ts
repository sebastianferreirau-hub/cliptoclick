import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    console.log('Fetching Instagram insights for user:', user.id);

    // Get user's Instagram account
    const { data: instagramAccount, error: accountError } = await supabase
      .from('instagram_accounts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (accountError || !instagramAccount) {
      throw new Error('No Instagram account connected');
    }

    console.log('Instagram account found:', instagramAccount.instagram_id);

    const accessToken = instagramAccount.access_token;
    const instagramBusinessAccountId = instagramAccount.instagram_id;

    // Fetch user's media (posts)
    console.log('Fetching media from Instagram API...');
    const mediaUrl = `https://graph.facebook.com/v21.0/${instagramBusinessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count&limit=50&access_token=${accessToken}`;
    
    const mediaResponse = await fetch(mediaUrl);
    if (!mediaResponse.ok) {
      const errorText = await mediaResponse.text();
      console.error('Media fetch failed:', mediaResponse.status, errorText);
      throw new Error(`Failed to fetch media: ${errorText}`);
    }

    const mediaData = await mediaResponse.json();
    console.log(`Found ${mediaData.data?.length || 0} posts`);

    if (!mediaData.data || mediaData.data.length === 0) {
      console.log('No posts found, returning empty metrics');
      
      // Upsert empty metrics
      await supabase
        .from('instagram_metrics')
        .upsert({
          user_id: user.id,
          instagram_account_id: instagramBusinessAccountId,
          posts_this_week: 0,
          total_impressions: 0,
          total_reach: 0,
          total_engagement: 0,
          engagement_rate: 0,
          last_updated: new Date().toISOString(),
        }, {
          onConflict: 'user_id,instagram_account_id'
        });

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'No posts found',
        metrics: {
          posts_this_week: 0,
          total_impressions: 0,
          total_reach: 0,
          total_engagement: 0,
          engagement_rate: 0
        }
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch insights for each post
    const postsWithInsights = [];
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    for (const post of mediaData.data) {
      console.log(`Fetching insights for post ${post.id}`);
      
      try {
        const insightsUrl = `https://graph.facebook.com/v21.0/${post.id}/insights?metric=impressions,reach,engagement,saved&access_token=${accessToken}`;
        const insightsResponse = await fetch(insightsUrl);
        
        if (insightsResponse.ok) {
          const insightsData = await insightsResponse.json();
          
          const insights = {
            impressions: 0,
            reach: 0,
            engagement: 0,
            saved: 0,
          };

          if (insightsData.data) {
            for (const metric of insightsData.data) {
              if (metric.name === 'impressions') insights.impressions = metric.values?.[0]?.value || 0;
              if (metric.name === 'reach') insights.reach = metric.values?.[0]?.value || 0;
              if (metric.name === 'engagement') insights.engagement = metric.values?.[0]?.value || 0;
              if (metric.name === 'saved') insights.saved = metric.values?.[0]?.value || 0;
            }
          }

          postsWithInsights.push({
            ...post,
            ...insights,
          });

          // Store in database
          await supabase
            .from('instagram_posts')
            .upsert({
              user_id: user.id,
              instagram_account_id: instagramBusinessAccountId,
              media_id: post.id,
              caption: post.caption || null,
              media_type: post.media_type,
              media_url: post.media_url || post.thumbnail_url || null,
              permalink: post.permalink,
              timestamp: post.timestamp,
              like_count: post.like_count || 0,
              comments_count: post.comments_count || 0,
              impressions: insights.impressions,
              reach: insights.reach,
              engagement: insights.engagement,
              saved: insights.saved,
              shares: 0, // Instagram API doesn't provide shares directly
            }, {
              onConflict: 'media_id'
            });

        } else {
          console.error(`Failed to fetch insights for post ${post.id}`);
          postsWithInsights.push(post);
        }
      } catch (error) {
        console.error(`Error fetching insights for post ${post.id}:`, error);
        postsWithInsights.push(post);
      }
    }

    // Calculate aggregated metrics
    let postsThisWeek = 0;
    let totalImpressions = 0;
    let totalReach = 0;
    let totalEngagement = 0;

    for (const post of postsWithInsights) {
      const postDate = new Date(post.timestamp);
      
      if (postDate >= oneWeekAgo) {
        postsThisWeek++;
      }

      totalImpressions += post.impressions || 0;
      totalReach += post.reach || 0;
      totalEngagement += post.engagement || 0;
    }

    const engagementRate = totalImpressions > 0 
      ? (totalEngagement / totalImpressions) * 100 
      : 0;

    console.log('Calculated metrics:', {
      postsThisWeek,
      totalImpressions,
      totalReach,
      totalEngagement,
      engagementRate: engagementRate.toFixed(2)
    });

    // Store aggregated metrics
    const { error: metricsError } = await supabase
      .from('instagram_metrics')
      .upsert({
        user_id: user.id,
        instagram_account_id: instagramBusinessAccountId,
        posts_this_week: postsThisWeek,
        total_impressions: totalImpressions,
        total_reach: totalReach,
        total_engagement: totalEngagement,
        engagement_rate: parseFloat(engagementRate.toFixed(2)),
        last_updated: new Date().toISOString(),
      }, {
        onConflict: 'user_id,instagram_account_id'
      });

    if (metricsError) {
      console.error('Error storing metrics:', metricsError);
    }

    return new Response(JSON.stringify({ 
      success: true,
      posts_processed: postsWithInsights.length,
      metrics: {
        posts_this_week: postsThisWeek,
        total_impressions: totalImpressions,
        total_reach: totalReach,
        total_engagement: totalEngagement,
        engagement_rate: parseFloat(engagementRate.toFixed(2))
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-instagram-insights:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ 
      error: errorMessage
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
