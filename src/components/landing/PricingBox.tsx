import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

const PricingBox = () => {

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            Únete a la cohorte
          </h2>
          <p className="text-muted-foreground">
            Plazas limitadas: 100 creadores, 4 grupos
          </p>
        </div>

        <Card className="glass-card p-8 md:p-12">
          <div className="bg-gradient-primary text-white rounded-xl p-6 mb-8">
            <div className="text-4xl font-bold mb-2">USD 297</div>
            <div className="text-sm opacity-90">Pago único</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>8 semanas de programa estructurado</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>2 revisiones grupales por semana</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Acceso a comunidad privada Discord</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Todas las herramientas y plantillas</span>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              También disponible:
            </p>
            <p className="font-medium">2 pagos de USD 199 <span className="text-sm text-muted-foreground">(sin garantía)</span></p>
          </div>

          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">¿Tienes código promocional?</label>
            <Input placeholder="Ingresa tu código" className="rounded-xl" />
          </div>

          <Button
            size="lg"
            className="w-full bg-gradient-primary hover:opacity-90 text-white text-lg py-6 rounded-xl"
            onClick={() => window.location.href = '/checkout'}
          >
            Ir al checkout
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default PricingBox;
