import { Card } from "@/components/ui/card";
import { Shield, CheckCircle2 } from "lucide-react";

const GuaranteeBox = () => {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="glass-card p-8 md:p-12 border-success/20">
          <div className="flex items-start gap-6">
            <div className="p-4 rounded-xl bg-success/10 flex-shrink-0">
              <Shield className="w-8 h-8 text-success" />
            </div>
            <div>
              <h3 className="text-2xl font-heading mb-4">Garantía de resultados</h3>
              <p className="text-lg mb-6">
                Si publicas ≥20 clips en 30 días y no ves +50% de engagement, devolvemos 100%.
              </p>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Publicar ≥20 clips en 30 días</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Asistir a ≥1 sesión grupal/semana</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Aplicar checklist de calidad (hook ≤1.2s, ritmo 0.6–1.2s, luz/foco)</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                * Aplica solo para el plan de pago único. El plan en 2 pagos no es elegible a reembolso.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default GuaranteeBox;
