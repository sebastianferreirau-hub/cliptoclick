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
              <p className="text-lg mb-4">
                Si publicas ≥20 clips en 30 días y no ves +50% en impressiones, devolvemos 100%.
              </p>

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
