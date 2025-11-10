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
      q: "¿Sirve si nunca edité videos?",
      a: "Sí, el método está diseñado para principiantes. Te enseñamos paso a paso el ritmo 0.6-1.2s y las técnicas de edición básicas.",
    },
    {
      q: "¿Cuánto tiempo necesito dedicar?",
      a: "Entre 1-5 horas por semana es suficiente para empezar. El sistema está diseñado para ser sostenible sin burnout.",
    },
    {
      q: "¿Qué pasa si no veo resultados?",
      a: "Si publicas ≥20 clips en 30 días siguiendo el método y no ves +50% en impresiones, te devolvemos el 100%. La garantía aplica solo al pago único.",
    },
    {
      q: "¿Puedo pagar en 2 cuotas?",
      a: "Sí, ofrecemos plan de 2 pagos de USD 199 cada uno. Ten en cuenta que este plan no es elegible para la garantía de resultados.",
    },
    {
      q: "¿Cómo se mide el avance?",
      a: "Medimos impresiones, constancia en publicaciones y engagement. Te damos feedback específico en las sesiones grupales.",
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
