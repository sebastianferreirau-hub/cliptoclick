import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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
    const REDIRECT_URI = 'https://fkyzmwpkdrorocyosbyh.supabase.co/functions/v1/instagram-callback';
    
    // Get authenticated user
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    
    if (userError || !user) {
      console.error('User authentication error:', userError);
      return new Response(JSON.stringify({ error: 'User not authenticated' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Create state parameter with user_id encoded
    const stateData = {
      user_id: user.id,
      timestamp: Date.now(),
      nonce: crypto.randomUUID()
    };
    const state = btoa(JSON.stringify(stateData));
    
    console.log('Instagram OAuth initiate request');
    console.log('FB_APP_ID:', FB_APP_ID);
    console.log('REDIRECT_URI:', REDIRECT_URI);
    console.log('User ID:', user.id);

    // Instagram OAuth scopes for Instagram Business Account access
    const scope = 'pages_show_list,instagram_basic,instagram_manage_insights,pages_read_engagement';
    
    // Build OAuth URL
    const authUrl = new URL('https://www.facebook.com/v21.0/dialog/oauth');
    authUrl.searchParams.set('client_id', FB_APP_ID);
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('state', state);

    console.log('Instagram OAuth initiated successfully');

    // Redirect user to Facebook OAuth
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': authUrl.toString(),
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
