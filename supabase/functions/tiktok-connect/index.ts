import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TIKTOK_CLIENT_KEY = Deno.env.get('TIKTOK_CLIENT_KEY');
    
    if (!TIKTOK_CLIENT_KEY) {
      return new Response(JSON.stringify({ error: 'TikTok OAuth not configured', demo: true }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const redirectUri = 'https://cliptoclick.lovable.app/api/tiktok/callback';
    const scope = 'user.info.basic,video.list';
    
    const authUrl = `https://www.tiktok.com/v2/auth/authorize?client_key=${TIKTOK_CLIENT_KEY}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

    return new Response(JSON.stringify({ authUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in tiktok-connect:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
