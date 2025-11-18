// Brand configuration - single source of truth
export const BRAND = {
  name: "Clip To Click",
  fullName: "From Clip to Click™",
  tagline: "El Arte de Verse Real",
  principles: [
    "Relatable > Perfecto",
    "Ritmo > Efectos", 
    "Velocidad > Complejidad"
  ],
  domain: "cliptoclic.com",
  adminDomain: "admin.cliptoclic.com",
  email: "hola@cliptoclic.com",
  discord: "https://discord.gg/cliptoclickxxx",
} as const;

export const PRICING = {
  course: {
    price: 297,
    currency: "USD",
    name: "Clip To Click - Acceso Completo",
    description: "Curso completo (8 módulos) + Dashboard (90 días gratis) + Comunidad Discord + Plantillas Notion"
  },
  dashboardPro: {
    price: 19,
    currency: "USD",
    name: "Dashboard Pro",
    trialDays: 90
  },
  dfyStudio: {
    starter: 1500,
    pro: 2500,
    currency: "USD"
  }
} as const;

// Dark marketing copy - focuses on pain, scarcity, and proven results
export const COPY = {
  hero: {
    headline: "Deja de perder 10+ horas editando contenido que nadie ve",
    subheadline: "El sistema exacto que usamos para generar 363M impresiones en 90 días—sin contratar editores ni comprar equipo caro",
    founderQuote: {
      text: "Pasé 3 años creando contenido sin sistema. Burnout constante, resultados inconsistentes. Este método cambió todo.",
      author: "Sebastián Ferreira, +120M impresiones en Q1 2025"
    }
  },
  cta: {
    primary: "Conseguir acceso ahora — $297",
    primaryUrgency: "Quedan 47 spots este mes",
    secondary: "Ver el sistema en acción"
  },
  socialProof: {
    headline: "363M impresiones en 3 meses",
    subheadline: "Los números no mienten. El método funciona.",
    disclaimer: "*Resultados de aplicar el método consistentemente. Sin trucos, sin bots, sin comprar views."
  },
  guarantee: {
    title: "Garantía sin riesgo (pero con compromiso)",
    description: "Completa el 70% del curso en 30 días y no estás satisfecho? Reembolso del 100%.",
    detailsList: [
      "✓ Debes completar 6 de 8 módulos (demuestra que intentaste)",
      "✓ Debes completar el quiz de Content Cores",
      "✓ Solicitud dentro de 30 días de compra",
      "✓ Un email a reembolsos@cliptoclic.com y listo"
    ],
    reasoning: "No queremos tu dinero si el método no te sirve. Pero si no lo aplicas, no podemos ayudarte. Por eso pedimos demostrar esfuerzo.",
    disclaimer: "No ofrecemos reembolsos a quienes compran y nunca entran. El método funciona si lo sigues."
  }
} as const;
