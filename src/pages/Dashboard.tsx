import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, LogOut, BarChart3, Upload, Calendar, Settings } from "lucide-react";
import { toast } from "sonner";
import VerticalsDisplay from "@/components/dashboard/VerticalsDisplay";

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

  const verticals = profile?.content_cores?.verticals || [];
  const summary = profile?.content_cores?.summary || "";
  const hasVerticalsData = verticals.length > 0 && verticals[0]?.name;

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
              Shorts primero. Velocidad &gt; Complejidad.
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

        {/* Verticals Display */}
        {hasVerticalsData ? (
          <VerticalsDisplay verticals={verticals} summary={summary} />
        ) : (
          <Card className="glass-card">
            <CardContent className="py-8 text-center text-muted-foreground">
              Completa el onboarding para descubrir tus verticales de contenido
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-heading mb-4">Acciones rápidas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 bg-secondary/30"
              onClick={() => toast.info("Conecta tu Notion - próximamente")}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.233-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/>
              </svg>
              <span className="text-sm">Conectar Notion</span>
            </Button>

            <Button 
              variant="outline" 
              className="h-24 flex-col gap-2 bg-secondary/30"
              onClick={() => toast.info("Conecta tu OneDrive - próximamente")}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.068 4.563a6.75 6.75 0 0 1 5.645 8.37 4.876 4.876 0 0 1-.644-.042 5.25 5.25 0 0 0-5.484-6.875 6.75 6.75 0 0 1 .483-1.453zm-2.22-.424a5.25 5.25 0 0 0-9.44 4.078 4.877 4.877 0 0 1 1.22-.157 6.75 6.75 0 0 1 8.22-3.92zm6.902 7.28a3.375 3.375 0 1 0-3.375 5.844h6.187a3.375 3.375 0 0 0 .001-6.75 3.375 3.375 0 0 0-.813.094zm-12.187.094a3.376 3.376 0 0 0 0 6.75h5.062a4.876 4.876 0 0 1-1.687-3.657 4.876 4.876 0 0 1 .501-2.156 3.376 3.376 0 0 0-3.876-.937z"/>
              </svg>
              <span className="text-sm">Conectar OneDrive</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <li>· 24h Review con decisiones (Empujar, Recortar, Kill)</li>
                <li>· Import CSV de analytics de plataformas</li>
                <li>· Sistema de inspiración con estado de material</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="glass-card border-muted/30 opacity-60">
            <CardHeader>
              <CardTitle className="text-lg">Long videos workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-heading gradient-text mb-2">Coming soon</div>
              <p className="text-sm text-muted-foreground">
                Enfoque actual: shorts de alto impacto. Long-form en desarrollo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;