import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PaywallOverlayProps {
  message?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function PaywallOverlay({ 
  message = "Suscríbete para acceder a esta funcionalidad y descubrir tus Content Cores.",
  ctaText = "Suscríbete ahora",
  ctaHref = "/checkout"
}: PaywallOverlayProps) {
  const navigate = useNavigate();

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/80 backdrop-blur-md z-10" />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[400px] px-6 text-center">
        <div className="glass-card p-8 max-w-md">
          <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-heading gradient-text mb-3">Contenido bloqueado</h3>
          <p className="text-muted-foreground mb-6">{message}</p>
          <Button
            onClick={() => navigate(ctaHref)}
            className="bg-gradient-primary text-white"
            size="lg"
          >
            {ctaText}
          </Button>
        </div>
      </div>
      
      {/* Placeholder para mantener el espacio visual */}
      <div className="opacity-0" style={{ paddingBottom: '56.25%' }} />
    </div>
  );
}
