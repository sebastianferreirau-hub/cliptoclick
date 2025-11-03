-- Add has_access field to profiles table for payment gating
ALTER TABLE public.profiles 
ADD COLUMN has_access boolean DEFAULT false NOT NULL;

-- Add connection status fields for integrations
ALTER TABLE public.profiles
ADD COLUMN notion_connected boolean DEFAULT false NOT NULL,
ADD COLUMN notion_workspace_id text,
ADD COLUMN onedrive_connected boolean DEFAULT false NOT NULL,
ADD COLUMN instagram_connected boolean DEFAULT false NOT NULL,
ADD COLUMN tiktok_connected boolean DEFAULT false NOT NULL,
ADD COLUMN snapchat_connected boolean DEFAULT false NOT NULL;

-- Create table to store OAuth tokens securely
CREATE TABLE public.integration_tokens (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, provider)
);

ALTER TABLE public.integration_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tokens"
  ON public.integration_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service can manage tokens"
  ON public.integration_tokens FOR ALL
  USING (true);

-- Create trigger for updated_at
CREATE TRIGGER update_integration_tokens_updated_at
  BEFORE UPDATE ON public.integration_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();