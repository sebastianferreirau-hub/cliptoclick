import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      q: "¿Qué equipo necesito?",
      a: "Un teléfono (iPhone 11+ recomendado) y luz básica. No necesitas cámara profesional ni setup costoso para empezar.",
    },
    {
      q: "¿Puedo pagar en 2 cuotas?",
      a: "Sí, ofrecemos plan de 2 pagos de USD 279 cada uno. Ten en cuenta que este plan no es elegible para la garantía de resultados.",
    },
    {
      q: "¿Qué es la Beca LatAm?",
      a: "Es un descuento del 30% para creadores de América Latina. Usa el código LATAM30 en el checkout para aplicarlo.",
    },
    {
      q: "¿Cuánto tiempo necesito dedicar?",
      a: "Entre 1-5 horas por semana es suficiente para empezar. El sistema está diseñado para ser sostenible sin burnout.",
    },
    {
      q: "¿Cómo se mide el avance?",
      a: "Medimos retención en los primeros 1-3 segundos, constancia en publicaciones, y output semanal. Te damos feedback específico en las sesiones grupales.",
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
