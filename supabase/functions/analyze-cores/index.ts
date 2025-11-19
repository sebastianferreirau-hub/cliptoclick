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
    const { answers, fullName, handle, country, format, goal } = await req.json();
    
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Build questions array for prompt
    const questions = {
      q1: "¿De dónde eres y dónde estás viviendo ahora?",
      q2: "¿Cómo describirías tus raíces o tu identidad cultural?",
      q3: "¿Con quién o con qué vives que haga parte de tu día a día?",
      q4: "¿Qué cosas te apasionan o te dan energía últimamente?",
      q5: "¿A qué te dedicas o qué haces para pagar tus cuentas?",
      q6: "¿Qué te gustaría estar haciendo dentro de un año?",
      q7: "Nombra 3 temas de los que podrías hablar 5 minutos sin guion"
    };

    const answersText = Object.entries(answers)
      .map(([q, a]) => `Q: ${questions[q as keyof typeof questions]}\nA: ${a}`)
      .join('\n\n');

    const prompt = `You are an expert content strategist. Analyze these quiz answers from a creator:

${answersText}

Additional context:
- Name: ${fullName}
- Handle: ${handle || 'Not provided'}
- Country: ${country}
- Content format: ${format}
- Goal: ${goal}

Generate exactly 3 Content Cores (content verticals) in this JSON format:

{
  "verticals": [
    {
      "name": "Short, punchy name (e.g., 'Inmigrante en USA')",
      "confidence": 95,
      "why": "One sentence explaining why this will work for them",
      "examples": [
        "Specific content idea 1",
        "Specific content idea 2",
        "Specific content idea 3"
      ]
    }
  ]
}

Rules:
- Be HYPER-SPECIFIC to their actual life situation
- Use their exact language/tone from answers
- Examples must be actionable ("Day in my life as X" not "lifestyle content")
- Confidence scores: 85-100 (you're confident in your analysis)
- Verticals should be complementary but distinct
- Return ONLY valid JSON, no markdown formatting`;

    console.log('Calling Anthropic API for content cores analysis...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1024,
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

    const content = data.content[0].text;
    
    // Parse JSON from response (handle potential markdown wrapping)
    let jsonContent = content;
    if (content.includes('```json')) {
      jsonContent = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonContent = content.split('```')[1].split('```')[0].trim();
    }

    const result = JSON.parse(jsonContent);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-cores function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to analyze content cores'
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
