import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-heading gradient-text">
          Empieza hoy tu transformación
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Únete a 100 creadores que están construyendo su presencia con contenido auténtico
        </p>

        <Button
          size="lg"
          className="bg-gradient-primary hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-glow group"
          onClick={() => window.location.href = '/checkout'}
        >
          Reservar mi plaza
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-sm text-muted-foreground">
          Plazas limitadas · Early Bird termina en 72h
        </p>
      </div>
    </section>
  );
};

export default FinalCTA;
