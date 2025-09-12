-- Update product prices to match current pricing structure
-- Check current prices first, then update individual ones that need changes

UPDATE cbake_products 
SET base_price = 
  CASE 
    WHEN name = 'Classic Bombshell' THEN 3.50  -- Updated to match seasonal pricing structure
    WHEN name = 'Vegan Bombshell' THEN 3.50    -- Consistency with other signature items
    WHEN name = 'Pandebono' THEN 3.50          -- Updated pricing
    WHEN name = 'Pan de Yuca' THEN 3.50        -- Updated pricing  
    WHEN name = 'Pandequeso' THEN 3.50         -- Updated pricing
    ELSE base_price
  END
WHERE name IN ('Classic Bombshell', 'Vegan Bombshell', 'Pandebono', 'Pan de Yuca', 'Pandequeso');

-- Update the seasonal special to have bulk pricing info in the description
UPDATE cbake_products 
SET description = 'Our limited-time specialty items like spinach, jalapeño stuffed breads & seasonal pastries

$3.50 each
$350/unit (100)
Limited Time'
WHERE name = 'Seasonal Special';