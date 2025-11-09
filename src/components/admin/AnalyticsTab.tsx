import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

const AnalyticsTab = () => {
  const [chartData, setChartData] = useState<any>({
    revenueOverTime: [],
    salesByPlan: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-stats');
      
      if (error) throw error;
      
      setChartData({
        revenueOverTime: data.revenueOverTime || [],
        salesByPlan: data.salesByPlan || [],
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-muted-foreground">Cargando analíticas...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass-card p-6">
        <h3 className="text-xl font-heading mb-4">Ingresos en el Tiempo</h3>
        {chartData.revenueOverTime.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.revenueOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#667eea" name="Ingresos (USD)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center py-8">No hay datos de ingresos</p>
        )}
      </Card>

      <Card className="glass-card p-6">
        <h3 className="text-xl font-heading mb-4">Ventas por Plan</h3>
        {chartData.salesByPlan.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.salesByPlan}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ plan, count }) => `${plan === 'one_time' ? 'Pago Único' : '2 Pagos'}: ${count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.salesByPlan.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground text-center py-8">No hay datos de ventas</p>
        )}
      </Card>
    </div>
  );
};

export default AnalyticsTab;
