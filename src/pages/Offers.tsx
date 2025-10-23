import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Offer {
  id: string;
  campaign_id: string;
  terms_json: any;
  escrow_amount_usd: number;
  status: string;
  created_at: string;
  campaigns: {
    name: string;
    brands: {
      org_name: string;
    };
  };
}

export default function Offers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchOffers();
    };

    checkAuth();
  }, [navigate]);

  const fetchOffers = async () => {
    try {
      const { data, error } = await supabase
        .from("offers")
        .select(`
          *,
          campaigns (
            name,
            brands (
              org_name
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOffers(data || []);
    } catch (error: any) {
      toast.error("Failed to load offers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (offerId: string) => {
    try {
      const { error } = await supabase
        .from("offers")
        .update({ status: "accepted" })
        .eq("id", offerId);

      if (error) throw error;
      toast.success("Offer accepted!");
      fetchOffers();
    } catch (error: any) {
      toast.error("Failed to accept offer");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      proposed: "bg-yellow-500",
      accepted: "bg-blue-500",
      in_progress: "bg-purple-500",
      delivered: "bg-green-500",
      disputed: "bg-red-500",
      released: "bg-gray-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Campaign Offers</h1>
          <p className="text-muted-foreground">Manage your brand collaboration opportunities</p>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Loading offers...</p>
            </CardContent>
          </Card>
        ) : offers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No offers yet. Brands will send you collaboration opportunities here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {offers.map((offer) => (
              <Card key={offer.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{offer.campaigns.name}</CardTitle>
                      <CardDescription>
                        {offer.campaigns.brands.org_name}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(offer.status)}>
                      {offer.status.replace("_", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Escrow Amount</p>
                    <p className="text-2xl font-bold text-primary">
                      ${offer.escrow_amount_usd.toFixed(2)} USD
                    </p>
                  </div>
                  {offer.terms_json && (
                    <div>
                      <p className="text-sm font-medium">Terms</p>
                      <p className="text-sm text-muted-foreground">
                        {JSON.stringify(offer.terms_json)}
                      </p>
                    </div>
                  )}
                  {offer.status === "proposed" && (
                    <div className="flex gap-2">
                      <Button onClick={() => handleAccept(offer.id)}>
                        Accept Offer
                      </Button>
                      <Button variant="outline">View Details</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
