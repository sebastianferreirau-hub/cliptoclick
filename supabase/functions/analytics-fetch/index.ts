import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Demo data generator
function getDemoData(provider: string, range: string) {
  const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
  
  return {
    provider,
    range,
    metrics: {
      totalViews: Math.floor(Math.random() * 100000) + 50000,
      totalReach: Math.floor(Math.random() * 80000) + 30000,
      followers: Math.floor(Math.random() * 50000) + 10000,
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
