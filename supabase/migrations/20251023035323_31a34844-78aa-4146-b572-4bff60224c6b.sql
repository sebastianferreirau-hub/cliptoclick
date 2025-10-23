-- Fix: Add INSERT policy to profiles table to allow user registration
-- This policy allows users to create their own profile during signup
CREATE POLICY "Enable insert for authenticated users during registration"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);