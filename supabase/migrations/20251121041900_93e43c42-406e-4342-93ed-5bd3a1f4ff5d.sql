-- Create instagram_posts table to store individual post metrics
CREATE TABLE public.instagram_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  instagram_account_id TEXT NOT NULL,
  media_id TEXT NOT NULL UNIQUE,
  caption TEXT,
  media_type TEXT,
  media_url TEXT,
  permalink TEXT,
  timestamp TIMESTAMPTZ,
  like_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  engagement INTEGER DEFAULT 0,
  saved INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create instagram_metrics table to store aggregated metrics
CREATE TABLE public.instagram_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  instagram_account_id TEXT NOT NULL,
  posts_this_week INTEGER DEFAULT 0,
  total_impressions INTEGER DEFAULT 0,
  total_reach INTEGER DEFAULT 0,
  total_engagement INTEGER DEFAULT 0,
  engagement_rate NUMERIC(5,2) DEFAULT 0,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, instagram_account_id)
);

-- Enable RLS
ALTER TABLE public.instagram_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instagram_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for instagram_posts
CREATE POLICY "Users can view own Instagram posts"
  ON public.instagram_posts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Instagram posts"
  ON public.instagram_posts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Instagram posts"
  ON public.instagram_posts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own Instagram posts"
  ON public.instagram_posts
  FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for instagram_metrics
CREATE POLICY "Users can view own Instagram metrics"
  ON public.instagram_metrics
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own Instagram metrics"
  ON public.instagram_metrics
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own Instagram metrics"
  ON public.instagram_metrics
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own Instagram metrics"
  ON public.instagram_metrics
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX idx_instagram_posts_user_id ON public.instagram_posts(user_id);
CREATE INDEX idx_instagram_posts_account_id ON public.instagram_posts(instagram_account_id);
CREATE INDEX idx_instagram_posts_timestamp ON public.instagram_posts(timestamp);
CREATE INDEX idx_instagram_metrics_user_id ON public.instagram_metrics(user_id);