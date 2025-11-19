import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  TrendingUp,
  Clock,
  Target,
  GraduationCap,
  Cloud,
  FileText,
  Wrench,
  Copy,
  CheckCircle2
} from "lucide-react";
import { BRAND, PRICING } from "@/lib/constants";

const Dashboard = () => {
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Mock user data
  const userName = "Creador";
  const hasVerticals = true; // Change to false to see empty state
  const trialDaysRemaining = 85;

  // Mock verticals (normally from AI/database)
  const verticals = [
    {
      name: "Inmigrante en USA",
      confidence: 95,
      why: "Tu historia de mudarte a otro país y adaptarte es contenido gold. La gente se conecta con luchas reales.",
      examples: [
        "Day in the life como inmigrante",
        "Cosas que extraño de mi país",
        "Errores que cometí al llegar"
      ]
    },
    {
      name: "Vida con mascota",
      confidence: 88,
      why: "Tu perro es parte de tu día a día. Pet content + lifestyle = engagement alto.",
      examples: [
        "Rutina matutina con mi perro",
        "Gastos mensuales de tener perro en USA",
        "Cómo mi perro me ayudó con la soledad"
      ]
    },
    {
      name: "Emprender desde cero",
      confidence: 82,
      why: "Tu trabajo actual vs. tus proyectos = contraste que genera empatía y aspiración.",
      examples: [
        "Trabajando full-time mientras buildo mi proyecto",
        "Primeros $100 de mi side hustle",
        "Por qué renuncié a la estabilidad"
      ]
    }
  ];

  const handleGeneratePlan = () => {
    setGeneratingPlan(true);
    setTimeout(() => {
      setGeneratingPlan(false);
      setPlanGenerated(true);
    }, 2000);
  };

  const handleCopyToNotion = () => {
    const planText = `
# Mi Plan de 7 Días - Clip To Click

## Lunes
- Grabar 5 clips sobre: ${verticals[0].name}
- Tema: ${verticals[0].examples[0]}

## Martes  
- Editar clips del lunes (ritmo 0.6s)
- Publicar 2 piezas en IG + TikTok

## Miércoles
- Grabar 5 clips sobre: ${verticals[1].name}
- Tema: ${verticals[1].examples[0]}

## Jueves
- Editar clips del miércoles
- Publicar 2 piezas + analizar engagement

## Viernes
- Grabar 5 clips sobre: ${verticals[2].name}
- Tema: ${verticals[2].examples[0]}

## Sábado
- Batch editing: 10 clips listos para la semana
- Revisar métricas en Dashboard

## Domingo
- Descanso activo: guardar inspos en Notion
- Planear temas para próxima semana
    `.trim();

    navigator.clipboard.writeText(planText);
    setCopiedToClipboard(true);
    setTimeout(() => setCopiedToClipboard(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hola, {userName} 👋
          </h1>
          <p className="text-gray-600">
            Tu centro operativo. Velocidad &gt; Complejidad.
          </p>
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
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* KPI Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Output Semana
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0 / 14</div>
              <p className="text-xs text-gray-600 mt-2">
                Clips publicados esta semana (meta: 14)
              </p>
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
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-600 mt-2">
                Últimos 7 días (conecta IG/TikTok para ver)
              </p>
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
              <div className="text-3xl font-bold text-gray-900">0%</div>
              <p className="text-xs text-gray-600 mt-2">
                Promedio de interacciones / impresiones
              </p>
            </CardContent>
          </Card>
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
                        {vertical.examples.map((example, idx) => (
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

              {planGenerated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-800">
                    ✅ <strong>Plan generado exitosamente.</strong> Cópialo a Notion y empieza a ejecutar hoy.
                  </p>
                </div>
              )}
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
            <Card
              className="border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => (window.location.href = "/curso")}
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

            <Card className="border-2 border-gray-200 opacity-60 cursor-not-allowed">
              <CardContent className="pt-6 text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Cloud className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Google Drive
                </h3>
                <p className="text-xs text-gray-600">Próximamente</p>
              </CardContent>
            </Card>

            <Card
              className="border-2 border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => alert("Plantilla Notion próximamente")}
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

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            {BRAND.fullName} · {BRAND.principles.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
