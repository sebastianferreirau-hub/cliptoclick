import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock } from "lucide-react";

const PricingBox = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetTime = new Date().getTime() + (72 * 60 * 60 * 1000); // 72 hours from now
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;
      
      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-semibold">Early Bird 72h</span>
            </div>
            <div className="text-4xl font-bold mb-2">USD 379</div>
            <div className="text-sm opacity-90 line-through">USD 499</div>
            <div className="mt-4 flex gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs opacity-75">horas</div>
              </div>
              <div className="text-2xl">:</div>
              <div>
                <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs opacity-75">min</div>
              </div>
              <div className="text-2xl">:</div>
              <div>
                <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs opacity-75">seg</div>
              </div>
            </div>
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
            <p className="font-medium">2 pagos de USD 279 <span className="text-sm text-muted-foreground">(sin garantía)</span></p>
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
