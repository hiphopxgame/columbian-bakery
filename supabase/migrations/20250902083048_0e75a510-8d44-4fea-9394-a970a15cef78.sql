-- Fix security issues and infinite recursion in RLS policies

-- Drop existing policies that could cause infinite recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.cbake_profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.cbake_profiles;

-- Create security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_cbake_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.cbake_profiles 
    WHERE user_id = auth.uid() AND is_admin = true
  );
$$;

-- Drop trigger first, then function, then recreate with proper search_path
DROP TRIGGER IF EXISTS on_auth_user_created_cbake ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_cbake_user();

CREATE OR REPLACE FUNCTION public.handle_new_cbake_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  is_first_user BOOLEAN;
BEGIN
  -- Check if this is the first user
  SELECT NOT EXISTS (SELECT 1 FROM public.cbake_profiles LIMIT 1) INTO is_first_user;
  
  -- Insert profile
  INSERT INTO public.cbake_profiles (user_id, email, full_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.email),
    is_first_user  -- First user becomes admin
  );
  
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created_cbake
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_cbake_user();

-- Create new policies using the security definer function
CREATE POLICY "Admins can view all profiles" 
ON public.cbake_profiles 
FOR SELECT 
USING (is_cbake_admin());

CREATE POLICY "Admins can update all profiles" 
ON public.cbake_profiles 
FOR UPDATE 
USING (is_cbake_admin());

-- Allow profile creation during signup
CREATE POLICY "System can create profiles" 
ON public.cbake_profiles 
FOR INSERT 
WITH CHECK (true);