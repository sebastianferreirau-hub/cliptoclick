import { Card } from "@/components/ui/card";

const AgendaTimeline = () => {
  const weeks = [
    { 
      week: 1, 
      title: "Setup & Clips",
      detail: "Conectar IG, definir cores y grabar 10 clips brutos"
    },
    { 
      week: 2, 
      title: "Ritmo I",
      detail: "Aplicar librería de hooks; publicar 5 piezas"
    },
    { 
      week: 3, 
      title: "Distribución I",
      detail: "8 publicaciones + primera lectura de métricas"
    },
    { 
      week: 4, 
      title: "Optimización",
      detail: "1 hipótesis de mejora por pieza (hook/thumbnail/CTA)"
    },
    { 
      week: 5, 
      title: "Ritmo II",
      detail: "Batch de 10–12 piezas; reducir tiempo por pieza"
    },
    { 
      week: 6, 
      title: "Distribución II",
      detail: "Multi-plataforma y horarios; prueba de CTAs"
    },
    { 
      week: 7, 
      title: "Consolidación",
      detail: "Sistema diario que sostenga 3–5/sem"
    },
    { 
      week: 8, 
      title: "Lanzamiento",
      detail: "Plan de 30 días y caso público (antes/después)"
    }
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
              <h3 className="font-semibold text-lg">{week.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{week.detail}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgendaTimeline;
