const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  testResponses: {
    movie_title: string;
    origin_location: string;
    daily_life: string;
    passions: string;
    work: string;
    future: string;
    bio: string;
  };
  goal: string;
  timeCommitment: string;
  preferredFormat: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { testResponses, goal, timeCommitment, preferredFormat }: RequestBody = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `Eres un estratega de contenido para shorts (short-form video ≤15s). Filosofía From Clip to Click™: 
- Relatable > Perfecto
- Ritmo > Efectos  
- Velocidad > Complejidad
- Beat-Cut: 0.6s/0.8s/1.2s
- Texto nativo in-app
- MODO: shorts_first (long-form no aplica por ahora)

A partir de las respuestas autobiográficas del creador, identifica de 3 a 5 Content Cores principales y luego extrae las verticales de contenido específicas.

CORES (identidad principal del creador):
Los cores son los pilares de identidad del creador. Deben ser simples, directos y con emoji.
Ejemplo: "Ecuador/latina en USA 🇪🇨", "vida en Miami 🏙️", "trabajo cotidiano 🛍️", "fotografía/creatividad 📸", "cocina y viajes aspiracionales 🍝"

Para cada core:
1. Un "label" simple y directo con emoji (ej: "Ecuador/latina en USA 🇪🇨")
2. Un "key" descriptivo para código (ej: "latina_usa", "vida_miami")
3. Un "score" estimado 0-100 basado en qué tan presente está en sus respuestas
4. Una "description" breve de 1-2 líneas

VERTICALES DE CONTENIDO (temas específicos para crear):
Las verticales son temas más específicos derivados de los cores. Deben ser buscables y accionables.
Ejemplo: "recetas ecuatorianas", "adaptación cultural", "fotografía urbana Miami", "comida latina fusión"

Luego genera:
- Plan de 7 días: EXACTAMENTE 2 ideas de shorts por día (14 total). Cada idea con título, core_key asociado, hook_line_1 (primera línea "relatable"), beat_cut_timing (0.6/0.8/1.2), y native_text_idea
- Patrones de caption por plataforma (TikTok, Instagram, YouTube Shorts): estructura, hooks, CTAs

IMPORTANTE: Solo shorts. Long-form no aplica.

Devuelve JSON válido con esta estructura:
{
  "cores": [
    {
      "key": "latina_usa",
      "label": "Ecuador/latina en USA 🇪🇨",
      "score": 85,
      "description": "Tu identidad cultural como ecuatoriana viviendo en Estados Unidos"
    }
  ],
  "verticals": [
    "recetas ecuatorianas",
    "adaptación cultural",
    "fotografía urbana Miami",
    "comida latina fusión",
    "vida de emprendedora"
  ],
  "plan_7d": [
    {
      "day": 1,
      "ideas": [
        {
          "title": "...",
          "core_key": "latina_usa",
          "hook_line_1": "...",
          "beat_cut_timing": 0.8,
          "native_text_idea": "..."
        }
      ]
    }
  ],
  "caption_patterns": {
    "tiktok": { "structure": "...", "hooks": [...], "ctas": [...] },
    "instagram": { "structure": "...", "hooks": [...], "ctas": [...] },
    "youtube_shorts": { "structure": "...", "hooks": [...], "ctas": [...] }
  },
  "summary": "Resumen personalizado de 2-3 líneas sobre su perfil",
  "mode": "shorts_first"
}`;

    const userPrompt = `Analiza las respuestas autobiográficas de este creador para contenido de SHORTS (≤15s):

1. ¿Cómo te llamarías si tu historia fuera una película?
${testResponses.movie_title}

2. ¿De dónde eres y dónde estás viviendo ahora?
${testResponses.origin_location}

3. ¿Con quién o con qué vives que haga parte de tu día a día?
${testResponses.daily_life}

4. ¿Qué cosas te apasionan o te dan energía últimamente?
${testResponses.passions}

5. ¿A qué te dedicas o qué haces para pagar tus cuentas?
${testResponses.work}

6. ¿Qué te gustaría estar haciendo dentro de un año?
${testResponses.future}

7. Cuéntate en cuatro frases:
${testResponses.bio}

Objetivo: ${goal}
Tiempo disponible: ${timeCommitment}
Formato preferido: ${preferredFormat}

Identifica sus Content Cores principales, verticales de contenido, y genera plan de 7 días.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const aiData = await response.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in calculate-cores:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});