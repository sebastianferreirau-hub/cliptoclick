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
      name: "Fernando",
      handle: "@ferenloscielos",
      avatar: "/avatars/fernando.jpg",
      quote: "De <strong>15K a 40K seguidores</strong> en 90 días usando el método de batching. Mi secreto: 30 clips grabados un domingo = contenido para 2 semanas. <strong>50K+ views/reel</strong> consistente.",
      metric: "+25K seguidores en 90 días"
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
    title: "El sistema por dentro: cómo funciona en la práctica",
    subtitle: "No vendemos teoría. Esto es lo que pasa cuando aplicas el método.",
    examples: [
      {
        scenario: "Cliente: 'Quiero viralizar mi negocio pero odio estar en cámara'",
        solution: "Le enseñamos clipping + CapCut. Ahora hace 15 videos/mes sin grabar su cara. +30K impresiones/semana.",
        outcome: "3 negocios escalados sin contratar equipo de contenido"
      },
      {
        scenario: "Creador: 'Tengo 50K seguidores pero 0 engagement'",
        solution: "Analizamos sus métricas → 80% de su contenido era irrelevante. Le dimos 3 verticales core. Engagement +400%.",
        outcome: "De fantasma a +10K likes/post en 60 días"
      },
      {
        scenario: "Agencia: 'No podemos escalar editando 1 video a la vez'",
        solution: "Implementaron batching + plantillas de ritmo. De 15 videos/mes a 60 videos/mes sin contratar más editores.",
        outcome: "+$8K MRR adicionales sin aumentar costos"
      }
    ]
  },
  pricing: {
    title: "Consigue acceso completo hoy",
    subtitle: "Un solo pago. Sin renovaciones sorpresa. Sin upsells ocultos.",
    dashboardNote: "Después del trial de 90 días, el Dashboard es $19/mes (opcional). El curso + Notion + Discord son tuyos para siempre.",
    mainPlan: {
      badge: "🔥 Más popular",
      price: 297,
      frequency: "Pago único · Acceso de por vida",
      includes: [
        "Quiz IA de Content Cores (identifica tus 3 verticales en 30 min)",
        "Plan personalizado de 7 días generado por IA",
        "Dashboard operativo - 90 días gratis ($171 de valor)",
        "Curso completo: 8 módulos, 12 horas de contenido",
        "Sistema Notion completo (plantillas + workflows)",
        "Comunidad Discord de por vida (150+ creadores activos)",
        "Actualizaciones gratuitas de contenido (cuando agregamos módulos nuevos)"
      ],
      guarantee: "🛡️ Garantía de 90 días - Si no obtienes resultados, devolvemos 100% de tu dinero. Sin preguntas."
    },
    urgency: {
      enabled: true,
      text: "Solo quedan 47 spots este mes",
      reasoning: "Limitamos ingresos mensuales para dar soporte real en Discord. Cuando lleguemos a 200 miembros activos, cerramos hasta el próximo mes."
    }
  },
  finalCTA: {
    title: "Dos caminos. Tú eliges.",
    option1: {
      title: "❌ Seguir sin sistema",
      description: "Improvisando contenido. Quemándote cada semana. Resultados inconsistentes.",
      timeline: [
        {
          period: "Próximos 30 días",
          outcome: "Publicarás 5-8 videos (si tienes suerte). 2-3 tendrán engagement decente."
        },
        {
          period: "Próximos 90 días",
          outcome: "Burnout creativo. Pensarás en contratar un editor ($500-$2K/mes)."
        },
        {
          period: "Próximo año",
          outcome: "Seguirás con los mismos resultados. O peor: habrás dejado de crear."
        }
      ]
    },
    option2: {
      title: "✅ Aplicar el sistema",
      description: "Método probado. Dashboard que organiza todo. Comunidad que te mantiene accountable.",
      timeline: [
        {
          period: "Primeros 7 días",
          outcome: "Completas el quiz. Tienes tus 3 verticales core. Ya sabes QUÉ contenido crear."
        },
        {
          period: "Primeros 30 días",
          outcome: "Publicas 15-20 videos. Algunos pegarán fuerte. Sabes cuáles duplicar."
        },
        {
          period: "Primeros 90 días",
          outcome: "Sistema rodando solo. 3h/semana de trabajo. Resultados medibles. Cero burnout."
        }
      ],
      cta: "Conseguir acceso completo — $297",
      urgency: "47 spots restantes este mes"
    }
  },
  faq: {
    title: "Preguntas que todos hacen (y respuestas sin bullshit)",
    questions: [
      {
        q: "¿Necesito experiencia editando videos?",
        a: "No. Te enseñamos desde cero. El método está diseñado para que cualquiera pueda hacerlo—incluso si nunca has abierto CapCut. Lo importante es la consistencia, no ser Spielberg."
      },
      {
        q: "¿Funciona si no tengo seguidores aún?",
        a: "Sí. De hecho, es mejor empezar con el sistema ANTES de tener audiencia. Así construyes desde el principio sin malos hábitos. +60% de nuestros estudiantes empezaron con <1K seguidores."
      },
      {
        q: "¿Qué plataformas cubre el método?",
        a: "Instagram, TikTok, Snapchat, YouTube Shorts. El principio de clipping funciona en todas. Te enseñamos cómo adaptar formato y distribución según plataforma."
      },
      {
        q: "¿Cuánto tiempo necesito invertir por semana?",
        a: "Semana 1-2: ~5-6 horas (estás aprendiendo). Semana 3+: ~3 horas/semana. Una vez que dominas batching, bajas a 2 horas. El objetivo es MENOS tiempo trabajando, MEJOR contenido."
      },
      {
        q: "¿El Dashboard es obligatorio?",
        a: "No. Tienes 90 días gratis para probarlo. Después son $19/mes OPCIONALES. Si prefieres usar solo Notion + el curso, puedes hacerlo. El Dashboard solo acelera el proceso."
      },
      {
        q: "¿Qué pasa si no tengo tiempo ahora?",
        a: "El curso es tuyo para siempre. Puedes empezar cuando quieras. Pero seamos honestos: si 'no tienes tiempo' para 3 horas/semana de contenido, nunca vas a crecer. El método está diseñado para gente ocupada—esa es la ventaja."
      },
      {
        q: "¿Hay garantía de resultados?",
        a: "90 días. Si aplicas el método, publicas consistente (15-20 videos/mes), y no ves progreso medible, te devolvemos el 100%. Sin dramas. Pero debes hacer el trabajo—esto no es magia, es sistema."
      },
      {
        q: "¿Cuándo empiezo a ver resultados?",
        a: "Primeras 2 semanas: Claridad. Sabes QUÉ crear y CÓMO organizarte. Días 30-60: Primeros videos virales (no todos, algunos). Día 90: Sistema funcionando. Métricas subiendo. Menos estrés. Ese es el punto de quiebre."
      }
    ]
  },
  guarantee: {
    title: "Garantía sin letra chica",
    description: "Tienes 90 días para aplicar el método. Si haces el trabajo (15-20 videos/mes) y no ves progreso, te devolvemos el 100% de tu inversión.",
    detailsList: [
      "Debes completar el quiz de Content Cores",
      "Publicar mínimo 15 videos/mes durante 2 meses",
      "Mostrar que usaste el sistema (capturas del Dashboard o Notion)",
      "Si cumples esto y no funcionó, escribes a hola@cliptoclic.com y procesamos tu reembolso en 48h"
    ],
    disclaimer: "Esto no es un curso para consumir. Es un sistema para APLICAR. Si lo aplicas y no funciona, no mereces pagar. Así de simple."
  }
} as const;
