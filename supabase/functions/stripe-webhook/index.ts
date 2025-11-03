import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  apiVersion: '2023-10-16',
});

const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!signature || !webhookSecret) {
    return new Response('Missing signature or webhook secret', { status: 400 });
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    console.log('Webhook event received:', event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const plan = session.metadata?.plan || 'one_time';
        const email = session.customer_details?.email;
        const customerId = session.customer as string;
        const subscriptionId = session.subscription as string | null;

        console.log('Checkout completed:', { email, plan, customerId });

        // Store purchase in database
        const { error: purchaseError } = await supabase
          .from('purchases')
          .insert({
            customer_id: customerId,
            email,
            plan,
            amount: session.amount_total ? session.amount_total / 100 : 0,
            currency: session.currency || 'usd',
            status: 'completed',
            subscription_id: subscriptionId,
            guarantee_eligible: session.metadata?.guarantee_eligible === 'true',
          });

        if (purchaseError) {
          console.error('Error storing purchase:', purchaseError);
        }

        // For two-pay plan, create subscription schedule to limit to 2 payments
        if (subscriptionId && plan === 'two_pay') {
          try {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            await stripe.subscriptionSchedules.create({
              from_subscription: subscription.id,
              end_behavior: 'cancel',
              phases: [{
                items: subscription.items.data.map((item: any) => ({
                  price: item.price.id,
                  quantity: item.quantity || 1,
                })),
                iterations: 2, // Only 2 payment cycles
              }],
            });
            console.log('Subscription schedule created for 2 payments');
          } catch (scheduleError) {
            console.error('Error creating subscription schedule:', scheduleError);
          }
        }

        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Invoice paid:', invoice.id);

        // Update purchase record
        const { error } = await supabase
          .from('purchases')
          .update({ 
            status: 'active',
            last_payment_at: new Date().toISOString(),
          })
          .eq('customer_id', invoice.customer);

        if (error) {
          console.error('Error updating purchase:', error);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log('Subscription deleted:', subscription.id);

        // Mark subscription as cancelled
        const { error } = await supabase
          .from('purchases')
          .update({ status: 'cancelled' })
          .eq('subscription_id', subscription.id);

        if (error) {
          console.error('Error updating subscription status:', error);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log('Payment failed:', invoice.id);

        const { error } = await supabase
          .from('purchases')
          .update({ status: 'payment_failed' })
          .eq('customer_id', invoice.customer);

        if (error) {
          console.error('Error updating payment failure:', error);
        }
        break;
      }

      default:
        console.log('Unhandled event type:', event.type);
    }

    return new Response(JSON.stringify({ received: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Webhook error:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      event: event?.type
    });
    
    return new Response(
      JSON.stringify({ error: 'Webhook processing failed' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});