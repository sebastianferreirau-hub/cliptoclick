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
  email: "hola@cliptoclic.com",
  discord: "https://discord.gg/cliptoclic", // Update with real link when available
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
  }
} as const;

export const COPY = {
  hero: {
    headline: "Convierte 30 clips diarios en contenido que convierte",
    subheadline: "El método probado que generó +363M impresiones en 3 meses—sin equipo de edición ni horas perdidas",
    founderQuote: {
      text: "No crees todos los días; recolecta todos los días. Crear es fácil cuando dejas de empezar desde cero.",
      author: "Sebastián Ferreira, fundador de Clip To Click"
    }
  },
  cta: {
    primary: "Generar mi plan de 7 días — USD 297",
    secondary: "Ver el método en acción"
  },
  guarantee: {
    title: "Garantía de satisfacción",
    description: "Completa el 70% del curso en 30 días y no estás satisfecho con el método? Te devolvemos el 100%, sin preguntas.",
    disclaimer: "Para procesar reembolso: email a soporte@cliptoclic.com con captura de tu progreso del curso. Debes haber completado al menos 6 de 8 módulos del curso y el quiz de Content Cores.",
    note: "Por qué 70%? Porque queremos que realmente pruebes el sistema antes de decidir. No es un curso para ver 2 videos y pedir reembolso—es un método que requiere ejecución."
  }
} as const;
