import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center space-y-8 animate-fade-in">
        <div className="inline-flex p-4 rounded-2xl bg-gradient-primary mb-4">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-heading gradient-text leading-tight">
          From Clip to Click™
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Crea contenido real que <strong>convierte</strong>: más <strong>impresiones</strong>, sin equipo caro ni horas de edición
        </p>

        <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto italic">
          "No crees todos los días; <strong>recolecta</strong> todos los días. 
          Crear es fácil cuando dejas de empezar desde cero."
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-glow"
            onClick={() => window.location.href = '/checkout'}
          >
            Empezar ahora — USD 297
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-xl"
            onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver cómo funciona
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
