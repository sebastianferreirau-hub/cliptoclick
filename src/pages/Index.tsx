import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, Target, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  // Removed auto-redirect to allow users to see the landing page

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex p-6 rounded-3xl bg-gradient-primary mb-8 animate-fade-in">
            <Sparkles className="w-16 h-16 text-white" />
          </div>

          <h1 className="text-6xl md:text-7xl font-heading gradient-text mb-6 animate-fade-in">
            ClipCrafters
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
            <span className="text-primary font-semibold">From Clip to Click™</span>
            <br />
            Tu OS para shorts de alto impacto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12 animate-fade-in">
            <div className="glass-card p-6 rounded-2xl">
              <div className="p-4 rounded-xl bg-primary/20 w-fit mx-auto mb-4">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-lg mb-2">Test Personalizado</h3>
              <p className="text-sm text-muted-foreground">
                7 preguntas para detectar tu estilo único
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="p-4 rounded-xl bg-accent/20 w-fit mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-heading text-lg mb-2">Analytics 24h</h3>
              <p className="text-sm text-muted-foreground">
                Publica hoy, aprende mañana
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl">
              <div className="p-4 rounded-xl bg-success/20 w-fit mx-auto mb-4">
                <Zap className="w-8 h-8 text-success" />
              </div>
              <h3 className="font-heading text-lg mb-2">Plan 7 días</h3>
              <p className="text-sm text-muted-foreground">
                2 ideas diarias, listas para grabar
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-6 rounded-2xl"
              onClick={() => navigate("/auth")}
            >
              Empezar ahora
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            From Clip to Click™ · Relatable &gt; Perfecto · Ritmo &gt; Efectos
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
