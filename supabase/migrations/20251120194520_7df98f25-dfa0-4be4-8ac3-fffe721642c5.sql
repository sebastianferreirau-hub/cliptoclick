-- Create instagram_accounts table for storing Instagram Business Account connections
CREATE TABLE public.instagram_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  instagram_id TEXT NOT NULL,
  instagram_username TEXT NOT NULL,
  access_token TEXT NOT NULL,
  page_id TEXT NOT NULL,
  page_name TEXT NOT NULL,
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  token_expires_at TIMESTAMP WITH TIME ZONE,
  profile_picture_url TEXT,
  followers_count INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, instagram_id)
);

-- Enable RLS
ALTER TABLE public.instagram_accounts ENABLE ROW LEVEL SECURITY;

-- Users can view their own Instagram accounts
CREATE POLICY "Users can view own Instagram accounts"
ON public.instagram_accounts
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own Instagram accounts
CREATE POLICY "Users can insert own Instagram accounts"
ON public.instagram_accounts
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own Instagram accounts
CREATE POLICY "Users can update own Instagram accounts"
ON public.instagram_accounts
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own Instagram accounts
CREATE POLICY "Users can delete own Instagram accounts"
ON public.instagram_accounts
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_instagram_accounts_updated_at
BEFORE UPDATE ON public.instagram_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_instagram_accounts_user_id ON public.instagram_accounts(user_id);
CREATE INDEX idx_instagram_accounts_instagram_id ON public.instagram_accounts(instagram_id);