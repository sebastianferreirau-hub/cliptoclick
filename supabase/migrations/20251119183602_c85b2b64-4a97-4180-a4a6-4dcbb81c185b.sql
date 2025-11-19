-- ============================================
-- CLIP TO CLICK - DATABASE SCHEMA
-- ============================================

-- Extend profiles table with onboarding and trial data
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS content_cores JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE;

-- Create content_plans table
CREATE TABLE IF NOT EXISTS public.content_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_text TEXT NOT NULL,
  verticals_used JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on content_plans
ALTER TABLE public.content_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for content_plans
CREATE POLICY "Users can view own plans"
  ON public.content_plans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own plans"
  ON public.content_plans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans"
  ON public.content_plans
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for performance
CREATE INDEX IF NOT EXISTS content_plans_user_id_idx ON public.content_plans(user_id);
CREATE INDEX IF NOT EXISTS content_plans_created_at_idx ON public.content_plans(created_at DESC);