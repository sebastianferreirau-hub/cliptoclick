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
    const FB_APP_ID = Deno.env.get('FB_APP_ID') || '1361999862058324';
    const REDIRECT_URI = Deno.env.get('REDIRECT_URI') || 'https://cliptoclick.lovable.app/api/instagram/callback';
    
    console.log('Instagram OAuth initiate request');
    console.log('FB_APP_ID:', FB_APP_ID);
    console.log('REDIRECT_URI:', REDIRECT_URI);

    // Instagram OAuth scopes for Instagram Business Account access
    const scope = 'pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement';
    
    // Construct Facebook OAuth URL (Instagram uses Facebook's OAuth)
    const authUrl = `https://www.facebook.com/v21.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(scope)}&response_type=code&state=${Math.random().toString(36).substring(7)}`;

    console.log('Redirecting to:', authUrl);

    // Redirect user to Facebook OAuth
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': authUrl,
      },
    });
  } catch (error) {
    console.error('Error in instagram-connect:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      details: 'Failed to initiate Instagram OAuth flow'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
