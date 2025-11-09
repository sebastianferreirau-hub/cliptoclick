import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const IncludesGrid = () => {
  const items = [
    {
      title: "Test de Content Cores",
      result: "→ 3 pilares + 20 ángulos en 30 min"
    },
    {
      title: "Plan semanal personalizado",
      result: "→ calendario para 15–20 piezas/mes"
    },
    {
      title: "Checklist de calidad",
      result: "→ objetivos de retención (3s/8s) y saves por pieza"
    },
    {
      title: "Plantilla de organización",
      result: "→ nombres, carpetas y flujo diario"
    },
    {
      title: "Comunidad privada",
      result: "→ objetivos semanales y leaderboard"
    },
    {
      title: "Revisiones grupales",
      result: "→ feedback <48h con lista de cambios priorizada"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          Qué incluye
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Todo orientado a resultados medibles
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <Card key={index} className="glass-card p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.result}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludesGrid;
