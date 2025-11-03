const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  answers: {
    name: string;
    from_now: string;
    who_with: string;
    energizes: string;
    job_now: string;
    one_year: string;
    five_min_topics: string;
  };
  meta: {
    platforms: string[];
    language: string;
    level: string;
    age_range?: string;
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { answers, meta }: RequestBody = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    const systemPrompt = `You are VerticalsAI for ClipCrafters. Your job is to read a short onboarding questionnaire and return exactly THREE (3) content verticals that the creator should focus on for the next 8 weeks. Work in the user's language (Spanish or English).

Principles:
- Relatable > Perfect: everyday clips win.
- Shorts-first (≤12s). Rhythm > effects.
- Diversity: choose distinct verticals that together cover identity, daily life, and aspiration.
- Platform context: IG/TikTok/Snapchat.

Task:
1) Extract signals (identity, roles, pets, hobbies, work, migration, daily routines, pain/aspiration).
2) Map signals to a curated taxonomy of creator verticals:
   immigrant_latam_usa, pets_dogs, family_couple, fitness_health, food_cooking, tech_programming, gaming,
   lifestyle_daily, work_to_passion_transition, entrepreneurship_freelance, humor_daily, fashion_beauty,
   travel, study_self_improvement, finance_saving_latam, student_life, art_music, etc.
3) Score each candidate by semantic similarity + rule boosts (e.g., explicit mentions of dog, moved to USA, programmer).
4) Re-rank to keep 3 distinct, sustainable verticals. At most ONE aspirational (if evidence is weak).
5) Generate two (2) camera-ready ideas (≤12s each) per vertical, referencing likely real moments from the answers.
6) Keep tone simple, motivating, and platform-agnostic.

Output JSON schema (MUST follow exactly):
{
  "language": "es|en",
  "summary": "one-paragraph synthesis of the creator's identity and angle",
  "verticals": [
    {
      "name": "<short human-readable vertical name>",
      "confidence": 0-100,
      "why": "<1-2 sentences grounded in the answers>",
      "example_ideas_12s": [
        "<idea #1, ≤120 chars>",
        "<idea #2, ≤120 chars>"
      ],
      "hashtags_like": ["#example1","#example2","#example3"]
    }
  ],
  "posting_hint": "2 shorts/day, 1 long optional. Use clips bank + Notion tags.",
  "next_action": "Create your 'inspos' table and tag 5 references per vertical."
}

Rules:
- Return exactly 3 verticals.
- Avoid vague labels ("lifestyle" solo). If you must use it, pair it with a modifier (e.g., "Lifestyle mexicano en USA").
- Ideas must be recordable from daily life with minimal setup; avoid expensive gear or locations.
- If global confidence < 60, add: { "needs_clarification": "Ask the user ONE short question here" }.
- Respect the user's language. If inputs mix, pick the dominant one.
- No emojis in JSON. No markdown.`;

    const userPrompt = `Analyze this creator's onboarding responses:

Answers:
- Name: ${answers.name}
- From/Now: ${answers.from_now}
- Who with: ${answers.who_with}
- What energizes: ${answers.energizes}
- Current job: ${answers.job_now}
- One year goal: ${answers.one_year}
- 5-min topics: ${answers.five_min_topics}

Meta:
- Platforms: ${meta.platforms.join(', ')}
- Language: ${meta.language}
- Level: ${meta.level}
${meta.age_range ? `- Age range: ${meta.age_range}` : ''}

Return exactly 3 content verticals following the schema.`;

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
    console.error("Error in verticals-ai:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
    
    return new Response(
      JSON.stringify({ 
        error: "Unable to process your request. Please try again or contact support if the issue persists." 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
