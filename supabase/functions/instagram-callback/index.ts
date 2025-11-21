import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const url = new URL(req.url);

    // Handle data deletion callback (required by Facebook/Instagram)
    const hub_mode = url.searchParams.get('hub.mode');
    if (hub_mode === 'subscribe') {
      const hub_challenge = url.searchParams.get('hub.challenge');
      return new Response(hub_challenge, { status: 200 });
    }

    const state = url.searchParams.get('state');
    const code = url.searchParams.get('code');
    const oauthError = url.searchParams.get('error');

    if (oauthError) {
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': `https://cliptoclick.lovable.app/dashboard?error=${encodeURIComponent(oauthError)}`,
        },
      });
    }

    if (!state || !code) {
      console.error('Missing state or code parameter');
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://cliptoclick.lovable.app/dashboard?error=missing_parameters',
        },
      });
    }

    // Decode state to get user_id
    let userId: string;
    try {
      const stateData = JSON.parse(atob(state));
      userId = stateData.user_id;
      
      if (!userId) {
        throw new Error('No user_id in state');
      }

      // Optional: validate timestamp (state should be used within 10 minutes)
      if (stateData.timestamp && Date.now() - stateData.timestamp > 10 * 60 * 1000) {
        throw new Error('State expired');
      }
    } catch (error) {
      console.error('State decode/validation error:', error);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://cliptoclick.lovable.app/dashboard?error=invalid_state',
        },
      });
    }

    const FB_APP_ID = Deno.env.get('FB_APP_ID') || '1361999862058324';
    const FB_APP_SECRET = Deno.env.get('FB_APP_SECRET');
    const REDIRECT_URI = 'https://fkyzmwpkdrorocyosbyh.supabase.co/functions/v1/instagram-callback';
    
    // Verify FB_APP_SECRET is loaded
    console.log('FB_APP_SECRET loaded:', !!FB_APP_SECRET);
    console.log('FB_APP_ID:', FB_APP_ID);
    
    if (!FB_APP_SECRET) {
      throw new Error('FB_APP_SECRET not configured');
    }

    console.log('Instagram OAuth callback received');
    console.log('Exchanging code for access token...');
    console.log('Request parameters:', { code: code?.substring(0, 10) + '...', state: state?.substring(0, 20) + '...' });

    // Exchange code for access token
    const tokenUrl = `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    console.log('Token exchange URL (without secret):', tokenUrl.replace(FB_APP_SECRET, 'REDACTED'));
    
    const tokenResponse = await fetch(tokenUrl);
    
    console.log('Token exchange HTTP status:', tokenResponse.status);
    const tokenData = await tokenResponse.json();
    console.log('Token exchange full response:', JSON.stringify(tokenData, null, 2));
    console.log('Token exchange response:', { success: !!tokenData.access_token });
    
    if (!tokenData.access_token) {
      throw new Error(`Failed to get access token: ${JSON.stringify(tokenData)}`);
    }

    const accessToken = tokenData.access_token;

    // Get token inspection to see granted scopes
    console.log('Inspecting access token for granted scopes...');
    const inspectResponse = await fetch(
      `https://graph.facebook.com/v21.0/debug_token?input_token=${accessToken}&access_token=${FB_APP_ID}|${FB_APP_SECRET}`
    );
    const inspectData = await inspectResponse.json();
    console.log('Token inspection response:', JSON.stringify(inspectData, null, 2));
    
    if (inspectData.data?.scopes) {
      console.log('Granted scopes:', inspectData.data.scopes);
      console.log('Has pages_show_list:', inspectData.data.scopes.includes('pages_show_list'));
      console.log('Has pages_read_engagement:', inspectData.data.scopes.includes('pages_read_engagement'));
      console.log('Has instagram_basic:', inspectData.data.scopes.includes('instagram_basic'));
      console.log('Has instagram_manage_insights:', inspectData.data.scopes.includes('instagram_manage_insights'));
    } else {
      console.log('Could not retrieve granted scopes');
    }

    // Get user's Facebook Pages
    console.log('Fetching Facebook Pages...');
    const pagesUrl = `https://graph.facebook.com/v21.0/me/accounts?access_token=${accessToken}`;
    console.log('Pages API URL:', pagesUrl.replace(accessToken, 'REDACTED'));
    
    const pagesResponse = await fetch(pagesUrl);
    console.log('Pages API HTTP status:', pagesResponse.status);
    
    const pagesData = await pagesResponse.json();
    console.log('Pages API FULL response:', JSON.stringify(pagesData, null, 2));
    console.log('Pages found:', pagesData.data?.length || 0);
    
    if (pagesData.error) {
      console.error('Facebook API error:', JSON.stringify(pagesData.error));
      throw new Error(`Facebook API error: ${pagesData.error.message} (code: ${pagesData.error.code})`);
    }
    
    let pages = pagesData.data || [];
    
    // GRANULAR_SCOPES FALLBACK: If no pages from /me/accounts, try direct fetch
    if (pages.length === 0) {
      console.log('No pages from /me/accounts, trying granular_scopes fallback');
      
      const granularScopes = inspectData.data?.granular_scopes || [];
      const pageScope = granularScopes.find((s: any) => 
        s.scope === 'pages_show_list' && s.target_ids && s.target_ids.length > 0
      );
      
      if (pageScope && pageScope.target_ids) {
        console.log('Found page IDs in granular_scopes:', pageScope.target_ids);
        
        // Fetch each page directly by ID
        for (const pageId of pageScope.target_ids) {
          try {
            console.log(`Fetching page ${pageId} directly`);
            const pageUrl = `https://graph.facebook.com/v21.0/${pageId}?fields=id,name,access_token&access_token=${accessToken}`;
            const pageResponse = await fetch(pageUrl);
            
            if (pageResponse.ok) {
              const pageData = await pageResponse.json();
              console.log(`Page ${pageId} data:`, pageData);
              pages.push(pageData);
            } else {
              const errorText = await pageResponse.text();
              console.error(`Failed to fetch page ${pageId}:`, pageResponse.status, errorText);
            }
          } catch (error) {
            console.error(`Error fetching page ${pageId}:`, error);
          }
        }
        
        console.log(`Granular scopes fallback: ${pages.length} pages found`);
      } else {
        console.log('No page IDs found in granular_scopes');
      }
    }
    
    if (pages.length === 0) {
      console.error('No pages found after both /me/accounts and granular_scopes attempts');
      console.error('This could mean:');
      console.error('1. User has no Facebook Pages');
      console.error('2. Missing pages_show_list permission');
      console.error('3. User did not grant page access during OAuth');
      throw new Error('No Facebook Pages found. You need a Facebook Page connected to an Instagram Business Account.');
    }

    // Get Instagram Business Accounts for each page
    const instagramAccounts = [];
    for (const page of pages) {
      console.log(`Checking page: ${page.name} (${page.id})`);
      
      const igResponse = await fetch(
        `https://graph.facebook.com/v21.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`
      );
      
      const igData = await igResponse.json();
      
      if (igData.instagram_business_account) {
        console.log('Instagram Business Account found:', igData.instagram_business_account.id);
        
        // Get Instagram account details
        const igDetailsResponse = await fetch(
          `https://graph.facebook.com/v21.0/${igData.instagram_business_account.id}?fields=id,username,profile_picture_url,followers_count&access_token=${page.access_token}`
        );
        
        const igDetails = await igDetailsResponse.json();
        console.log('Instagram account details:', igDetails.username);
        
        instagramAccounts.push({
          instagram_id: igDetails.id,
          instagram_username: igDetails.username,
          profile_picture_url: igDetails.profile_picture_url,
          followers_count: igDetails.followers_count,
          page_id: page.id,
          page_name: page.name,
          access_token: page.access_token, // Use page access token for Instagram API calls
        });
      }
    }

    if (instagramAccounts.length === 0) {
      console.error('No Instagram Business Accounts found');
      await supabase.from('oauth_states').delete().eq('state', state);
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          'Location': 'https://cliptoclick.lovable.app/dashboard?instagram_error=no_instagram_account',
        },
      });
    }

    console.log('Found Instagram accounts:', instagramAccounts.length);
    console.log('User ID from state:', userId);

    // Store all Instagram accounts
    for (const account of instagramAccounts) {
      const { error: insertError } = await supabase
        .from('instagram_accounts')
        .upsert({
          user_id: userId,
          instagram_id: account.instagram_id,
          instagram_username: account.instagram_username,
          profile_picture_url: account.profile_picture_url,
          followers_count: account.followers_count,
          page_id: account.page_id,
          page_name: account.page_name,
          access_token: account.access_token,
          token_expires_at: null, // Page tokens don't expire if properly maintained
          connected_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,instagram_id'
        });

      if (insertError) {
        console.error('Error storing Instagram account:', insertError);
        return new Response(null, {
          status: 302,
          headers: {
            ...corsHeaders,
            'Location': 'https://cliptoclick.lovable.app/dashboard?instagram_error=save_failed',
          },
        });
      }
    }

    // Update profile to mark Instagram as connected
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        instagram_connected: true,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating profile:', updateError);
    }

    console.log('Instagram OAuth completed successfully');

    // Trigger analytics fetch in the background (don't wait for it)
    console.log('Triggering Instagram insights fetch...');
    const authHeader = `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`;
    fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/fetch-instagram-insights`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
    }).then(() => {
      console.log('Instagram insights fetch initiated');
    }).catch((error) => {
      console.error('Failed to trigger insights fetch:', error);
    });

    // Redirect back to dashboard with success
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': `https://cliptoclick.lovable.app/dashboard?connected=instagram&accounts=${instagramAccounts.length}`,
      },
    });
  } catch (error) {
    console.error('Error in instagram-callback:', error);
    
    // Redirect to dashboard with error
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://cliptoclick.lovable.app/dashboard?instagram_error=token_exchange_failed',
      },
    });
  }
});
