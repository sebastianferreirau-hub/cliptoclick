import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Search } from "lucide-react";

const PurchasesTab = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = purchases.filter(p => 
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPurchases(filtered);
    } else {
      setFilteredPurchases(purchases);
    }
  }, [searchTerm, purchases]);

  const fetchPurchases = async () => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPurchases(data || []);
      setFilteredPurchases(data || []);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      completed: "default",
      active: "secondary",
      cancelled: "destructive",
      payment_failed: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  if (loading) {
    return <div className="text-center text-muted-foreground">Cargando compras...</div>;
  }

  return (
    <Card className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-xl font-heading mb-4">Todas las Compras</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Customer ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPurchases.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No se encontraron compras
                </TableCell>
              </TableRow>
            ) : (
              filteredPurchases.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(purchase.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{purchase.email}</TableCell>
                  <TableCell>{purchase.plan === 'one_time' ? 'Pago Único' : '2 Pagos'}</TableCell>
                  <TableCell className="font-medium">${purchase.amount}</TableCell>
                  <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{purchase.customer_id}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default PurchasesTab;
