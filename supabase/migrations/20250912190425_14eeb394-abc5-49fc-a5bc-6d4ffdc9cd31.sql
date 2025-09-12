-- Add Seasonal Special product to catalog
INSERT INTO cbake_products (
  name, 
  description, 
  product_type, 
  tags, 
  base_price, 
  display_order, 
  is_active,
  image_url
) VALUES (
  'Seasonal Special',
  'Our limited-time specialty items like spinach, jalapeño stuffed breads & seasonal pastries. Limited Time',
  'signature',
  ARRAY['Seasonal', 'Limited Time', 'Specialty'],
  3.50,
  0,
  true,
  '/lovable-uploads/seasonal-special-mystery.jpg'
);

-- Create cart items table for cart functionality
CREATE TABLE cbake_cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  product_id UUID,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC NOT NULL,
  dough_type TEXT,
  filling TEXT,
  special_instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id, dough_type, filling)
);

-- Enable RLS on cart items
ALTER TABLE cbake_cart_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for cart items
CREATE POLICY "Users can manage their own cart items"
ON cbake_cart_items
FOR ALL
USING (auth.uid() = user_id OR auth.uid() IS NULL);

-- Allow anonymous users to manage cart items (session-based)
CREATE POLICY "Anonymous users can manage cart items"
ON cbake_cart_items
FOR ALL
USING (user_id IS NULL);

-- Add trigger for updated_at timestamp
CREATE TRIGGER update_cbake_cart_items_updated_at
BEFORE UPDATE ON cbake_cart_items
FOR EACH ROW
EXECUTE FUNCTION cbake_update_updated_at_column();