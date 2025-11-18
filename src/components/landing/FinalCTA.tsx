import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { COPY } from "@/lib/constants";

const FinalCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-heading gradient-text">
          Publica con constancia. Crece con datos.
        </h2>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Únete a creadores que priorizan <strong>autenticidad</strong> y <strong>sistema</strong>
        </p>

        <Button
          size="lg"
          className="bg-gradient-primary hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl shadow-glow group"
          onClick={() => window.location.href = '/checkout'}
        >
          {COPY.cta.primary}
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
