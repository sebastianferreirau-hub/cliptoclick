-- Create oauth_states table for secure OAuth state management
CREATE TABLE public.oauth_states (
  state TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'instagram',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '10 minutes')
);

-- Enable RLS
ALTER TABLE public.oauth_states ENABLE ROW LEVEL SECURITY;

-- Users can insert their own states
CREATE POLICY "Users can insert own oauth states"
ON public.oauth_states
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Service can read all states (for callback validation)
CREATE POLICY "Service can read all states"
ON public.oauth_states
FOR SELECT
USING (true);

-- Service can delete expired states
CREATE POLICY "Service can delete states"
ON public.oauth_states
FOR DELETE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_oauth_states_expires_at ON public.oauth_states(expires_at);

-- Auto-cleanup function for expired states
CREATE OR REPLACE FUNCTION public.cleanup_expired_oauth_states()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.oauth_states
  WHERE expires_at < now();
END;
$$;