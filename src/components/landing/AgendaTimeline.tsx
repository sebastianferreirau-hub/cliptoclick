import { Card } from "@/components/ui/card";

const AgendaTimeline = () => {
  const weeks = [
    { week: 1, title: "Setup & Clips", desc: "Configuración inicial y primeros clips" },
    { week: 2, title: "Ritmo I", desc: "Dominar el timing 0.6-1.2s" },
    { week: 3, title: "Distribución I", desc: "Publicar con constancia" },
    { week: 4, title: "Optimización", desc: "Ajustar según métricas" },
    { week: 5, title: "Ritmo II", desc: "Refinar edición avanzada" },
    { week: 6, title: "Distribución II", desc: "Escalar publicaciones" },
    { week: 7, title: "Consolidación", desc: "Fortalecer tu sistema" },
    { week: 8, title: "Lanzamiento", desc: "Sistema completo funcionando" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-4">
          Agenda de 8 semanas
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Un camino estructurado desde tu primer clip hasta un sistema completo
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {weeks.map((week) => (
            <Card key={week.week} className="glass-card p-6 hover:shadow-elegant transition-all">
              <div className="text-sm text-primary font-semibold mb-2">Semana {week.week}</div>
              <h3 className="font-semibold text-lg mb-2">{week.title}</h3>
              <p className="text-sm text-muted-foreground">{week.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaTimeline;
