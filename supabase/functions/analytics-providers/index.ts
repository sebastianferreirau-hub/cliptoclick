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

    // Get profile connection status
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('instagram_connected, tiktok_connected, snapchat_connected')
      .eq('id', user.id)
      .single();

    if (profileError) {
      throw new Error('Failed to get profile');
    }

    // Check if secrets are configured
    const providers = {
      instagram: {
        connected: profile?.instagram_connected || false,
        configured: !!Deno.env.get('FB_APP_ID') && !!Deno.env.get('FB_APP_SECRET'),
      },
      tiktok: {
        connected: profile?.tiktok_connected || false,
        configured: !!Deno.env.get('TIKTOK_CLIENT_KEY') && !!Deno.env.get('TIKTOK_CLIENT_SECRET'),
      },
      snapchat: {
        connected: profile?.snapchat_connected || false,
        configured: !!Deno.env.get('SNAPCHAT_CLIENT_ID') && !!Deno.env.get('SNAPCHAT_CLIENT_SECRET'),
      },
    };

    return new Response(JSON.stringify({ providers }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analytics-providers:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
