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

  try {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
      throw new Error('No authorization code provided');
    }

    const FB_APP_ID = Deno.env.get('FB_APP_ID');
    const FB_APP_SECRET = Deno.env.get('FB_APP_SECRET');
    
    if (!FB_APP_ID || !FB_APP_SECRET) {
      throw new Error('Instagram OAuth not configured');
    }

    const redirectUri = 'https://cliptoclick.lovable.app/api/instagram/callback';
    
    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`
    );
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error('Failed to get access token');
    }

    // Get user info
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Unauthorized');
    }

    // Update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ instagram_connected: true })
      .eq('id', user.id);

    if (updateError) {
      throw new Error('Failed to update profile');
    }

    // Redirect back to dashboard
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://cliptoclick.lovable.app/dashboard',
      },
    });
  } catch (error) {
    console.error('Error in instagram-callback:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
