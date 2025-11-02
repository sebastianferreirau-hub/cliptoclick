import { Card } from "@/components/ui/card";
import { Video, Scissors, Send } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Video,
      title: "Clipping diario",
      text: "Graba fragmentos de 5–10s sin presión de publicar.",
    },
    {
      icon: Scissors,
      title: "Edita en ≤12s",
      text: "Ritmo 0.6–1.2s alineado a música/beat; guía simple.",
    },
    {
      icon: Send,
      title: "Distribuye constante",
      text: "Señales al algoritmo 3–5×/semana sin burnout.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          Cómo funciona
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Un sistema simple en 3 pasos para crear contenido auténtico que funciona
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="glass-card p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-4 mt-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.text}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
