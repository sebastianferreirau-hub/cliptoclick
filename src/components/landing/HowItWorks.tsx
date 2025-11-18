import { Card } from "@/components/ui/card";
import { GraduationCap, Sparkles, LayoutDashboard } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: GraduationCap,
      title: "Aprende el método",
      text: "8 módulos que enseñan clipping, ritmo 0.6s, y cómo estructurar contenido real sin forzarlo",
    },
    {
      icon: Sparkles,
      title: "Descubre tus Content Cores",
      text: "Quiz de IA que detecta tus 3 verticales de contenido + genera plan de publicación de 7 días",
    },
    {
      icon: LayoutDashboard,
      title: "Ejecuta con tu Dashboard",
      text: "Organiza clips, conecta Notion, revisa métricas y publica con constancia desde un solo lugar",
    },
  ];

  return (
    <section id="como-funciona" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          Cómo funciona Clip To Click
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Un sistema simple para pasar de <strong>clip</strong> a <strong>contenido publicado</strong> en días, no meses
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
