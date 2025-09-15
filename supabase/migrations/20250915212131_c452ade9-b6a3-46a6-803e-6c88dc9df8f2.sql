-- Add business_location column to cbake_orders table
ALTER TABLE cbake_orders ADD COLUMN IF NOT EXISTS business_location TEXT;

-- Enable real-time for orders table
ALTER TABLE cbake_orders REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE cbake_orders;