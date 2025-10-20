import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, LogOut, BarChart3, Upload, Calendar, Settings } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  name: string | null;
  handle: string | null;
  content_cores: any;
  onboarding_completed: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (!data.onboarding_completed) {
          navigate("/onboarding");
          return;
        }

        setProfile(data);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Cargando...</div>
      </div>
    );
  }

  const cores = profile?.content_cores?.cores || [];
  const verticals = profile?.content_cores?.verticals || [];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-heading gradient-text mb-2">
              Hola, {profile?.name || profile?.handle || 'Creator'}
            </h1>
            <p className="text-muted-foreground">
              Tu estrategia de contenido
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="w-4 h-4" />
            Salir
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Output Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading gradient-text">0 / 14</div>
              <p className="text-xs text-muted-foreground mt-2">
                Meta: 2 cortos/día · 1 largo opcional
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Score Verde
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading text-success">0%</div>
              <p className="text-xs text-muted-foreground mt-2">
                Ret3s ≥75% (cortos) · Ret50 ≥35% (largos)
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                SLA Vencidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading text-destructive">0</div>
              <p className="text-xs text-muted-foreground mt-2">
                to_publish ≤24h · editing ≤48h
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Cores */}
        <div>
          <h2 className="text-2xl font-heading mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Tus Content Cores
          </h2>
          
          {cores.length > 0 ? (
            <div className="space-y-6">
              {/* Cores - Numbered List */}
              <div className="space-y-3">
                {cores.map((core: any, index: number) => (
                  <Card key={index} className="glass-card border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-heading text-primary font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-heading mb-1">{core.label}</h3>
                          <p className="text-sm text-muted-foreground">{core.description}</p>
                        </div>
                        <Badge className="bg-primary/20 text-primary border-0">
                          {core.score}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Verticales de Contenido */}
              {verticals.length > 0 && (
                <Card className="glass-card border-accent/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      Verticales de Contenido
                    </CardTitle>
                    <CardDescription>
                      Temas específicos que puedes buscar y crear
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {verticals.map((vertical: string, index: number) => (
                        <Badge 
                          key={index} 
                          variant="secondary" 
                          className="px-3 py-1.5 text-sm bg-secondary/80 hover:bg-secondary"
                        >
                          {vertical}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="py-8 text-center text-muted-foreground">
                Completa el onboarding para descubrir tus Content Cores
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-heading mb-4">Acciones rápidas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 bg-secondary/30"
              onClick={() => toast.info("Función próximamente")}
            >
              <Upload className="w-6 h-6" />
              <span className="text-sm">Subir Assets</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 bg-secondary/30"
              onClick={() => toast.info("Función próximamente")}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Calendario</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 bg-secondary/30"
              onClick={() => toast.info("Función próximamente")}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">Analytics</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 bg-secondary/30"
              onClick={() => toast.info("Función próximamente")}
            >
              <Settings className="w-6 h-6" />
              <span className="text-sm">Configuración</span>
            </Button>
          </div>
        </div>

        {/* Coming Soon */}
        <Card className="glass-card border-accent/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Próximamente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>· Pipeline Kanban visual (Idea → Editing → Published)</li>
              <li>· Calendario de publicaciones con vista mensual</li>
              <li>· 24h Review con decisiones IA (Empujar, Recortar, Kill)</li>
              <li>· Import CSV de analytics de plataformas</li>
              <li>· Sistema de inspiración con estado de material</li>
              <li>· Plan IA 7 días con ideas relatable y beat-cut timing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;