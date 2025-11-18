import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { BRAND, PRICING } from "@/lib/constants";

const PricingBox = () => {

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            Acceso completo a {BRAND.name}
          </h2>
          <p className="text-muted-foreground">
            Empieza hoy. Sin cohortes, sin esperas.
          </p>
        </div>

        <Card className="glass-card p-8 md:p-12">
          <div className="bg-gradient-primary text-white rounded-xl p-6 mb-8 text-center">
            <div className="text-4xl md:text-5xl font-bold mb-2">USD {PRICING.course.price}</div>
            <div className="text-sm opacity-90">Pago único · Acceso de por vida</div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>8 módulos de aprendizaje paso a paso</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Test de Content Cores (IA personalizada)</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Plan de 7 días generado con IA</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Plantillas Notion + recursos descargables</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Comunidad privada Discord</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
              <span>Garantía de satisfacción 30 días</span>
            </div>
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
