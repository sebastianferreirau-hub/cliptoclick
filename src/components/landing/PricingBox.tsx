import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Rocket, Users } from "lucide-react";
import { BRAND, FULL_PRICE, getCurrentTier } from "@/lib/constants";
import { useState, useEffect } from "react";

const PricingBox = () => {
  const [tier, setTier] = useState(getCurrentTier());

  // Update tier every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTier(getCurrentTier());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading mb-4">
            Acceso completo a {BRAND.name}
          </h2>
          <p className="text-muted-foreground">
            {tier.isLaunched
              ? "Sistema LIVE. Únete a 150+ creadores activos."
              : "Empieza hoy. Sin cohortes, sin esperas."
            }
          </p>
        </div>

        <Card className="glass-card p-8 md:p-12">
          {/* Tier 4 (Launched) - Authority/Proof based */}
          {tier.isLaunched ? (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Rocket className="w-5 h-5" />
                <span className="text-sm font-medium uppercase tracking-wide">{tier.label}</span>
              </div>
              <div className="text-lg line-through opacity-70 mb-1">USD $1,294 en valor</div>
              <div className="text-4xl md:text-5xl font-bold mb-2">USD ${tier.price}</div>
              <div className="text-sm opacity-90">Pago único · Acceso de por vida</div>
              <div className="mt-4 flex items-center justify-center gap-2 text-white/90">
                <Users className="w-4 h-4" />
                <span className="text-sm">Únete a 150+ creadores usando el sistema</span>
              </div>
            </div>
          ) : (
            /* Pre-sale tiers (1-3) - Urgency/Scarcity based */
            <div className="bg-gradient-primary text-white rounded-xl p-6 mb-8 text-center">
              <div className="text-sm font-medium uppercase tracking-wide mb-2">{tier.label}</div>
              <div className="text-lg line-through opacity-70 mb-1">USD ${FULL_PRICE}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2">USD ${tier.price}</div>
              <div className="text-sm opacity-90">Pre-Venta · Pago único · Acceso de por vida</div>
              {tier.tierEndDate && (
                <div className="mt-4 flex items-center justify-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {tier.daysLeft > 0
                      ? `${tier.daysLeft}d ${tier.hoursLeft}h restantes a este precio`
                      : `${tier.hoursLeft}h restantes a este precio`
                    }
                  </span>
                </div>
              )}
            </div>
          )}

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

          <Button
            size="lg"
            className={`w-full text-white text-lg py-6 rounded-xl ${
              tier.isLaunched
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                : "bg-gradient-primary hover:opacity-90"
            }`}
            onClick={() => window.location.href = '/checkout'}
          >
            {tier.isLaunched
              ? `Activar mi sistema — $${tier.price}`
              : `Conseguir acceso — $${tier.price}`
            }
          </Button>
        </Card>
      </div>
    </section>
  );
};

export default PricingBox;
