import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Users, Eye, Target } from "lucide-react";
import { toast } from "sonner";

interface AnalyticsData {
  provider: string;
  range: string;
  metrics: {
    totalViews: number;
    totalReach: number;
    followers: number;
    engagementRate: string;
  };
  dailyViews: Array<{ date: string; views: number }>;
  topPosts: Array<{
    id: string;
    title: string;
    date: string;
    views: number;
    engagementRate: string;
    url: string;
  }>;
}

export default function Analytics() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState<any>(null);
  const [selectedProvider, setSelectedProvider] = useState<string>("instagram");
  const [range, setRange] = useState<string>("30d");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    checkAuth();
    fetchProviders();
  }, []);

  useEffect(() => {
    if (providers) {
      fetchAnalytics();
    }
  }, [selectedProvider, range, providers]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchProviders = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('analytics-providers');
      if (error) throw error;
      setProviders(data.providers);
    } catch (error) {
      console.error("Error fetching providers:", error);
      toast.error("Error al cargar las conexiones");
    }
  };

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analytics-fetch', {
        body: { provider: selectedProvider, range, demo: true }
      });
      
      if (error) throw error;
      setAnalyticsData(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Error al cargar las métricas");
    } finally {
      setLoading(false);
    }
  };

  const providerChips = [
    { key: 'instagram', label: 'Instagram' },
    { key: 'tiktok', label: 'TikTok' },
    { key: 'snapchat', label: 'Snapchat' },
  ];

  const rangeOptions = [
    { value: '7d', label: '7 días' },
    { value: '30d', label: '30 días' },
    { value: '90d', label: '90 días' },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-sm text-muted-foreground">Lectura en tiempo real; no almacenamos tus estadísticas.</p>
            </div>
          </div>
        </div>

        {/* Provider Chips */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {providerChips.map((provider) => {
            const isConnected = providers?.[provider.key]?.connected;
            const isConfigured = providers?.[provider.key]?.configured;
            const isSelected = selectedProvider === provider.key;
            
            return (
              <Badge
                key={provider.key}
                variant={isSelected ? "default" : "outline"}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedProvider(provider.key)}
              >
                {isConnected ? "✅" : "⚪"} {provider.label}
                {!isConfigured && <span className="ml-2 text-xs">(No config.)</span>}
              </Badge>
            );
          })}
        </div>

        {/* Range Selector */}
        <div className="mb-6 flex gap-2">
          {rangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={range === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando métricas...</p>
          </div>
        ) : analyticsData ? (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Vistas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.metrics.totalViews.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Alcance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.metrics.totalReach.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Seguidores
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.metrics.followers.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analyticsData.metrics.engagementRate}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Top Posts Table */}
            <Card>
              <CardHeader>
                <CardTitle>Top Posts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Fecha</th>
                        <th className="text-left py-3 px-4">Título</th>
                        <th className="text-right py-3 px-4">Vistas</th>
                        <th className="text-right py-3 px-4">ER %</th>
                        <th className="text-right py-3 px-4">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analyticsData.topPosts.map((post) => (
                        <tr key={post.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">{post.date}</td>
                          <td className="py-3 px-4">{post.title}</td>
                          <td className="py-3 px-4 text-right">{post.views.toLocaleString()}</td>
                          <td className="py-3 px-4 text-right">{post.engagementRate}%</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="link" size="sm" asChild>
                              <a href={post.url} target="_blank" rel="noopener noreferrer">
                                Ver post
                              </a>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay datos disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
}
