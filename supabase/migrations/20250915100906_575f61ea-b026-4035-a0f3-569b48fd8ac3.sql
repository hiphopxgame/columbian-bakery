-- Add new fields to cbake_orders table
ALTER TABLE cbake_orders 
ADD COLUMN first_name TEXT,
ADD COLUMN last_name TEXT,
ADD COLUMN company_name TEXT;

-- Update existing orders to split the name field (if any exist)
UPDATE cbake_orders 
SET first_name = SPLIT_PART(name, ' ', 1),
    last_name = CASE 
      WHEN POSITION(' ' IN name) > 0 THEN SUBSTRING(name FROM POSITION(' ' IN name) + 1)
      ELSE ''
    END
WHERE name IS NOT NULL AND name != '';

-- Make first_name required for new orders
ALTER TABLE cbake_orders ALTER COLUMN first_name SET NOT NULL;