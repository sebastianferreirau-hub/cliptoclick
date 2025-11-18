import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      q: "¿Necesito cámara profesional?",
      a: "No, un iPhone 11+ es suficiente. El método está diseñado para crear contenido auténtico sin equipo costoso.",
    },
    {
      q: "¿Qué es el Dashboard y es obligatorio usarlo?",
      a: "El Dashboard es tu centro operativo para organizar clips, conectar Notion/Drive y medir métricas. Viene gratis 90 días, después cuesta $19/mes (opcional). Puedes seguir el método solo con el curso + Notion si prefieres.",
    },
    {
      q: "¿Sirve si nunca edité videos?",
      a: "Sí, el método está diseñado para principiantes. Te enseñamos paso a paso el ritmo 0.6-1.2s y las técnicas de edición básicas en CapCut o similar.",
    },
    {
      q: "¿Cuánto tiempo necesito dedicar?",
      a: "15-30 minutos diarios para grabar clips + 1-2 horas/semana para editar y publicar. El sistema está diseñado para ser sostenible sin burnout.",
    },
    {
      q: "¿Cómo funciona la garantía?",
      a: "Si completas el 70% del curso en 30 días y no estás satisfecho con el método, te devolvemos el 100%. Solo envía un email con captura de tu progreso. Sin complicaciones.",
    },
    {
      q: "¿Cómo funciona la personalización con IA?",
      a: "Al inscribirte, completas un test de 7 preguntas sobre tu historia, pasiones y objetivos. Nuestra IA analiza tus respuestas y genera tus 'Content Cores'—los 3 pilares únicos sobre los que puedes crear contenido auténtico. Luego te da un plan de 7 días con ideas específicas para TUS verticales, no ideas genéricas.",
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-center mb-12">
          Preguntas frecuentes
        </h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="glass-card px-6 rounded-xl border-none"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">{faq.q}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
