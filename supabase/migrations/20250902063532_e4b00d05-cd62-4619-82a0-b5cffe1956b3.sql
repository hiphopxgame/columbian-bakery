-- Fix security warnings by setting search_path on functions

-- Update the trigger function to have secure search_path
CREATE OR REPLACE FUNCTION public.cbake_update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;