import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Plan7DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  verticals: any[];
}

export const Plan7Dialog = ({ open, onOpenChange, verticals }: Plan7DialogProps) => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const generatePlan = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-plan-7', {
        body: { verticals: verticals.slice(0, 3) }
      });

      if (error) throw error;
      setPlan(data);
      toast.success("Plan generado con éxito");
    } catch (error) {
      console.error('Error generating plan:', error);
      toast.error("Error al generar el plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Plan de 7 días - 2 ideas diarias
          </DialogTitle>
        </DialogHeader>

        {!plan ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              Genera 14 ideas de contenido basadas en tus verticales principales.
            </p>
            <Button onClick={generatePlan} disabled={loading} size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generando...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generar con IA
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {plan.days?.map((day: any, idx: number) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-primary">Día {day.day}</h3>
                <div className="grid gap-3">
                  {day.ideas?.map((idea: any, ideaIdx: number) => (
                    <div key={ideaIdx} className="p-4 rounded-lg bg-pink-200/50 border border-[#E5E7EB]">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{idea.title}</h4>
                        <span className="text-xs px-2 py-1 rounded bg-white border">
                          {idea.vertical}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        <strong>Hook:</strong> {idea.hook}
                      </p>
                      <p className="text-sm">{idea.concept}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="flex gap-2 pt-4 border-t">
              <Button onClick={generatePlan} variant="outline" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Regenerar
              </Button>
              <Button onClick={() => toast.info("Función próximamente")} className="flex-1">
                Guardar plan
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
