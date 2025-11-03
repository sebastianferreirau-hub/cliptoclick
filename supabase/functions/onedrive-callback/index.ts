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

    const MS_CLIENT_ID = Deno.env.get('MS_CLIENT_ID');
    const MS_CLIENT_SECRET = Deno.env.get('MS_CLIENT_SECRET');
    const tenant = Deno.env.get('MS_TENANT') || 'common';
    
    if (!MS_CLIENT_ID || !MS_CLIENT_SECRET) {
      throw new Error('OneDrive OAuth not configured');
    }

    const redirectUri = 'https://cliptoclick.lovable.app/api/onedrive/callback';
    
    // Exchange code for access token
    const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: MS_CLIENT_ID,
        client_secret: MS_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    });
    
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
      .update({ onedrive_connected: true })
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
    console.error('Error in onedrive-callback:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
