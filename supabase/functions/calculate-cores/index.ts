import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  testResponses: number[];
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

    // Calculate dimensions from test responses
    const dimensions = {
      relatable: ((testResponses[0] + testResponses[4] + testResponses[10] + testResponses[11]) / 4 - 1) * 25,
      talking_head: ((testResponses[1] + testResponses[3]) / 2 - 1) * 25,
      broll_action: ((testResponses[2] + testResponses[8]) / 2 - 1) * 25,
      how_to_teach: ((testResponses[3] + testResponses[7]) / 2 - 1) * 25,
      humor_situational: ((testResponses[4] + testResponses[5]) / 2 - 1) * 25,
      data_insights: ((testResponses[7] + testResponses[9]) / 2 - 1) * 25,
    };

    // Sort and get top 3
    const sortedDims = Object.entries(dimensions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    const systemPrompt = `Eres un estratega de contenido experto. Filosofía From Clip to Click™: 
- Relatable > Perfecto
- Ritmo > Efectos  
- Velocidad > Complejidad
- Beat-Cut: 0.6s/0.8s/1.2s
- Texto nativo in-app

Con los 3 Content Cores detectados, genera:
1. Para cada core: label descriptivo, description (2-3 líneas), y specific_tips (array de 3 tips prácticos)
2. Plan de 7 días: 2 ideas por día con título, core_key asociado, hook_line_1 (primera línea "relatable"), beat_cut_timing (0.6/0.8/1.2), y native_text_idea
3. Caption patterns por plataforma (TikTok, Instagram, YouTube Shorts): estructura, hooks, CTAs

Devuelve JSON válido con esta estructura:
{
  "cores": [
    {
      "key": "relatable",
      "label": "Historias Auténticas",
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
          "core_key": "relatable",
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
  "summary": "Resumen personalizado de 2-3 líneas sobre su perfil"
}`;

    const userPrompt = `Analiza este perfil:
- Top 3 Content Cores: ${sortedDims.map(([k, v]) => `${k}: ${v.toFixed(0)}%`).join(", ")}
- Objetivo: ${goal}
- Tiempo: ${timeCommitment}
- Formato: ${preferredFormat}

Genera el perfil completo con cores, plan 7 días y caption patterns.`;

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

    // Add scores to cores
    result.cores = sortedDims.map(([key, score], index) => ({
      key,
      score: Math.round(score),
      ...(result.cores[index] || { label: key, description: "", specific_tips: [] }),
    }));

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