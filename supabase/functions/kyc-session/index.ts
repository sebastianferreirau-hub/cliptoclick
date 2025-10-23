
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface KycSessionRequest {
  userId: string;
  legalName?: string;
  countryCode?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const userResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      throw new Error('Invalid authentication');
    }

    const user = await userResponse.json();

    const body: KycSessionRequest = await req.json();
    const { userId, legalName, countryCode } = body;

    console.log('Creating KYC session for user:', userId);

    // Verify user is requesting KYC for themselves
    if (userId !== user.id) {
      throw new Error('Unauthorized: Cannot create KYC session for another user');
    }

    // Check if user already has a pending KYC session
    const existingResponse = await fetch(
      `${supabaseUrl}/rest/v1/kyc_records?user_id=eq.${userId}&status=eq.pending&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );
    const existingData = await existingResponse.json();
    const existingKyc = existingData[0];

    if (existingKyc) {
      console.log('Returning existing KYC session:', existingKyc.reference);
      return new Response(
        JSON.stringify({
          sessionUrl: `https://demo-kyc.example.com/verify/${existingKyc.reference}`,
          reference: existingKyc.reference,
          status: 'pending',
          message: 'Existing KYC session found',
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate unique reference
    const reference = `KYC-${Date.now()}-${userId.substring(0, 8)}`;
    const provider = 'stub-kyc';

    // Create KYC record
    const createResponse = await fetch(`${supabaseUrl}/rest/v1/kyc_records`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        user_id: userId,
        provider,
        status: 'pending',
        reference,
        started_at: new Date().toISOString(),
      }),
    });

    if (!createResponse.ok) {
      console.error('Error creating KYC record');
      throw new Error('Failed to create KYC record');
    }

    const kycRecord = (await createResponse.json())[0];

    // Update creator record if legal name or country provided
    if (legalName || countryCode) {
      const updateData: any = { kyc_status: 'pending' };
      if (legalName) updateData.legal_name = legalName;
      if (countryCode) updateData.country_code = countryCode;

      await fetch(`${supabaseUrl}/rest/v1/creators?user_id=eq.${userId}`, {
        method: 'PATCH',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
    }

    console.log('KYC session created successfully:', reference);

    // Return session URL and reference
    const sessionUrl = `https://demo-kyc.example.com/verify/${reference}`;

    return new Response(
      JSON.stringify({
        sessionUrl,
        reference,
        status: 'pending',
        message: 'KYC session created successfully',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('KYC session error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
