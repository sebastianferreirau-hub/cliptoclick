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
    const SNAPCHAT_CLIENT_ID = Deno.env.get('SNAPCHAT_CLIENT_ID');
    
    if (!SNAPCHAT_CLIENT_ID) {
      return new Response(JSON.stringify({ error: 'Snapchat OAuth not configured', demo: true }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const redirectUri = 'https://cliptoclick.lovable.app/api/snapchat/callback';
    const scope = 'user.display_name';
    
    const authUrl = `https://accounts.snapchat.com/login/oauth2/authorize?client_id=${SNAPCHAT_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;

    return new Response(JSON.stringify({ authUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in snapchat-connect:', error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
