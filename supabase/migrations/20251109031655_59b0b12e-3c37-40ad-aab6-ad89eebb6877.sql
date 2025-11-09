-- Course curriculum structure
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Organization
  week_number INTEGER NOT NULL CHECK (week_number BETWEEN 1 AND 8),
  order_index INTEGER NOT NULL,
  module_name TEXT NOT NULL,
  
  -- Content
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  learning_outcomes JSONB DEFAULT '[]'::jsonb,
  
  -- Vimeo
  vimeo_video_id TEXT NOT NULL,
  vimeo_thumbnail_url TEXT,
  duration_seconds INTEGER,
  
  -- AI Integration - connect to content cores
  related_verticals JSONB DEFAULT '[]'::jsonb,
  vertical_relevance_score JSONB DEFAULT '{}'::jsonb,
  
  -- Metadata
  publish_status TEXT DEFAULT 'draft' CHECK (publish_status IN ('draft', 'live', 'archived')),
  is_premium BOOLEAN DEFAULT true,
  prerequisites JSONB DEFAULT '[]'::jsonb,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT
);

-- User progress tracking
CREATE TABLE lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  
  -- Progress
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  last_position_seconds INTEGER DEFAULT 0,
  watch_time_seconds INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
  
  -- Engagement
  is_bookmarked BOOLEAN DEFAULT false,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(user_id, lesson_id)
);

-- Lesson-to-vertical mapping
CREATE TABLE lesson_vertical_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  vertical_slug TEXT NOT NULL,
  relevance_score INTEGER CHECK (relevance_score BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(lesson_id, vertical_slug)
);

-- Indexes
CREATE INDEX lessons_week_order_idx ON lessons(week_number, order_index);
CREATE INDEX lessons_slug_idx ON lessons(slug);
CREATE INDEX lessons_status_idx ON lessons(publish_status);
CREATE INDEX lesson_progress_user_idx ON lesson_progress(user_id);
CREATE INDEX lesson_progress_completion_idx ON lesson_progress(user_id, completed_at);
CREATE INDEX lesson_vertical_tags_lesson_idx ON lesson_vertical_tags(lesson_id);
CREATE INDEX lesson_vertical_tags_vertical_idx ON lesson_vertical_tags(vertical_slug);

-- RLS Policies
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_vertical_tags ENABLE ROW LEVEL SECURITY;

-- Anyone can view published lessons metadata
CREATE POLICY "Anyone can view published lessons"
  ON lessons FOR SELECT
  USING (publish_status = 'live');

-- Users can view their own progress
CREATE POLICY "Users can view own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Anyone can view vertical tags (for matching)
CREATE POLICY "Anyone can view vertical tags"
  ON lesson_vertical_tags FOR SELECT
  USING (true);

-- Admins can manage all tables
CREATE POLICY "Admins can manage lessons"
  ON lessons FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can manage vertical tags"
  ON lesson_vertical_tags FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));