-- Add Platzi-style fields to lessons table
ALTER TABLE public.lessons
  ADD COLUMN IF NOT EXISTS notion_page_id TEXT,
  ADD COLUMN IF NOT EXISTS comments_enabled BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS instructor_name TEXT,
  ADD COLUMN IF NOT EXISTS instructor_avatar_url TEXT;

-- Create threaded comments table with timestamps and moderation
CREATE TABLE IF NOT EXISTS public.lesson_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.lesson_comments(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  ts_seconds INT,
  is_answer BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lesson_comments ENABLE ROW LEVEL SECURITY;

-- Indexes for performance
CREATE INDEX idx_comments_lesson ON public.lesson_comments(lesson_id, created_at DESC);
CREATE INDEX idx_comments_parent ON public.lesson_comments(parent_id) WHERE parent_id IS NOT NULL;
CREATE INDEX idx_comments_pinned ON public.lesson_comments(lesson_id, is_pinned) WHERE is_pinned = true;

-- RLS Policies for comments
CREATE POLICY "Users with access can view comments"
  ON public.lesson_comments FOR SELECT
  USING (
    EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.has_access = true)
  );

CREATE POLICY "Users with access can insert comments"
  ON public.lesson_comments FOR INSERT
  WITH CHECK (
    user_id = auth.uid() AND
    EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.has_access = true)
  );

CREATE POLICY "Users can update own comments"
  ON public.lesson_comments FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all comments"
  ON public.lesson_comments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create comment reports table for moderation
CREATE TABLE IF NOT EXISTS public.comment_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  comment_id UUID NOT NULL REFERENCES public.lesson_comments(id) ON DELETE CASCADE,
  reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(comment_id, reporter_id)
);

-- Enable RLS for reports
ALTER TABLE public.comment_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can report comments"
  ON public.comment_reports FOR INSERT
  WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Admins can manage reports"
  ON public.comment_reports FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Enable realtime for comments
ALTER PUBLICATION supabase_realtime ADD TABLE public.lesson_comments;