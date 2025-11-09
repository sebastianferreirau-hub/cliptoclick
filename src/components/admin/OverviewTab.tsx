import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { DollarSign, ShoppingCart, Repeat, TrendingUp, Users } from "lucide-react";

interface AdminStats {
  overview: {
    totalRevenue: string;
    totalSales: number;
    activeSubscriptions: number;
    conversionRate: string;
    avgOrderValue: string;
  };
  recentPurchases: any[];
}

const OverviewTab = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-stats');
      
      if (error) throw error;
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground">Cargando estadísticas...</div>;
  }

  if (!stats) {
    return <div className="text-center text-muted-foreground">No se pudieron cargar las estadísticas</div>;
  }

  const kpiCards = [
    {
      title: "Ingresos Totales",
      value: `$${stats.overview.totalRevenue}`,
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "Ventas Totales",
      value: stats.overview.totalSales,
      icon: ShoppingCart,
      color: "text-primary",
    },
    {
      title: "Suscripciones Activas",
      value: stats.overview.activeSubscriptions,
      icon: Repeat,
      color: "text-warning",
    },
    {
      title: "Tasa de Conversión",
      value: `${stats.overview.conversionRate}%`,
      icon: TrendingUp,
      color: "text-accent",
    },
    {
      title: "Valor Promedio",
      value: `$${stats.overview.avgOrderValue}`,
      icon: Users,
      color: "text-secondary",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="glass-card p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">{kpi.title}</p>
              <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-xl font-heading mb-4">Últimas Compras</h3>
        <div className="space-y-3">
          {stats.recentPurchases.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No hay compras registradas</p>
          ) : (
            stats.recentPurchases.map((purchase) => (
              <div key={purchase.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
                <div>
                  <p className="font-medium">{purchase.email}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(purchase.created_at).toLocaleDateString()} - {purchase.plan === 'one_time' ? 'Pago Único' : '2 Pagos'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">${purchase.amount}</p>
                  <p className="text-xs text-muted-foreground">{purchase.status}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default OverviewTab;
