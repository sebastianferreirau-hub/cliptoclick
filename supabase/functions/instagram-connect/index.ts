import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const FB_APP_ID = Deno.env.get('FB_APP_ID') || '1361999862058324'
const REDIRECT_URI = 'https://fkyzmwpkdrorocyosbyh.supabase.co/functions/v1/instagram-callback'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const state = url.searchParams.get('state')

    if (!state) {
      return new Response(
        JSON.stringify({ error: 'Missing state parameter' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Validate state
    try {
      const stateData = JSON.parse(atob(state))
      
      if (!stateData.user_id) {
        throw new Error('Invalid state: missing user_id')
      }
      
      // Check if state is expired (10 minutes)
      if (Date.now() - stateData.timestamp > 10 * 60 * 1000) {
        throw new Error('State expired')
      }
    } catch (error) {
      console.error('State validation error:', error)
      return Response.redirect(
        'https://cliptoclick.lovable.app/dashboard?error=invalid_state',
        302
      )
    }

    // Build OAuth URL with ALL required scopes
    const scopes = [
      'public_profile',
      'email',
      'pages_show_list',              // CRITICAL - was missing
      'pages_manage_metadata',
      'instagram_basic',
      'pages_read_engagement',
      'instagram_manage_insights'
    ].join(',')

    const authUrl = new URL('https://www.facebook.com/v21.0/dialog/oauth')
    authUrl.searchParams.set('client_id', FB_APP_ID)
    authUrl.searchParams.set('redirect_uri', REDIRECT_URI)
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('state', state)
    authUrl.searchParams.set('auth_type', 'rerequest')  // Force re-requesting permissions

    console.log('OAuth URL:', authUrl.toString())  // For debugging

    return Response.redirect(authUrl.toString(), 302)

  } catch (error: any) {
    console.error('Instagram connect error:', error)
    return Response.redirect(
      `https://cliptoclick.lovable.app/dashboard?error=${encodeURIComponent(error.message)}`,
      302
    )
  }
})
