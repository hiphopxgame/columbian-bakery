-- Create tables with cbake_ prefix for the bakery management system

-- Orders table
CREATE TABLE public.cbake_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  order_type TEXT NOT NULL CHECK (order_type IN ('retail', 'wholesale-baked', 'wholesale-frozen')),
  quantity INTEGER NOT NULL DEFAULT 1,
  dough_type TEXT NOT NULL,
  filling TEXT NOT NULL,
  delivery TEXT NOT NULL,
  special_instructions TEXT,
  estimated_total DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Contact messages table
CREATE TABLE public.cbake_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('general', 'wholesale', 'catering')),
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'resolved')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Newsletter subscriptions table
CREATE TABLE public.cbake_newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Custom quotes table
CREATE TABLE public.cbake_quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  business_name TEXT,
  event_type TEXT,
  guest_count INTEGER,
  event_date DATE,
  catering_services JSONB,
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'quoted', 'accepted', 'declined')),
  quoted_amount DECIMAL(10,2),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.cbake_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbake_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbake_newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cbake_quotes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (anyone can create orders/messages/subscriptions)
CREATE POLICY "Anyone can create orders" 
ON public.cbake_orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can create messages" 
ON public.cbake_messages 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.cbake_newsletter_subscriptions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can create quotes" 
ON public.cbake_quotes 
FOR INSERT 
WITH CHECK (true);

-- Create policies for admin access (only admin can view/manage everything)
CREATE POLICY "Admin can manage orders" 
ON public.cbake_orders 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com');

CREATE POLICY "Admin can manage messages" 
ON public.cbake_messages 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com');

CREATE POLICY "Admin can manage newsletter subscriptions" 
ON public.cbake_newsletter_subscriptions 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com');

CREATE POLICY "Admin can manage quotes" 
ON public.cbake_quotes 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'hiphopxgame@gmail.com');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.cbake_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER cbake_orders_updated_at
    BEFORE UPDATE ON public.cbake_orders
    FOR EACH ROW
    EXECUTE FUNCTION public.cbake_update_updated_at_column();

CREATE TRIGGER cbake_messages_updated_at
    BEFORE UPDATE ON public.cbake_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.cbake_update_updated_at_column();

CREATE TRIGGER cbake_newsletter_updated_at
    BEFORE UPDATE ON public.cbake_newsletter_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION public.cbake_update_updated_at_column();

CREATE TRIGGER cbake_quotes_updated_at
    BEFORE UPDATE ON public.cbake_quotes
    FOR EACH ROW
    EXECUTE FUNCTION public.cbake_update_updated_at_column();