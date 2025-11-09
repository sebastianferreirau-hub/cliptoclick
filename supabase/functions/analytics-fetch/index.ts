import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Demo data generator
function getDemoData(provider: string, range: string) {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  
  // Provider-specific base metrics
  const providerMetrics = {
    instagram: { views: 125000, reach: 98000, followers: 15400 },
    tiktok: { views: 450000, reach: 380000, followers: 28900 },
    facebook: { views: 210000, reach: 175000, followers: 18200 },
    snapchat: { views: 89000, reach: 72000, followers: 12100 },
  };
  
  const metrics = providerMetrics[provider as keyof typeof providerMetrics] || providerMetrics.instagram;
  const multiplier = range === '7d' ? 0.2 : range === '30d' ? 1 : 3;
  
  return {
    provider,
    range,
    metrics: {
      totalViews: Math.floor(metrics.views * multiplier),
      totalReach: Math.floor(metrics.reach * multiplier),
      followers: metrics.followers,
      engagementRate: (Math.random() * 5 + 2).toFixed(2),
    },
    dailyViews: Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      views: Math.floor(Math.random() * 5000) + 1000,
    })),
    topPosts: Array.from({ length: 5 }, (_, i) => ({
      id: `post-${i + 1}`,
      title: `Post de ejemplo ${i + 1}`,
      date: new Date(Date.now() - Math.random() * days * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      views: Math.floor(Math.random() * 20000) + 5000,
      engagementRate: (Math.random() * 8 + 1).toFixed(2),
      url: `#demo-post-${i + 1}`,
    })),
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const provider = url.searchParams.get('provider') || 'instagram';
    const range = url.searchParams.get('range') || '30d';
    const demo = url.searchParams.get('demo') === 'true';

    // Always return demo data for now (real API integration would go here)
    const data = getDemoData(provider, range);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analytics-fetch:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
