-- Add Seasonal Special back to the bakery catalog with proper UUID
INSERT INTO cbake_products (
  id,
  name,
  description,
  product_type,
  base_price,
  tags,
  image_url,
  is_active,
  display_order
) VALUES (
  gen_random_uuid(),
  'Seasonal Special',
  'Our limited-time specialty items like spinach, jalapeño stuffed breads & seasonal pastries',
  'signature',
  4.00,
  ARRAY['🌟 SEASONAL', 'Limited Time', 'Specialty', 'Custom'],
  '/lovable-uploads/seasonal-special-mystery.jpg',
  true,
  99
);