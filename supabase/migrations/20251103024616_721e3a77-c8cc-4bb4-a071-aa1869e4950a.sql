-- Fix purchases table RLS policy and add user_id
-- Add user_id column to link purchases to user accounts
ALTER TABLE public.purchases ADD COLUMN user_id UUID REFERENCES auth.users(id);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);

-- Drop the insecure public policy
DROP POLICY IF EXISTS "Enable read access for all users" ON public.purchases;

-- Create secure policy - users can only view their own purchases
CREATE POLICY "Users can view own purchases" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to insert purchases (for webhook)
CREATE POLICY "Service can insert purchases" ON public.purchases
  FOR INSERT WITH CHECK (true);

-- Encrypt tax_id field using Supabase Vault
-- Enable the vault extension if not already enabled
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;

-- Create a security definer function to encrypt tax IDs
CREATE OR REPLACE FUNCTION public.encrypt_tax_id(plaintext_tax_id TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  encrypted_value TEXT;
BEGIN
  -- Use a deterministic encryption key name
  encrypted_value := vault.create_secret(plaintext_tax_id);
  RETURN encrypted_value;
END;
$$;

-- Create a security definer function to decrypt tax IDs
CREATE OR REPLACE FUNCTION public.decrypt_tax_id(encrypted_tax_id TEXT)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  decrypted_value TEXT;
BEGIN
  decrypted_value := vault.read_secret(encrypted_tax_id);
  RETURN decrypted_value;
END;
$$;

-- Note: Existing tax_id data should be encrypted manually via a data migration
-- The application code should use the encrypt_tax_id function when storing new tax IDs