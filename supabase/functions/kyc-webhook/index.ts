

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface KycWebhookPayload {
  userId: string;
  reference: string;
  result: 'approved' | 'rejected';
  reason?: string;
  metadata?: Record<string, any>;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const body: KycWebhookPayload = await req.json();
    const { userId, reference, result, reason, metadata } = body;

    console.log('KYC webhook received:', { userId, reference, result });

    // Idempotency check - find existing KYC record
    const findResponse = await fetch(
      `${supabaseUrl}/rest/v1/kyc_records?user_id=eq.${userId}&reference=eq.${reference}&limit=1`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );
    const findData = await findResponse.json();
    const existingKyc = findData[0];

    if (!existingKyc) {
      console.error('KYC record not found:', { userId, reference });
      throw new Error('KYC record not found');
    }

    // Check if already processed (idempotency)
    if (existingKyc.status === result) {
      console.log('KYC webhook already processed:', reference);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Webhook already processed',
          reference 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update KYC record
    const updateKycResponse = await fetch(
      `${supabaseUrl}/rest/v1/kyc_records?id=eq.${existingKyc.id}`,
      {
        method: 'PATCH',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: result,
          completed_at: new Date().toISOString(),
        }),
      }
    );

    if (!updateKycResponse.ok) {
      console.error('Error updating KYC record');
      throw new Error('Failed to update KYC record');
    }

    // Update creator KYC status
    const creatorKycStatus = result === 'approved' ? 'approved' : 'rejected';
    const updateCreatorResponse = await fetch(
      `${supabaseUrl}/rest/v1/creators?user_id=eq.${userId}`,
      {
        method: 'PATCH',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kyc_status: creatorKycStatus }),
      }
    );

    if (!updateCreatorResponse.ok) {
      console.error('Error updating creator KYC status');
      throw new Error('Failed to update creator status');
    }

    // Create audit log
    await fetch(`${supabaseUrl}/rest/v1/audit_logs`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'kyc_result',
        entity_type: 'kyc_record',
        entity_id: existingKyc.id,
        metadata: {
          reference,
          result,
          reason,
          ...metadata,
        },
      }),
    });

    console.log('KYC webhook processed successfully:', {
      userId,
      reference,
      result,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'KYC result processed',
        reference,
        status: result,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('KYC webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
