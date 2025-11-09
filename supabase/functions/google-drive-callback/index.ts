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
    const state = url.searchParams.get('state');

    if (!code) {
      throw new Error('No authorization code received');
    }

    const clientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');
    const redirectUri = `${Deno.env.get('SUPABASE_URL')}/functions/v1/google-drive-callback`;

    if (!clientId || !clientSecret) {
      throw new Error('Google OAuth credentials not configured');
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange failed:', error);
      throw new Error('Failed to exchange authorization code');
    }

    const tokens = await tokenResponse.json();
    console.log('Successfully obtained Google Drive tokens');

    // Get user info from the token to find their Supabase user
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });

    const userInfo = await userInfoResponse.json();
    console.log('Google user email:', userInfo.email);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find user by email
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', userInfo.email)
      .single();

    if (profileError || !profile) {
      console.error('Profile lookup error:', profileError);
      throw new Error('Could not find user profile');
    }

    // Store tokens
    const expiresAt = new Date(Date.now() + (tokens.expires_in * 1000));
    
    const { error: tokenError } = await supabase
      .from('integration_tokens')
      .upsert({
        user_id: profile.id,
        provider: 'google_drive',
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: expiresAt.toISOString(),
      }, {
        onConflict: 'user_id,provider'
      });

    if (tokenError) {
      console.error('Token storage error:', tokenError);
      throw new Error('Failed to store tokens');
    }

    // Update profile
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ google_drive_connected: true })
      .eq('id', profile.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      throw new Error('Failed to update profile');
    }

    console.log('Google Drive connection successful for user:', profile.id);

    // Redirect back to dashboard
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${Deno.env.get('VITE_SUPABASE_URL')?.replace('https://', 'https://cliptoclick.lovable.app') || 'https://cliptoclick.lovable.app'}/dashboard`,
      },
    });
  } catch (error) {
    console.error('Error in google-drive-callback:', error);
    
    // Redirect to dashboard with error
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `${Deno.env.get('VITE_SUPABASE_URL')?.replace('https://', 'https://cliptoclick.lovable.app') || 'https://cliptoclick.lovable.app'}/dashboard?error=google_drive_auth_failed`,
      },
    });
  }
});