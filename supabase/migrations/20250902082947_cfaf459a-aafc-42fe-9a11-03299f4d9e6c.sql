-- Create cbake_profiles table for user management
CREATE TABLE public.cbake_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(email),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.cbake_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for cbake_profiles
CREATE POLICY "Users can view their own profile" 
ON public.cbake_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.cbake_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles" 
ON public.cbake_profiles 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.cbake_profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

CREATE POLICY "Admins can update all profiles" 
ON public.cbake_profiles 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM public.cbake_profiles 
  WHERE user_id = auth.uid() AND is_admin = true
));

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_cbake_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_cbake
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_cbake_user();

-- Update existing tables to reference cbake_profiles
ALTER TABLE public.cbake_orders ADD COLUMN user_id UUID REFERENCES public.cbake_profiles(user_id);
ALTER TABLE public.cbake_messages ADD COLUMN user_id UUID REFERENCES public.cbake_profiles(user_id);