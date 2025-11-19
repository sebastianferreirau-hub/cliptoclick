import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.76.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { verticals, userId } = await req.json();
    
    if (!verticals || !verticals.length) {
      throw new Error('No verticals provided');
    }

    if (!userId) {
      throw new Error('User ID required');
    }

    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const verticalsText = verticals.map((v: any) => `
**${v.name}** (confidence: ${v.confidence}%)
- Why it works: ${v.why}
- Example topics: ${v.examples.join(', ')}
`).join('\n');

    const prompt = `You are a content strategist helping a creator build their content calendar.

The creator has these Content Cores (their main content verticals):

${verticalsText}

Generate a detailed 7-day content creation plan following this structure:

# Plan de Contenido - 7 Días

## Lunes
**Vertical:** [Choose most relevant vertical]
**Acción:** Grabar 5 clips sobre [specific topic from examples]
**Hook sugerido:** [Write an actual hook they can use]
**Duración:** 5-10 segundos cada clip

## Martes  
**Acción:** Edición
- Clips a editar: Los 5 del lunes
- Ritmo objetivo: 0.6-1.2s por corte
- Música: [Suggest vibe/genre]
- Publicar: 2 mejores piezas (IG + TikTok)

## Miércoles
**Vertical:** [Choose second vertical]
**Acción:** Grabar 5 clips sobre [specific topic]
**Hook sugerido:** [Write actual hook]
**Ángulo:** [Specific angle to take]

## Jueves
**Acción:** Distribución + Análisis
- Editar clips del miércoles
- Publicar 2 piezas
- Revisar engagement del lunes/martes
- Anotar: ¿Qué hook funcionó mejor?

## Viernes
**Vertical:** [Choose third vertical]
**Acción:** Grabar 5 clips sobre [specific topic]
**Hook sugerido:** [Write actual hook]
**Variación:** [Suggest trying something different]

## Sábado
**Acción:** Batch Editing Day
- Editar todos los clips pendientes
- Objetivo: 10 piezas listas para publicar
- Organizar en carpetas por vertical
- Programar posts para próxima semana

## Domingo
**Acción:** Planning & Descanso
- Guardar 10 inspos que encontraste esta semana en Notion
- Revisar qué vertical tuvo más engagement
- Planear temas para próximos 7 días
- NO EDITAR - solo planear

---

## Métricas a trackear esta semana:
- [ ] Clips grabados: ___ / 15
- [ ] Clips publicados: ___ / 8
- [ ] Impresiones totales: ___
- [ ] Vertical con más engagement: ___

## Recuerda:
- Velocidad > Perfección
- Publica aunque no esté "perfecto"
- El algoritmo premia consistencia, no calidad Hollywood

Make the plan HYPER-SPECIFIC with actual hooks and actionable steps. No generic advice.`;

    console.log('Calling Anthropic API for plan generation...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Anthropic response received');

    const planText = data.content[0].text;

    // Save plan to database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: savedPlan, error: saveError } = await supabase
      .from('content_plans')
      .insert({
        user_id: userId,
        plan_text: planText,
        verticals_used: verticals
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving plan:', saveError);
      throw saveError;
    }

    console.log('Plan saved successfully');

    return new Response(
      JSON.stringify({ 
        plan: planText,
        planId: savedPlan.id
      }), 
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-plan function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to generate content plan'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
