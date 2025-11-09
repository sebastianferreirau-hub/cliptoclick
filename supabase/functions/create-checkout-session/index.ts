import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { plan, promo_code, test_mode } = await req.json();
    console.log('Create checkout session request:', { plan, promo_code, test_mode });
    
    const baseUrl = Deno.env.get('BASE_URL') || req.headers.get('origin') || 'http://localhost:8080';
    
    let priceId: string;
    let mode: 'payment' | 'subscription';
    let metadata: Record<string, string>;
    
    if (plan === 'one_time') {
      priceId = test_mode 
        ? (Deno.env.get('STRIPE_PRICE_ONE_TIME_TEST') || Deno.env.get('STRIPE_PRICE_ONE_TIME')) as string
        : Deno.env.get('STRIPE_PRICE_ONE_TIME') as string;
      mode = 'payment';
      metadata = { plan: 'one_time', guarantee_eligible: 'true', test_mode: test_mode ? 'true' : 'false' };
    } else {
      priceId = test_mode
        ? (Deno.env.get('STRIPE_PRICE_TWO_PAY_TEST') || Deno.env.get('STRIPE_PRICE_TWO_PAY')) as string
        : Deno.env.get('STRIPE_PRICE_TWO_PAY') as string;
      mode = 'subscription';
      metadata = { plan: 'two_pay', guarantee_eligible: 'false', test_mode: test_mode ? 'true' : 'false' };
    }

    console.log('Using price ID:', priceId, 'Mode:', mode);

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `${baseUrl}/thanks?success=true`,
      cancel_url: `${baseUrl}/checkout?canceled=true`,
      metadata,
      allow_promotion_codes: true,
    };

    // Apply promo code if provided
    if (promo_code) {
      console.log('Attempting to apply promo code:', promo_code);
      const promotionCodes = await stripe.promotionCodes.list({
        code: promo_code,
        active: true,
        limit: 1,
      });
      
      if (promotionCodes.data.length > 0) {
        sessionParams.discounts = [{ promotion_code: promotionCodes.data[0].id }];
        console.log('Promo code applied:', promotionCodes.data[0].id);
      } else {
        console.log('Promo code not found or inactive');
      }
    }

    // For two-pay plan, configure subscription to end after 2 payments
    if (plan === 'two_pay') {
      sessionParams.subscription_data = {
        metadata: { two_pay: 'true' },
      };
    }

    console.log('Creating Stripe checkout session with params:', JSON.stringify(sessionParams, null, 2));
    const session = await stripe.checkout.sessions.create(sessionParams);
    console.log('Checkout session created successfully:', session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });
    
    return new Response(
      JSON.stringify({ error: 'Unable to process your request. Please try again or contact support.' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
