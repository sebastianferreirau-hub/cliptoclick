import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Thanks = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('onboarding_completed')
          .eq('id', user.id)
          .single();
        
        if (!profile?.onboarding_completed) {
          // Redirigir automáticamente a onboarding después de 3 segundos
          setTimeout(() => {
            navigate('/onboarding');
          }, 3000);
        }
      }
    };
    
    checkOnboardingStatus();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Card className="glass-card max-w-2xl w-full p-12 text-center">
        <div className="p-6 rounded-full bg-success/10 w-fit mx-auto mb-6">
          <CheckCircle2 className="w-16 h-16 text-success" />
        </div>

        <h1 className="text-4xl font-heading gradient-text mb-4">
          ¡Bienvenido a ClipCrafters!
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          Tu pago ha sido confirmado. Es momento de empezar tu transformación.
        </p>

        <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-lg mb-4">Próximos pasos:</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">1</div>
              <p className="text-muted-foreground">Completa tu onboarding (7 preguntas)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">2</div>
              <p className="text-muted-foreground">Descubre tus Content Cores personalizados</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm flex-shrink-0 mt-0.5">3</div>
              <p className="text-muted-foreground">Accede a tu dashboard y plan de 7 días</p>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="bg-gradient-primary hover:opacity-90 text-white text-lg px-8 py-6 rounded-xl group"
          onClick={() => window.location.href = '/onboarding'}
        >
          Ir al onboarding
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>

        <p className="text-sm text-muted-foreground mt-6">
          Recibirás un email con todos los detalles e invitación a Discord
        </p>
      </Card>
    </div>
  );
};

export default Thanks;
