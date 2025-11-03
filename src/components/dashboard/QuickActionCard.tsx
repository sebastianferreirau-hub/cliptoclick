import { ReactNode } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface QuickActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  isLocked?: boolean;
  isConnected?: boolean;
  connectionLabel?: string;
  onUnlock?: () => void;
}

export const QuickActionCard = ({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  isLocked = false,
  isConnected = false,
  connectionLabel = "Conectado",
  onUnlock,
}: QuickActionCardProps) => {
  return (
    <div className="relative p-6 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#CBD5E1] transition-all">
      {isLocked && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10">
          <Lock className="w-8 h-8 text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          {onUnlock && (
            <Button onClick={onUnlock} size="sm">
              Completa tu inscripción
            </Button>
          )}
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-white border border-[#E5E7EB]">
          {icon}
        </div>
        {!isLocked && connectionLabel && (
          <Badge variant={isConnected ? "default" : "outline"} className="ml-2">
            {isConnected ? "✅" : "⚪"} {isConnected ? connectionLabel : "No conectado"}
          </Badge>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>

      {!isLocked && (
        <div className="flex gap-2">
          {primaryAction && (
            <Button onClick={primaryAction.onClick} className="flex-1">
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} variant="outline">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
