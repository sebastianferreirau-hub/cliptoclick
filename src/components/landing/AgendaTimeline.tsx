import { Card } from "@/components/ui/card";

const AgendaTimeline = () => {
  const weeks = [
    { week: 1, title: "Setup & Clips" },
    { week: 2, title: "Ritmo I" },
    { week: 3, title: "Distribución I" },
    { week: 4, title: "Optimización" },
    { week: 5, title: "Ritmo II" },
    { week: 6, title: "Distribución II" },
    { week: 7, title: "Consolidación" },
    { week: 8, title: "Lanzamiento" }
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          Ruta del programa (8 módulos)
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          De tu primer clip a un sistema que escala
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeks.map((week) => (
            <Card key={week.week} className="glass-card p-6 hover:shadow-elegant transition-all">
              <div className="text-sm text-primary font-semibold mb-2">M{week.week}</div>
              <h3 className="font-semibold text-lg">{week.title}</h3>
            </Card>
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-8">
          Cada módulo termina con una acción de 15–30 min
        </p>
      </div>
    </section>
  );
};

export default AgendaTimeline;
