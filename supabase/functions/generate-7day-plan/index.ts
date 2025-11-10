import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { verticals, user_id } = await req.json();
    
    if (!verticals || verticals.length === 0) {
      throw new Error('No verticals provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // Build the prompt
    const systemPrompt = `Eres un estratega de contenido para creadores de contenido en redes sociales. 
Tu tarea es crear planes de contenido semanales que sean prácticos, accionables y personalizados.`;

    const verticalsText = verticals.map((v: any, i: number) => 
      `${i + 1}. ${v.name} (${v.confidence}% confianza)\n   Por qué: ${v.why}`
    ).join('\n');

    const userPrompt = `Basándote en estos 3 verticales de contenido:

${verticalsText}

Genera un plan de contenido de 7 días con las siguientes especificaciones:

- 2 ideas de shorts (≤15s) por día (14 total en la semana)
- 1 idea de video largo (5-10 min) para el día 7
- Cada short debe incluir:
  * Hook para los primeros 3 segundos (debe ser impactante)
  * Concepto principal (lo que desarrollas en segundos 4-12)
  * CTA final (llamada a la acción en últimos 2-3s)
  * 3-5 hashtags relevantes
  * Vertical al que pertenece
  * Duración objetivo (ej: "10-12s")

- El video largo debe incluir:
  * Título atractivo
  * Estructura de 3 actos
  * Hook inicial
  * Puntos clave a cubrir
  * CTA final
  * 5-8 hashtags
  * Duración objetivo

Usa el schema de función para devolver la respuesta estructurada.`;

    // Call Lovable AI with tool calling for structured output
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_week_plan",
              description: "Crear un plan de contenido semanal estructurado",
              parameters: {
                type: "object",
                properties: {
                  days: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "number" },
                        shorts: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              vertical: { type: "string" },
                              hook: { type: "string" },
                              concept: { type: "string" },
                              cta: { type: "string" },
                              hashtags: { type: "array", items: { type: "string" } },
                              duration_target: { type: "string" }
                            },
                            required: ["vertical", "hook", "concept", "cta", "hashtags", "duration_target"]
                          }
                        },
                        long_video: {
                          type: "object",
                          properties: {
                            title: { type: "string" },
                            hook: { type: "string" },
                            structure: { type: "array", items: { type: "string" } },
                            key_points: { type: "array", items: { type: "string" } },
                            cta: { type: "string" },
                            hashtags: { type: "array", items: { type: "string" } },
                            duration_target: { type: "string" }
                          }
                        }
                      },
                      required: ["day", "shorts"]
                    }
                  },
                  summary: { type: "string" },
                  next_steps: { type: "array", items: { type: "string" } }
                },
                required: ["days", "summary", "next_steps"]
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_week_plan" } }
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('Lovable AI error:', aiResponse.status, errorText);
      
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a few minutes.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable AI workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    console.log('AI Response:', JSON.stringify(aiData));

    // Extract the tool call result
    const toolCall = aiData.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('No tool call in AI response');
    }

    const weekPlan = JSON.parse(toolCall.function.arguments);

    // Save to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Save to ai_runs for tracking
    await supabase.from('ai_runs').insert({
      user_id: user_id,
      kind: '7day_plan',
      input_json: { verticals },
      output_json: weekPlan,
    });

    // Update profiles with the week plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('content_cores')
      .eq('id', user_id)
      .single();

    const updatedCores = {
      ...(profile?.content_cores || {}),
      week_plan: {
        ...weekPlan,
        generated_at: new Date().toISOString(),
      }
    };

    await supabase
      .from('profiles')
      .update({ content_cores: updatedCores })
      .eq('id', user_id);

    return new Response(
      JSON.stringify({
        week_plan: weekPlan,
        generated_at: new Date().toISOString(),
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-7day-plan:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
