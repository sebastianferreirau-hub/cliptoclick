import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { DollarSign, TrendingUp } from "lucide-react";

interface Payout {
  id: string;
  corridor: string;
  amount_usd: number;
  fx_rate: number | null;
  fee_usd: number;
  net_local: number | null;
  currency: string;
  status: string;
  created_at: string;
}

export default function Payouts() {
  const navigate = useNavigate();
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchPayouts();
    };

    checkAuth();
  }, [navigate]);

  const fetchPayouts = async () => {
    try {
      const { data, error } = await supabase
        .from("payouts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayouts(data || []);
    } catch (error: any) {
      toast.error("Failed to load payouts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      quoted: "bg-blue-500",
      initiated: "bg-yellow-500",
      processing: "bg-purple-500",
      settled: "bg-green-500",
      failed: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  const totalEarnings = payouts
    .filter(p => p.status === "settled")
    .reduce((sum, p) => sum + p.amount_usd, 0);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Payouts</h1>
          <p className="text-muted-foreground">Track your earnings and payment history</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                From {payouts.filter(p => p.status === "settled").length} completed payouts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {payouts.filter(p => ["initiated", "processing"].includes(p.status)).length}
              </div>
              <p className="text-xs text-muted-foreground">Payments in progress</p>
            </CardContent>
          </Card>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Loading payouts...</p>
            </CardContent>
          </Card>
        ) : payouts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No payouts yet. Complete offers to receive payments.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {payouts.map((payout) => (
              <Card key={payout.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        ${payout.amount_usd.toFixed(2)} USD
                      </CardTitle>
                      <CardDescription>
                        Corridor: {payout.corridor} • Fee: ${payout.fee_usd.toFixed(2)}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(payout.status)}>
                      {payout.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    {payout.fx_rate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Exchange Rate</span>
                        <span className="font-medium">{payout.fx_rate.toFixed(4)}</span>
                      </div>
                    )}
                    {payout.net_local && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Net Local</span>
                        <span className="font-medium">
                          {payout.net_local.toFixed(2)} {payout.currency}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium">
                        {new Date(payout.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
