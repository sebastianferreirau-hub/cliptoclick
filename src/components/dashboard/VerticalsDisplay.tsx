import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb, Loader2, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Vertical {
  name: string;
  confidence: number;
  why: string;
  example_ideas_12s: string[];
  hashtags_like: string[];
}

interface VerticalsDisplayProps {
  verticals: Vertical[];
  summary: string;
}

const VerticalsDisplay = ({ verticals, summary }: VerticalsDisplayProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<any>(null);
  const [showPlanPreview, setShowPlanPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  // Load existing plan from profile
  useEffect(() => {
    const loadExistingPlan = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('content_cores')
        .eq('id', user.id)
        .single();

      if (profile?.content_cores) {
        const cores = profile.content_cores as any;
        if (cores?.week_plan) {
          setGeneratedPlan(cores.week_plan);
        }
      }
    };

    loadExistingPlan();
  }, []);


  const generateMarkdownPlan = (plan: any) => {
    if (!plan?.plan_7d) return "";

    let markdown = "# Plan de Contenido 7 Días - From Clip to Click™\n\n";
    markdown += `> ${plan.summary || "Plan personalizado basado en tus verticales de contenido"}\n\n`;
    markdown += "---\n\n";

    plan.plan_7d.forEach((day: any) => {
      markdown += `## Día ${day.day}\n\n`;
      
      if (day.ideas && day.ideas.length > 0) {
        day.ideas.forEach((idea: any, idx: number) => {
          markdown += `### Short ${idx + 1}: ${idea.title}\n`;
          markdown += `- **Core:** ${idea.core_key}\n`;
          markdown += `- **Hook:** ${idea.hook_line_1}\n`;
          markdown += `- **Beat timing:** ${idea.beat_cut_timing}s\n`;
          markdown += `- **Texto nativo:** ${idea.native_text_idea}\n`;
          markdown += `\n`;
        });
      }

      if (day.long_video) {
        markdown += `### Video Largo: ${day.long_video.title}\n`;
        markdown += `- **Hook:** ${day.long_video.hook}\n`;
        markdown += `- **Estructura:** ${day.long_video.structure}\n`;
        markdown += `- **Puntos clave:** ${day.long_video.key_points?.join(", ") || "N/A"}\n`;
        markdown += `- **CTA:** ${day.long_video.cta}\n`;
        markdown += `- **Duración objetivo:** ${day.long_video.duration_target}\n`;
        markdown += `\n`;
      }

      markdown += "---\n\n";
    });

    markdown += "## Caption Patterns\n\n";
    if (plan.caption_patterns) {
      Object.entries(plan.caption_patterns).forEach(([platform, patterns]: [string, any]) => {
        markdown += `### ${platform.toUpperCase()}\n`;
        markdown += `**Estructura:** ${patterns.structure}\n`;
        markdown += `**Hooks:** ${patterns.hooks?.join(", ") || "N/A"}\n`;
        markdown += `**CTAs:** ${patterns.ctas?.join(", ") || "N/A"}\n\n`;
      });
    }

    return markdown;
  };

  const handleCopyToClipboard = async () => {
    if (!generatedPlan) {
      toast.error("No hay plan generado aún");
      return;
    }

    const markdown = generateMarkdownPlan(generatedPlan);
    
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      toast.success("¡Plan copiado al portapapeles! Pégalo en Notion");
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast.error("Error al copiar. Intenta de nuevo.");
    }
  };

  const handleGenerate7DayPlan = async () => {
    setIsGenerating(true);
    const loadingToast = toast.loading("Generando tu plan personalizado de 7 días...");
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Debes estar autenticado");
        return;
      }

      const { data, error } = await supabase.functions.invoke('generate-7day-plan', {
        body: { 
          verticals: verticals.slice(0, 3),
          user_id: user.id 
        }
      });

      if (error) {
        if (error.message?.includes('Rate limit')) {
          toast.error("Límite de peticiones alcanzado. Intenta en unos minutos.");
        } else if (error.message?.includes('Payment required')) {
          toast.error("Créditos agotados. Contacta soporte.");
        } else {
          toast.error("Error al generar el plan");
        }
        console.error('Error:', error);
        return;
      }

      setGeneratedPlan(data);
      setShowPlanPreview(true);
      toast.success("¡Plan generado! Revisa la vista previa abajo.", { duration: 6000 });
      
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error("Error al generar el plan");
    } finally {
      toast.dismiss(loadingToast);
      setIsGenerating(false);
    }
  };

  if (!verticals || verticals.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Summary */}
      {summary && (
        <Card className="glass-card border-primary/20">
          <CardContent className="pt-6">
            <p className="text-muted-foreground leading-relaxed">{summary}</p>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Verticals */}
      <div>
        <h2 className="text-2xl font-heading mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Tus 3 Verticales de Contenido
        </h2>

        <div className="space-y-4">
          {verticals.slice(0, 3).map((vertical, index) => (
            <Card key={index} className="glass-card border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-heading text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{vertical.name}</CardTitle>
                      <CardDescription className="text-base">
                        {vertical.why}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-0 shrink-0">
                    {vertical.confidence}%
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Quick Ideas */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    2 ideas rápidas (≤12s)
                  </h4>
                  <ul className="space-y-2">
                    {vertical.example_ideas_12s.map((idea, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground pl-4 border-l-2 border-accent/30">
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Hashtags */}
                {vertical.hashtags_like && vertical.hashtags_like.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Hashtags ejemplo:</h4>
                    <div className="flex flex-wrap gap-2">
                      {vertical.hashtags_like.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Generate 7-Day Plan Button */}
      <Card className="glass-card border-accent/30">
        <CardContent className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-heading text-lg mb-1">¿Listo para empezar?</h3>
              <p className="text-sm text-muted-foreground">
                Genera un plan de contenido de 7 días basado en tus verticales
              </p>
            </div>
            <Button
              onClick={handleGenerate7DayPlan}
              disabled={isGenerating}
              className="bg-gradient-primary hover:opacity-90 gap-2 shrink-0"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generar plan 7 días
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plan Preview & Copy to Notion */}
      {generatedPlan && (
        <Card className="glass-card border-accent/30 bg-accent/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Plan de 7 Días Generado
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPlanPreview(!showPlanPreview)}
              >
                {showPlanPreview ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Ocultar
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Ver preview
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Copy Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCopyToClipboard}
                className="bg-gradient-primary hover:opacity-90 gap-2 flex-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar plan a Notion
                  </>
                )}
              </Button>
            </div>

            {/* Plan Preview */}
            {showPlanPreview && generatedPlan.plan_7d && (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {generatedPlan.plan_7d.map((day: any) => (
                  <Card key={day.day} className="bg-background/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Día {day.day}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {day.ideas?.map((idea: any, idx: number) => (
                        <div key={idx} className="text-sm border-l-2 border-primary/30 pl-3">
                          <p className="font-semibold text-foreground mb-1">
                            Short {idx + 1}: {idea.title}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Hook: {idea.hook_line_1}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            Beat: {idea.beat_cut_timing}s · {idea.native_text_idea}
                          </p>
                        </div>
                      ))}
                      {day.long_video && (
                        <div className="text-sm border-l-2 border-accent/30 pl-3">
                          <p className="font-semibold text-foreground mb-1">
                            Video Largo: {day.long_video.title}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {day.long_video.hook}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Instructions */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-sm mb-2">Cómo usar en Notion:</h4>
              <ol className="list-decimal list-inside space-y-1 text-xs text-muted-foreground">
                <li>Abre tu Notion Scheduler</li>
                <li>Crea una nueva página o base de datos</li>
                <li>Pega el contenido copiado</li>
                <li>Notion convertirá automáticamente el markdown a formato limpio</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VerticalsDisplay;
