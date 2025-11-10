import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Lightbulb, Loader2 } from "lucide-react";
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

      toast.success("¡Plan generado! Sincroniza con Notion para verlo en tu calendario.");
      
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
    </div>
  );
};

export default VerticalsDisplay;
