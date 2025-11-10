import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify user is admin
    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Unauthorized');
    }

    const { data: userRoles } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!userRoles) {
      throw new Error('Unauthorized - Admin access required');
    }

    // Get total revenue and sales
    const { data: purchaseStats } = await supabaseClient
      .from('purchases')
      .select('amount, plan, created_at')
      .in('status', ['completed', 'active']);

    const totalRevenue = purchaseStats?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;
    const totalSales = purchaseStats?.length || 0;

    // Get active subscriptions
    const { count: activeSubscriptions } = await supabaseClient
      .from('purchases')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')
      .eq('plan', 'two_pay');

    // Get total signups
    const { count: totalSignups } = await supabaseClient
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    const conversionRate = totalSignups ? (totalSales / totalSignups) * 100 : 0;
    const avgOrderValue = totalSales ? totalRevenue / totalSales : 0;

    // Get recent purchases
    const { data: recentPurchases } = await supabaseClient
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    // Revenue over time (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: revenueData } = await supabaseClient
      .from('purchases')
      .select('created_at, amount')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .in('status', ['completed', 'active']);

    // Group by date
    const revenueByDate = revenueData?.reduce((acc: any, purchase) => {
      const date = new Date(purchase.created_at).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += Number(purchase.amount);
      return acc;
    }, {}) || {};

    const revenueOverTime = Object.entries(revenueByDate).map(([date, revenue]) => ({
      date,
      revenue: Number(revenue),
    }));

    // Sales by plan
    const salesByPlan = purchaseStats?.reduce((acc: any, purchase) => {
      const plan = purchase.plan;
      if (!acc[plan]) {
        acc[plan] = 0;
      }
      acc[plan]++;
      return acc;
    }, {}) || {};

    const salesByPlanArray = Object.entries(salesByPlan).map(([plan, count]) => ({
      plan,
      count: Number(count),
    }));

    return new Response(
      JSON.stringify({
        overview: {
          totalRevenue: totalRevenue.toFixed(2),
          totalSales,
          activeSubscriptions: activeSubscriptions || 0,
          conversionRate: conversionRate.toFixed(2),
          avgOrderValue: avgOrderValue.toFixed(2),
        },
        recentPurchases: recentPurchases || [],
        revenueOverTime,
        salesByPlan: salesByPlanArray,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.message?.includes('Unauthorized') ? 403 : 500,
      }
    );
  }
});
