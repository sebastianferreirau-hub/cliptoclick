import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Dispute {
  id: string;
  raiser_type: string;
  reason: string | null;
  status: string;
  created_at: string;
  offers: {
    campaigns: {
      name: string;
    };
  };
}

export default function OpsQueue() {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchData();
    };

    checkAuth();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from("disputes")
        .select(`
          *,
          offers (
            campaigns (
              name
            )
          )
        `)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;

      setDisputes(data || []);
    } catch (error: any) {
      toast.error("Failed to load queue data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
      open: "bg-yellow-500",
      in_review: "bg-blue-500",
      resolved: "bg-green-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Operations Queue</h1>
          <p className="text-muted-foreground">Review and manage disputes</p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Loading disputes...</p>
              </CardContent>
            </Card>
          ) : disputes.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">No disputes to review</p>
              </CardContent>
            </Card>
          ) : (
            disputes.map((dispute) => (
              <Card key={dispute.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {dispute.offers.campaigns.name}
                      </CardTitle>
                      <CardDescription>
                        Raised by: {dispute.raiser_type}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(dispute.status)}>
                      {dispute.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {dispute.reason && (
                    <p className="text-sm mb-2">{dispute.reason}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Created: {new Date(dispute.created_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
