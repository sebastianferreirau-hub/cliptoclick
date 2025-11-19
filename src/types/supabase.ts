export interface Profile {
  id: string;
  full_name?: string;
  handle?: string;
  country?: string;
  lang?: string;
  content_cores?: {
    verticals: ContentCore[];
    quiz_answers: Record<string, string>;
    format: string;
    goal: string;
    generated_at: string;
  };
  onboarding_completed?: boolean;
  trial_ends_at?: string;
  has_access: boolean;
  created_at: string;
  updated_at: string;
  email?: string;
  name?: string;
}

export interface ContentCore {
  name: string;
  confidence: number;
  why: string;
  examples: string[];
}

export interface ContentPlan {
  id: string;
  user_id: string;
  plan_text: string;
  verticals_used: ContentCore[];
  created_at: string;
  used_at?: string;
}
