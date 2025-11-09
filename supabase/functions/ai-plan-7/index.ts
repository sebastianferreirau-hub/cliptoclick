import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { verticals } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    const systemPrompt = `Eres un estratega de contenido que genera planes semanales de ideas para shorts.
Devuelve EXACTAMENTE 14 ideas de contenido (2 por día durante 7 días) basadas en los verticales proporcionados.
Distribuye las ideas equilibradamente entre los 3 verticales.
Formato JSON requerido:
{
  "days": [
    {
      "day": 1,
      "ideas": [
        {
          "title": "Título llamativo del short",
          "vertical": "nombre del vertical",
          "hook": "Primer segundo del video",
          "concept": "Concepto breve (15-20 palabras)"
        },
        {
          "title": "Segunda idea del día",
          "vertical": "otro vertical",
          "hook": "Hook diferente",
          "concept": "Otro concepto"
        }
      ]
    }
  ]
}`;

    const userPrompt = `Genera un plan de 7 días (14 ideas totales, 2 por día) usando estos verticales:
${verticals.map((v: any, i: number) => `${i + 1}. ${v.name}: ${v.justification}`).join('\n')}

Asegúrate de que las ideas sean:
- Accionables y específicas
- Variadas entre los 3 verticales
- Con hooks virales para los primeros 3 segundos
- Adaptadas a formato vertical (9:16)`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const plan = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(plan), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-plan-7:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
