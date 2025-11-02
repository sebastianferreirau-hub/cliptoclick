import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const IncludesGrid = () => {
  const items = [
    "Test de Content Cores",
    "Plan semanal personalizado",
    "Checklist de calidad",
    "Plantilla de organización",
    "Comunidad privada",
    "Revisiones grupales",
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          Qué incluye
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Todo lo que necesitas para dominar el formato de shorts
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Card key={index} className="glass-card p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <p className="font-medium">{item}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludesGrid;
