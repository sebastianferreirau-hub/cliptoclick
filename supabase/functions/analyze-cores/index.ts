import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('=== analyze-cores function called ===');

  try {
    // Parse request body
    const body = await req.json();
    console.log('Request body received:', JSON.stringify(body, null, 2));

    const { answers, fullName, handle, country, format, goal } = body;

    // Validate required fields
    if (!answers) {
      throw new Error('Missing required field: answers');
    }

    if (!fullName) {
      throw new Error('Missing required field: fullName');
    }

    // Get API key
    const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    console.log('API key exists:', !!ANTHROPIC_API_KEY);
    
    if (!ANTHROPIC_API_KEY) {
      throw new Error('ANTHROPIC_API_KEY not configured in Supabase secrets');
    }

    // Build questions mapping
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

    console.log('Answers formatted for prompt');

    // Construct prompt
    const prompt = `You are an expert content strategist. Analyze these quiz answers from a creator:

${answersText}

Additional context:
- Name: ${fullName}
- Handle: ${handle || 'Not provided'}
- Country: ${country || 'Not provided'}
- Content format: ${format || 'shorts'}
- Goal: ${goal || 'Not specified'}

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

CRITICAL RULES:
- Be HYPER-SPECIFIC to their actual life situation from the answers
- Use their exact language/tone from answers
- Examples must be actionable ("Day in my life as X" not "lifestyle content")
- Confidence scores: 85-100 (you're confident in your analysis)
- Verticals should be complementary but distinct
- Return ONLY valid JSON with NO markdown formatting, NO backticks, NO extra text`;

    console.log('Calling Claude API...');

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      })
    });

    console.log('Claude API response status:', claudeResponse.status);

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error('Claude API error response:', errorText);
      throw new Error(`Claude API error: ${claudeResponse.status} - ${errorText}`);
    }

    const claudeData = await claudeResponse.json();
    console.log('Claude API response received');

    if (!claudeData.content || !claudeData.content[0]) {
      console.error('Invalid Claude response structure:', claudeData);
      throw new Error('Invalid response from Claude API');
    }

    let content = claudeData.content[0].text;
    console.log('Raw Claude content (first 200 chars):', content.substring(0, 200));

    // Parse JSON (handle potential markdown wrapping)
    let jsonContent = content.trim();
    
    // Remove markdown code blocks if present
    if (jsonContent.includes('```json')) {
      jsonContent = jsonContent.split('```json')[1].split('```')[0].trim();
      console.log('Removed ```json wrapper');
    } else if (jsonContent.includes('```')) {
      jsonContent = jsonContent.split('```')[1].split('```')[0].trim();
      console.log('Removed ``` wrapper');
    }

    console.log('Attempting to parse JSON...');
    const result = JSON.parse(jsonContent);
    console.log('JSON parsed successfully:', JSON.stringify(result, null, 2));

    // Validate result structure
    if (!result.verticals || !Array.isArray(result.verticals)) {
      throw new Error('Invalid result structure: missing verticals array');
    }

    if (result.verticals.length !== 3) {
      console.warn(`Expected 3 verticals, got ${result.verticals.length}`);
    }

    console.log('=== analyze-cores function completed successfully ===');

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: unknown) {
    console.error('=== ERROR in analyze-cores function ===');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');

    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        details: 'Failed to analyze content cores',
        type: error instanceof Error ? error.constructor.name : typeof error
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
