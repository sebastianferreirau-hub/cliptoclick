// Brand configuration - single source of truth
export const BRAND = {
  name: "Clip to Click",
  fullName: "Sistema para creadores",
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
  notionTemplateUrl: "https://cliptoclik.notion.site/",
  googleDriveGuideUrl: "https://drive.google.com/drive/my-drive",
} as const;

// Export design system
export { TYPOGRAPHY, SPACING, CARD_STYLES, BUTTON_STYLES } from './design-system';

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
    disclaimer: "*Resultados de aplicar el método consistentemente. Sin trucos, sin bots, sin comprar views.",
    numbers: {
      impressions: "363M impresiones en 90 días",
      creators: "150+ creadores como tú publicando 15-20 videos/mes sin burnout",
      timeSaved: "8h/semana que antes perdías editando—ahora las usas creando más contenido"
    }
  },
  testimonials: [
    {
      name: "María Claudia",
      handle: "@mariaclaudiaql",
      avatar: "/avatars/maria.jpg",
      quote: "Pasé de tener <strong>500 seguidores</strong> a <strong>12K en 60 días</strong>. Antes grababa cuando 'me inspiraba'. Ahora tengo un sistema: grabo 20 clips los domingos, edito en batches, publico toda la semana. <strong>Cero burnout.</strong>",
      metric: "+11.5K seguidores en 60 días"
    },
    {
      name: "Fernanda",
      handle: "@ferenloscielos",
      avatar: "/avatars/fernando.jpg",
      quote: "De <strong>3K a 24K seguidores</strong> en 90 días usando el método de batching. Mi secreto: 30 clips grabados un domingo = contenido para 2 semanas. <strong>50K+ views/reel</strong> consistente.",
      metric: "+21K seguidores en 90 días"
    },
    {
      name: "Sebastián",
      handle: "@sebasferreirauu",
      avatar: "/avatars/sebastian.jpg",
      quote: "Fundador del método. <strong>+120M impresiones</strong> en Q1 2025 aplicando estos principios. No es magia—es sistema + constancia + datos.",
      metric: "+120M impresiones en 3 meses"
    }
  ],
  howItWorks: {
    title: "El sistema que elimina el caos creativo",
    subtitle: "3 pasos. Sin improvisación. Sin depender de 'inspiración'.",
    steps: [
      {
        number: 1,
        title: "Aprende el método probado",
        description: "8 módulos que enseñan exactamente qué grabar, cómo editarlo en minutos (no horas), y cómo publicar sin quemarte",
        painPoint: "❌ Sin esto: Grabas todo el día sin saber qué usar. Editas 3 horas para 1 video."
      },
      {
        number: 2,
        title: "IA detecta tus verticales en 30 min",
        description: "Quiz de 7 preguntas que analiza tu perfil y genera 3 verticales de contenido + plan de publicación de 7 días",
        painPoint: "❌ Sin esto: Pruebas 20 temas diferentes. Ninguno pega. Pierdes 6 meses."
      },
      {
        number: 3,
        title: "Dashboard te mantiene on track",
        description: "Organiza clips, conecta Notion, mide qué funciona y qué no. Todo en un lugar. Sin perderte en 15 apps.",
        painPoint: "❌ Sin esto: Clips en el celular. Ideas en notas. Métricas olvidadas. Caos total."
      }
    ]
  },
  includes: {
    title: "Lo que obtienes hoy (no hay upsells ocultos)",
    subtitle: "Un pago. Acceso completo. Sin sorpresas.",
    items: [
      {
        title: "Quiz IA de Content Cores",
        description: "Descubre tus 3 verticales + 20 ángulos de contenido en 30 min",
        value: "$497 si contrataras un strategist"
      },
      {
        title: "Plan de 7 días personalizado",
        description: "IA genera tu calendario de publicación. Solo ejecutas.",
        value: "Ahorra 8 horas de planeación/mes"
      },
      {
        title: "Dashboard operativo (90 días gratis)",
        description: "Organiza clips, conecta Notion/Drive, mide impresiones. Después $19/mes (opcional)",
        value: "$171 de ahorro en trial"
      },
      {
        title: "Sistema Notion completo",
        description: "Plantilla probada: banco de ideas, clips, inspos, calendario. Copy-paste y listo.",
        value: "20+ horas de setup"
      },
      {
        title: "Comunidad Discord (de por vida)",
        description: "150+ creadores compartiendo qué funciona. Feedback en <48h. Leaderboards semanales.",
        value: "$97/mes en otras comunidades"
      },
      {
        title: "Curso completo (8 módulos)",
        description: "Clipping, edición rápida (ritmo 0.6s), distribución multi-plataforma, análisis de datos.",
        value: "12 horas de contenido actualizado"
      }
    ]
  },
  agenda: {
    title: "Ruta del programa: 8 semanas para dominar el sistema",
    subtitle: "No es teoría. Cada módulo termina con acción concreta de 15-30 min.",
    modules: [
      {
        week: 1,
        title: "Setup & Clips",
        outcome: "Grabar 30 clips en 3 días sin sentir presión",
        action: "Acción: Grabar tu primer banco de clips"
      },
      {
        week: 2,
        title: "Ritmo I",
        outcome: "Dominar edición 0.6-1.2s (videos que se sienten cinematográficos)",
        action: "Acción: Editar 3 videos con ritmo perfecto"
      },
      {
        week: 3,
        title: "Distribución I",
        outcome: "Publicar en 3 plataformas sin triplicar trabajo",
        action: "Acción: Publicar tu primera semana completa"
      },
      {
        week: 4,
        title: "Optimización",
        outcome: "Leer métricas y saber qué duplicar / qué eliminar",
        action: "Acción: Analizar tus primeros 10 videos"
      },
      {
        week: 5,
        title: "Ritmo II",
        outcome: "Edición avanzada: hooks, transiciones, storytelling en 10s",
        action: "Acción: Rehacer tu mejor video con nuevas técnicas"
      },
      {
        week: 6,
        title: "Distribución II",
        outcome: "Batching: grabar 20 clips en 1 día, publicar 2 semanas",
        action: "Acción: Crear tu primer batch de contenido"
      },
      {
        week: 7,
        title: "Consolidación",
        outcome: "Sistematizar todo: de 10 horas/semana a 3 horas/semana",
        action: "Acción: Documentar tu sistema personal"
      },
      {
        week: 8,
        title: "Lanzamiento",
        outcome: "Publicar 20 piezas en 30 días sin quemarte",
        action: "Acción: Activar tu garantía de resultados"
      }
    ]
  },
  behindTheScenes: {
    title: "Así se ve el sistema en acción",
    subtitle: "No es magia. Es método + constancia.",
    steps: [
      {
        number: 1,
        title: "Banco de clips organizado",
        description: "Grabas 30 clips los domingos. Los guardas en Drive categorizados por vertical. Nunca más 'no sé qué publicar hoy'."
      },
      {
        number: 2,
        title: "Ideas siempre listas en Notion",
        description: "Cada vez que ves un video que te inspira, lo guardas en tu tabla de inspos. Tienes 50+ ideas esperando ser ejecutadas."
      },
      {
        number: 3,
        title: "Dashboard te dice qué funciona",
        description: "Ves tus métricas cada 24h. 'Vertical inmigrante' hace 3x más impresiones? Duplicas ahí. Data > intuición."
      }
    ]
  },
  finalCTA: {
    title: "Dos caminos desde aquí",
    option1: {
      title: "Seguir improvisando",
      description: "Grabas cuando 'te inspiras'. Editas sin sistema. Publicas cuando 'sale algo bueno'.",
      timeline: [
        {
          period: "En 3 meses:",
          outcome: "20 videos publicados, resultados inconsistentes, frustración alta"
        },
        {
          period: "En 6 meses:",
          outcome: "Mismo lugar, misma audiencia, sin clarity de qué funciona"
        }
      ]
    },
    option2: {
      title: "Conseguir el sistema hoy",
      description: "En 8 semanas dominas clipping, edición rápida, distribución multi-plataforma.",
      timeline: [
        {
          period: "En 3 meses:",
          outcome: "60+ videos publicados sin burnout, primeras señales de traction"
        },
        {
          period: "En 6 meses:",
          outcome: "Sistema que escala solo. Sabes qué duplicar, qué dejar."
        }
      ],
      cta: "Conseguir acceso — $297",
      urgency: "47 spots restantes"
    }
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
