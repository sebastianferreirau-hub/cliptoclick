import "jsr:@supabase/functions-js/edge-runtime.d.ts";

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

    const systemPrompt = `Eres un estratega de contenido experto. Filosofía From Clip to Click™: 
- Relatable > Perfecto
- Ritmo > Efectos  
- Velocidad > Complejidad
- Beat-Cut: 0.6s/0.8s/1.2s
- Texto nativo in-app

A partir de las respuestas autobiográficas del creador, identifica sus 3 Content Cores principales (verticales de contenido).
Las verticales pueden incluir: origen/identidad cultural, vida cotidiana/familia, trabajo/oficio, hobbies/pasiones, aspiraciones, estilo de vida, etc.

Para cada core detectado:
1. Asigna un "key" descriptivo (ej: "latina_miami", "fotografia_creativa", "cocina_experimental")
2. Un "label" atractivo (ej: "Latina en Miami", "Fotografía Creativa")
3. Un "score" estimado 0-100 basado en qué tan presente está en sus respuestas
4. Una "description" de 2-3 líneas
5. "specific_tips" con 3 tips prácticos de cómo crear contenido sobre ese core

Luego genera:
- Plan de 7 días: 2 ideas por día con título, core_key asociado, hook_line_1 (primera línea "relatable"), beat_cut_timing (0.6/0.8/1.2), y native_text_idea
- Caption patterns por plataforma (TikTok, Instagram, YouTube Shorts): estructura, hooks, CTAs

Devuelve JSON válido con esta estructura:
{
  "cores": [
    {
      "key": "latina_miami",
      "label": "Latina en Miami",
      "score": 85,
      "description": "...",
      "specific_tips": ["tip1", "tip2", "tip3"]
    }
  ],
  "plan_7d": [
    {
      "day": 1,
      "ideas": [
        {
          "title": "...",
          "core_key": "latina_miami",
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
  "verticals": ["vertical1", "vertical2", "vertical3", "vertical4", "vertical5"],
  "summary": "Resumen personalizado de 2-3 líneas sobre su perfil"
}`;

    const userPrompt = `Analiza las respuestas autobiográficas de este creador:

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

Identifica sus 3 Content Cores principales, genera plan 7 días y caption patterns.`;

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
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});