import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { getAdminUrl } from "@/lib/subdomain";

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <Card className="glass-card max-w-2xl w-full p-12 text-center">
        <div className="p-6 rounded-full bg-destructive/10 w-fit mx-auto mb-6">
          <ShieldAlert className="w-16 h-16 text-destructive" />
        </div>

        <h1 className="text-4xl font-heading gradient-text mb-4">
          Acceso Denegado
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          El panel de administración solo está disponible desde el subdominio admin.
        </p>

        <div className="bg-muted/50 rounded-xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-lg mb-4">¿Necesitas acceder al panel admin?</h2>
          <div className="space-y-3 text-muted-foreground">
            <p>
              El panel de administración está separado del sitio principal por seguridad.
            </p>
            <p>
              Si tienes permisos de administrador, accede desde el subdominio correcto.
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.location.href = '/dashboard'}
            className="rounded-xl"
          >
            Ir al Dashboard
          </Button>
          <Button
            size="lg"
            className="bg-gradient-primary hover:opacity-90 text-white rounded-xl"
            onClick={() => window.location.href = getAdminUrl()}
          >
            Ir al Admin Panel
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AccessDenied;
