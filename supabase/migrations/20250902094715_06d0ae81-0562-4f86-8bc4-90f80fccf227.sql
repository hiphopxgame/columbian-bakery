-- Create a table for bakery products (breads and pastries)
CREATE TABLE public.cbake_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  description TEXT,
  product_type TEXT NOT NULL CHECK (product_type IN ('signature', 'traditional')),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  image_url TEXT,
  base_price NUMERIC(10,2),
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER DEFAULT 0,
  ingredients TEXT,
  origin TEXT
);

-- Enable Row Level Security
ALTER TABLE public.cbake_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to view products
CREATE POLICY "Anyone can view active products" 
ON public.cbake_products 
FOR SELECT 
USING (is_active = true);

-- Create policy for admin to manage products
CREATE POLICY "Admin can manage products" 
ON public.cbake_products 
FOR ALL 
USING (auth.email() = 'gavabombshellpdx@gmail.com')
WITH CHECK (auth.email() = 'gavabombshellpdx@gmail.com');

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_cbake_products_updated_at
BEFORE UPDATE ON public.cbake_products
FOR EACH ROW
EXECUTE FUNCTION public.cbake_update_updated_at_column();

-- Insert current products into the database
INSERT INTO public.cbake_products (name, description, product_type, tags, image_url, base_price, display_order) VALUES
('Classic Bombshell', 'Traditional yuca pastry filled with sweet guava and cream. Every Bombshell includes a rich cream filling by default.', 'signature', ARRAY['Signature', 'Gluten-Free'], '/lovable-uploads/25811de9-3a06-4de9-b0ef-66a20f1e5a99.png', 12.99, 1),
('Vegan Bombshell', 'Plant-based yuca pastry with dairy-free guava and cashew-based cream. Just as decadent as our classic version.', 'signature', ARRAY['Signature', 'Vegan', 'Gluten-Free'], '/lovable-uploads/c831cef9-238a-4a72-b80b-03e9497ef8b2.png', 13.99, 2),
('Pandebono', 'A cheese bread made with cassava starch, cornmeal, cheese, and egg, often shaped into a ring or ball.', 'traditional', ARRAY['Traditional', 'Gluten-Free'], '/lovable-uploads/b8ecc4df-07da-4ac1-80b9-dda53ef13137.png', 8.99, 3),
('Pan de Yuca', 'A chewy, cheese-filled bread made with yuca flour.', 'traditional', ARRAY['Traditional', 'Gluten-Free'], '/lovable-uploads/83a02062-7942-4c9d-8980-42b95562ae22.png', 9.99, 4),
('Pandequeso', 'A soft, fluffy cheese bread made with fresh cheese, creating a light and airy texture with a rich, savory flavor.', 'traditional', ARRAY['Traditional', 'Gluten-Free'], '/lovable-uploads/a6a97d39-dabc-41a2-9777-6c6c4085aa47.png', 9.49, 5);

-- Update cbake_orders table to include product reference
ALTER TABLE public.cbake_orders 
ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.cbake_products(id),
ADD COLUMN IF NOT EXISTS product_name TEXT;