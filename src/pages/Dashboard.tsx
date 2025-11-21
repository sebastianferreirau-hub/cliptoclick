import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Profile, ContentCore } from "@/types/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Loader2,
  Sparkles, 
  TrendingUp,
  Clock,
  Target,
  GraduationCap,
  Cloud,
  FileText,
  Wrench,
  Copy,
  CheckCircle2,
  Instagram,
  Music,
  Camera,
  RefreshCw
} from "lucide-react";
import { useInstagramMetrics } from "@/hooks/useInstagramMetrics";
import { BRAND, PRICING } from "@/lib/constants";
import { SetupInstructionsModal } from "@/components/SetupInstructionsModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [notionModalOpen, setNotionModalOpen] = useState(false);
  const [driveModalOpen, setDriveModalOpen] = useState(false);
  const [trialDetailsOpen, setTrialDetailsOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [planText, setPlanText] = useState("");
  const [weeklyOutput, setWeeklyOutput] = useState(0);
  const [totalImpressions, setTotalImpressions] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [instagramAccounts, setInstagramAccounts] = useState<any[]>([]);
  const hasRequestedRefresh = useRef(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { metrics, isLoading: igMetricsLoading, refreshMetrics, isRefreshing } = useInstagramMetrics();

  // Auto-fetch metrics when Instagram is connected - ALWAYS on first load
  useEffect(() => {
    if (instagramAccounts.length > 0 && !hasRequestedRefresh.current && !isRefreshing) {
      console.log('🔄 Auto-fetching Instagram metrics on dashboard load...');
      hasRequestedRefresh.current = true;
      toast({
        title: 'Obteniendo métricas de Instagram',
        description: 'Cargando tus datos...',
      });
      refreshMetrics();
    }
  }, [instagramAccounts.length, isRefreshing]);

  // Load user profile and data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/auth");
          return;
        }

        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        setProfile(profileData as any as Profile);

        // Load Instagram accounts
        const { data: igAccounts } = await supabase
          .from('instagram_accounts')
          .select('*')
          .eq('user_id', user.id);
        
        setInstagramAccounts(igAccounts || []);
      } catch (error: any) {
        console.error('Error loading profile:', error);
        toast({
          title: "Error cargando perfil",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate, toast]);

  // Handle OAuth callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    if (params.get('connected') === 'instagram') {
      const accountsCount = params.get('accounts') || '1';
      toast({
        title: "✅ Instagram conectado",
        description: `${accountsCount} cuenta(s) conectada(s) exitosamente`,
      });
      // Clean URL
      window.history.replaceState({}, '', '/dashboard');
      // Reload accounts
      if (profile) {
        supabase
          .from('instagram_accounts')
          .select('*')
          .eq('user_id', profile.id)
          .then(({ data }) => setInstagramAccounts(data || []));
      }
    }
    
    const instagramError = params.get('instagram_error') || params.get('error');
    
    if (instagramError) {
      const errorMap: Record<string, string> = {
        'user_denied': 'Cancelaste la conexión',
        'no_code': 'No se recibió código de autorización',
        'invalid_state': 'Sesión inválida o expirada',
        'state_expired': 'La sesión expiró, intenta de nuevo',
        'not_authenticated': 'Debes iniciar sesión primero',
        'token_exchange_failed': 'Error al intercambiar token',
        'no_instagram_account': 'No se encontró cuenta de Instagram Business',
        'save_failed': 'Error al guardar la cuenta',
        'missing_parameters': 'Faltan parámetros en la respuesta de Instagram',
      };
      
      const errorMsg = errorMap[instagramError] || instagramError || 'Error desconocido';
      toast({
        title: "Error conectando Instagram",
        description: errorMsg,
        variant: "destructive",
      });
      // Clean URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, [profile, toast]);

  // Load real metrics from database
  useEffect(() => {
    const loadMetrics = async () => {
      if (!profile?.id) return;
      
      try {
        // Get posts from this week
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        weekStart.setHours(0, 0, 0, 0);
        
        const { data: weeklyPosts } = await supabase
          .from('posts')
          .select('id')
          .eq('user_id', profile.id)
          .gte('created_at', weekStart.toISOString())
          .eq('status', 'published');
        
        setWeeklyOutput(weeklyPosts?.length || 0);
        
        // Get analytics from last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const { data: recentAnalytics } = await supabase
          .from('analytics')
          .select('views, likes, comments, shares, saves, impressions')
          .eq('user_id', profile.id)
          .gte('captured_at', sevenDaysAgo.toISOString());
        
        if (recentAnalytics && recentAnalytics.length > 0) {
          const totalViews = recentAnalytics.reduce((sum, a) => sum + (a.views || 0), 0);
          const totalImpressionsSum = recentAnalytics.reduce((sum, a) => sum + (a.impressions || 0), 0);
          const totalEngagement = recentAnalytics.reduce((sum, a) => 
            sum + (a.likes || 0) + (a.comments || 0) + (a.shares || 0) + (a.saves || 0), 0
          );
          
          setTotalImpressions(totalImpressionsSum);
          setEngagementRate(totalViews > 0 ? Number((totalEngagement / totalViews * 100).toFixed(1)) : 0);
        }
      } catch (error) {
        console.error('Error loading metrics:', error);
      } finally {
        setMetricsLoading(false);
      }
    };
    
    loadMetrics();
  }, [profile]);

  // Extract verticals from profile - with null safety
  const verticals: ContentCore[] = profile?.content_cores?.verticals || [];
  const hasVerticals = verticals.length > 0 && profile?.onboarding_completed;
  const userName = profile?.full_name || "Creador";

  // Calculate trial days remaining - with null safety
  const trialDaysRemaining = profile?.trial_ends_at 
    ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)))
    : 0;

  const handleConnectInstagram = async () => {
    setIsConnecting(true);
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session?.user) {
        toast({
          title: "Autenticación requerida",
          description: "Inicia sesión para conectar tu cuenta de Instagram",
          variant: "destructive"
        });
        setIsConnecting(false);
        return;
      }
  
      const stateData = {
        user_id: session.user.id,
        timestamp: Date.now(),
        nonce: crypto.randomUUID()
      };
      
      const state = btoa(JSON.stringify(stateData));
      const connectUrl = `https://fkyzmwpkdrorocyosbyh.supabase.co/functions/v1/instagram-connect?state=${encodeURIComponent(state)}`;
      
      window.location.href = connectUrl;
    } catch (error) {
      console.error('Instagram connect error:', error);
      toast({
        title: "Conexión fallida",
        description: "No se pudo iniciar la conexión con Instagram",
        variant: "destructive"
      });
      setIsConnecting(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!verticals.length) {
      toast({
        title: "Completa el onboarding primero",
        description: "Necesitas tus Content Cores antes de generar un plan",
      });
      navigate("/onboarding");
      return;
    }

    if (!profile) {
      toast({
        title: "Error",
        description: "No se pudo cargar el perfil",
        variant: "destructive",
      });
      return;
    }

    setGeneratingPlan(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-plan', {
        body: {
          verticals,
          userId: profile.id,
        }
      });

      if (error) throw error;

      setPlanText(data.plan);
      setPlanGenerated(true);
      
      toast({
        title: "✅ Plan generado",
        description: "Tu plan de 7 días está listo",
      });
    } catch (error: any) {
      console.error('Plan generation error:', error);
      toast({
        title: "Error generando el plan",
        description: error.message || "Intenta de nuevo",
        variant: "destructive",
      });
    } finally {
      setGeneratingPlan(false);
    }
  };

  const handleCopyToNotion = async () => {
    try {
      await navigator.clipboard.writeText(planText);
      setCopiedToClipboard(true);
      
      toast({
        title: "✅ Copiado al portapapeles",
        description: "Pega el plan en tu página de Notion",
      });
      
      setTimeout(() => setCopiedToClipboard(false), 3000);
    } catch (error) {
      toast({
        title: "Error al copiar",
        description: "Intenta de nuevo",
        variant: "destructive",
      });
    }
  };

  // Notion Template Instructions
  const notionInstructions = [
    {
      step: 1,
      text: "Se abrirá la plantilla de Clip To Click en una nueva pestaña"
    },
    {
      step: 2,
      text: "En la esquina superior derecha, busca el botón 'Duplicate' (o 'Duplicar' si está en español)"
    },
    {
      step: 3,
      text: "Haz click en 'Duplicate' - esto creará una copia completa en tu workspace de Notion"
    },
    {
      step: 4,
      text: "La plantilla incluye: Calendario de contenido, Banco de clips, Sistema de inspiraciones, y Tracker de analytics"
    },
    {
      step: 5,
      text: "Empieza a usarla inmediatamente - toda la estructura ya está lista para que la personalices"
    }
  ];

  const notionTips = [
    "NO edites la plantilla original - siempre haz tu propia copia con 'Duplicate'",
    "Puedes personalizar los colores, agregar más campos o eliminar secciones que no uses",
    "Sincroniza esta plantilla con tu plan de 7 días generado por IA",
    "Revisa la plantilla cada domingo para planear tu próxima semana"
  ];

  // Google Drive Instructions
  const driveInstructions = [
    {
      step: 1,
      text: "Crea una carpeta principal llamada 'Clip To Click' en tu Google Drive"
    },
    {
      step: 2,
      text: "Dentro de esa carpeta, crea estas subcarpetas: 'Clips Raw', 'Editados', 'B-Roll', 'Inspiración'"
    },
    {
      step: 3,
      text: "En 'Clips Raw': guarda todos tus videos sin editar, organizados por semana (Ej: Semana 1, Semana 2)"
    },
    {
      step: 4,
      text: "En 'Editados': guarda los videos finales listos para publicar, separados por plataforma (IG, TikTok, YT)"
    },
    {
      step: 5,
      text: "Activa backup automático desde tu teléfono para que los clips se suban automáticamente a Drive"
    }
  ];

  const driveTips = [
    "Instala Google Drive app en tu teléfono y activa 'Backup automático' para la carpeta de clips",
    "Nombra tus archivos con fecha: 2024-01-19_clip1.mp4 para mantener orden cronológico",
    "Usa 'B-Roll' para material extra que puedes reutilizar (paisajes, transiciones, texturas)",
    "La carpeta 'Inspiración' es para screenshots de contenido que te guste - úsala como referencia",
    "Borra clips antiguos cada 3 meses para no llenar tu espacio de Drive"
  ];

  const driveStructureExample = `📁 Clip To Click/
  ├── 📁 Clips Raw/
  │   ├── 📁 Semana 1/
  │   ├── 📁 Semana 2/
  │   └── 📁 Semana 3/
  │
  ├── 📁 Editados/
  │   ├── 📁 Instagram/
  │   ├── 📁 TikTok/
  │   └── 📁 YouTube/
  │
  ├── 📁 B-Roll/
  └── 📁 Inspiración/`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hola, {userName} 👋
            </h1>
            <p className="text-gray-600">
              Tu centro operativo. Velocidad &gt; Complejidad.
            </p>
          </div>
          {instagramAccounts.length > 0 && (
            <Button
              onClick={() => {
                console.log('🔘 User clicked "Actualizar métricas" button');
                refreshMetrics();
              }}
              disabled={isRefreshing}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Actualizar métricas
            </Button>
          )}
        </div>

        {/* Trial Banner */}
        {trialDaysRemaining > 0 && (
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Dashboard gratis por 90 días
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quedan <strong>{trialDaysRemaining} días</strong>. Después puedes continuar con 
                    ${PRICING.dashboardPro.price}/mes (opcional) o usar solo el curso + Notion gratis.
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setTrialDetailsOpen(true)}
                >
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Social Media Connections */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Conexiones</h2>
          <p className="text-sm text-gray-600 mb-4">
            Conecta tus redes sociales para importar automáticamente analytics y métricas
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <Card 
              className={`border-2 ${instagramAccounts.length > 0 ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
            >
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-3">
                    <Instagram className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Instagram</h3>
                  <Badge variant={instagramAccounts.length > 0 ? "default" : "outline"} className="mb-3">
                    {instagramAccounts.length > 0 ? `✅ ${instagramAccounts.length} cuenta(s)` : "No conectado"}
                  </Badge>
                </div>

                {instagramAccounts.length > 0 ? (
                  <div className="space-y-2">
                    {instagramAccounts.map((account) => (
                      <div key={account.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {account.profile_picture_url && (
                            <img 
                              src={account.profile_picture_url} 
                              alt={account.instagram_username}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              @{account.instagram_username}
                            </p>
                            {account.followers_count && (
                              <p className="text-xs text-gray-500">
                                {account.followers_count.toLocaleString()} seguidores
                              </p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            if (confirm('¿Desconectar esta cuenta de Instagram?')) {
                              const { error } = await supabase
                                .from('instagram_accounts')
                                .delete()
                                .eq('id', account.id);
                              
                              if (error) {
                                toast({
                                  title: "Error",
                                  description: "No se pudo desconectar la cuenta",
                                  variant: "destructive"
                                });
                              } else {
                                setInstagramAccounts(prev => prev.filter(a => a.id !== account.id));
                                if (instagramAccounts.length === 1) {
                                  await supabase
                                    .from('profiles')
                                    .update({ instagram_connected: false })
                                    .eq('id', profile?.id);
                                }
                                toast({
                                  title: "✅ Cuenta desconectada",
                                  description: "La cuenta de Instagram fue desconectada"
                                });
                              }
                            }
                          }}
                          className="text-xs"
                        >
                          Desconectar
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      disabled={isConnecting}
                      onClick={handleConnectInstagram}
                    >
                      {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Agregar otra cuenta"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-3">
                      Conecta tu cuenta de Instagram Business para importar analytics
                    </p>
                    <Button
                      variant="default"
                      size="sm"
                      disabled={isConnecting}
                      onClick={handleConnectInstagram}
                    >
                      {isConnecting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Conectando...
                        </>
                      ) : (
                        "Conectar Instagram"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card 
              className={`border-2 ${profile?.tiktok_connected ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center mx-auto mb-3">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">TikTok</h3>
                <Badge variant={profile?.tiktok_connected ? "default" : "outline"}>
                  {profile?.tiktok_connected ? "✅ Conectado" : "🔒 OAuth requerido"}
                </Badge>
                {!profile?.tiktok_connected && (
                  <p className="text-xs text-gray-500 mt-2">
                    Requiere configurar credenciales de TikTok API
                  </p>
                )}
              </CardContent>
            </Card>

            <Card 
              className={`border-2 ${profile?.snapchat_connected ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Snapchat</h3>
                <Badge variant={profile?.snapchat_connected ? "default" : "outline"}>
                  {profile?.snapchat_connected ? "✅ Conectado" : "🔒 OAuth requerido"}
                </Badge>
                {!profile?.snapchat_connected && (
                  <p className="text-xs text-gray-500 mt-2">
                    Requiere configurar credenciales de Snapchat API
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Métricas de Instagram</h2>
            {metrics && (
              <p className="text-xs text-gray-500">
                Última actualización: {new Date(metrics.last_updated).toLocaleString('es-ES', { 
                  day: '2-digit', 
                  month: 'short', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            📊 Incluye posts y reels del feed. Stories no incluidas todavía.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Output Semana
                </CardTitle>
                <TrendingUp className="w-4 h-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                {igMetricsLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                ) : metrics ? (
                  <>
                    <div className="text-3xl font-bold text-gray-900">{metrics.posts_this_week}</div>
                    <p className="text-xs text-gray-600 mt-2">
                      posts publicados (últimos 7 días)
                    </p>
                    {metrics.posts_this_week === 0 && (
                      <p className="text-xs text-amber-600 mt-1">
                        ⚠️ No hay posts recientes en los últimos 7 días
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-gray-900">{weeklyOutput} / 14</div>
                    <p className="text-xs text-gray-600 mt-2">
                      {weeklyOutput === 0 
                        ? "Conecta Instagram para ver métricas" 
                        : `Clips publicados esta semana (meta: 14)`
                      }
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Impresiones Totales
              </CardTitle>
              <Target className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              {igMetricsLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              ) : metrics ? (
                <>
                  <div className="text-3xl font-bold text-gray-900">
                    {metrics.total_impressions.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    última actualización: {new Date(metrics.last_updated).toLocaleDateString()}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-900">
                    {totalImpressions.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    {totalImpressions === 0 
                      ? "Conecta IG/TikTok para ver impresiones" 
                      : "Últimos 7 días"
                    }
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Engagement Rate
              </CardTitle>
              <Clock className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              {igMetricsLoading ? (
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
              ) : metrics ? (
                <>
                  <div className="text-3xl font-bold text-gray-900">{metrics.engagement_rate.toFixed(1)}%</div>
                  <p className="text-xs text-gray-600 mt-2">
                    promedio de tus posts
                  </p>
                </>
              ) : (
                <>
                  <div className="text-3xl font-bold text-gray-900">{engagementRate}%</div>
                  <p className="text-xs text-gray-600 mt-2">
                    {engagementRate === 0 
                      ? "Publica clips para ver tu engagement" 
                      : "Promedio de interacciones / vistas"
                    }
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

        {/* Content Cores Section */}
        {hasVerticals ? (
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                Tus Content Cores
              </CardTitle>
              <p className="text-gray-600">
                Verticales generadas por IA basadas en tu perfil
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {verticals.map((vertical, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white rounded-lg border-2 border-purple-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg text-gray-900">
                        {vertical.name}
                      </h3>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {vertical.confidence}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      <strong>Por qué funciona:</strong> {vertical.why}
                    </p>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-700">
                        Ideas para empezar:
                      </p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {(vertical.examples || []).map((example, idx) => (
                          <li key={idx}>• {example}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleGeneratePlan}
                  disabled={generatingPlan}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {generatingPlan ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Generando plan con IA...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generar plan de 7 días
                    </>
                  )}
                </Button>

                {planGenerated && (
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleCopyToNotion}
                    className="border-2 border-purple-300"
                  >
                    {copiedToClipboard ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                        ¡Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copiar plan a Notion
                      </>
                    )}
                  </Button>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  ✅ <strong>Plan generado exitosamente.</strong> Cópialo a Notion y empieza a ejecutar hoy.
                </p>
                <div className="mt-3 max-h-96 overflow-y-auto bg-white p-4 rounded border border-green-300">
                  <pre className="text-xs whitespace-pre-wrap font-mono">{planText}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-gray-200 mb-8">
            <CardContent className="pt-6 text-center py-12">
              <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Aún no tienes Content Cores
              </h3>
              <p className="text-gray-600 mb-6">
                Completa el onboarding para descubrir tus verticales de contenido
              </p>
              <Button
                onClick={() => (window.location.href = "/onboarding")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Completar onboarding
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones rápidas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Course Access */}
            <Card
              className="border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate("/curso")}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Acceder al curso
                </h3>
                <p className="text-xs text-gray-600">
                  8 módulos completos
                </p>
              </CardContent>
            </Card>

            {/* Google Drive Setup */}
            <Card
              className="border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setDriveModalOpen(true)}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Configurar Drive
                </h3>
                <p className="text-xs text-gray-600">
                  Organiza tus clips
                </p>
              </CardContent>
            </Card>

            {/* Notion Template */}
            <Card
              className="border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => setNotionModalOpen(true)}
            >
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Plantilla Notion
                </h3>
                <p className="text-xs text-gray-600">Sistema completo</p>
                <Badge className="mt-2 bg-green-100 text-green-700">Nuevo</Badge>
              </CardContent>
            </Card>

            {/* Recursos (Coming Soon) */}
            <Card className="border-2 border-gray-200 opacity-60 cursor-not-allowed">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Wrench className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Recursos
                </h3>
                <p className="text-xs text-gray-600">Próximamente</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <SetupInstructionsModal
          open={notionModalOpen}
          onOpenChange={setNotionModalOpen}
          title="📋 Plantilla Notion - Setup"
          description="Duplica la plantilla completa de Clip To Click a tu workspace"
          instructions={notionInstructions}
          tips={notionTips}
          primaryButton={{
            text: "Abrir plantilla de Notion",
            url: BRAND.notionTemplateUrl
          }}
        />

        <SetupInstructionsModal
          open={driveModalOpen}
          onOpenChange={setDriveModalOpen}
          title="📁 Google Drive - Setup Recomendado"
          description="Organiza tus clips con esta estructura probada por +150 creadores"
          instructions={driveInstructions}
          tips={driveTips}
          folderStructure={driveStructureExample}
          primaryButton={{
            text: "Abrir Google Drive",
            url: BRAND.googleDriveGuideUrl
          }}
        />

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {BRAND.fullName} · {BRAND.principles.join(" · ")}
          </p>
        </div>
      </div>

      {/* Trial Details Modal */}
      <Dialog open={trialDetailsOpen} onOpenChange={setTrialDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del Trial Dashboard</DialogTitle>
            <DialogDescription>
              Información sobre tu período de prueba gratuito
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">📅 Tu Trial</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Inicio:</strong> {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('es-ES') : 'N/A'}</li>
                <li>• <strong>Expira:</strong> {profile?.trial_ends_at ? new Date(profile.trial_ends_at).toLocaleDateString('es-ES') : 'N/A'}</li>
                <li>• <strong>Días restantes:</strong> {trialDaysRemaining} días</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-gray-900 mb-2">✅ Qué incluye</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Dashboard completo con métricas</li>
                <li>• Generación de planes con IA</li>
                <li>• Conexión con redes sociales</li>
                <li>• Analytics en tiempo real</li>
                <li>• Acceso al curso completo</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">🔄 Después del trial</h4>
              <p className="text-sm text-gray-700 mb-2">
                Puedes continuar con el Dashboard Pro por <strong>${PRICING.dashboardPro.price}/mes</strong> (opcional).
              </p>
              <p className="text-sm text-gray-700">
                O seguir usando el <strong>curso + plantilla Notion gratis</strong> para siempre.
              </p>
            </div>

            <Button 
              onClick={() => {
                setTrialDetailsOpen(false);
                navigate('/checkout');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Ver planes de pago
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
