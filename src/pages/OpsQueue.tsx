import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface KYCRecord {
  id: string;
  user_id: string;
  provider: string | null;
  status: string | null;
  reference: string | null;
  started_at: string | null;
  created_at: string;
}

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
  const [kycRecords, setKycRecords] = useState<KYCRecord[]>([]);
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
      const [kycResponse, disputesResponse] = await Promise.all([
        supabase
          .from("kyc_records")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(20),
        supabase
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
          .limit(20),
      ]);

      if (kycResponse.error) throw kycResponse.error;
      if (disputesResponse.error) throw disputesResponse.error;

      setKycRecords(kycResponse.data || []);
      setDisputes(disputesResponse.data || []);
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
          <p className="text-muted-foreground">Review KYC submissions and disputes</p>
        </div>

        <Tabs defaultValue="kyc">
          <TabsList>
            <TabsTrigger value="kyc">
              KYC Reviews ({kycRecords.filter(k => k.status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="disputes">
              Disputes ({disputes.filter(d => d.status === 'open').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="kyc" className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">Loading KYC records...</p>
                </CardContent>
              </Card>
            ) : kycRecords.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No KYC records to review</p>
                </CardContent>
              </Card>
            ) : (
              kycRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          User ID: {record.user_id.substring(0, 8)}...
                        </CardTitle>
                        <CardDescription>
                          {record.provider && `Provider: ${record.provider}`}
                          {record.reference && ` • Ref: ${record.reference}`}
                        </CardDescription>
                      </div>
                      {record.status && (
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(record.created_at).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="disputes" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
