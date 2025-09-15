-- Fix RLS policies for cbake_orders to allow public order creation
DROP POLICY IF EXISTS "Anyone can create orders" ON cbake_orders;
DROP POLICY IF EXISTS "Block public access to orders" ON cbake_orders;

-- Allow anyone to create orders (no authentication required)
CREATE POLICY "Anyone can create orders"
ON cbake_orders
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own orders via email match
CREATE POLICY "Users can view their own orders by email"
ON cbake_orders
FOR SELECT
USING (
  is_cbake_admin() OR 
  (email IS NOT NULL AND auth.email() = email) OR
  (user_id IS NOT NULL AND auth.uid() = user_id)
);

-- Allow users to update their own pending orders
CREATE POLICY "Users can update their own pending orders"
ON cbake_orders
FOR UPDATE
USING (
  is_cbake_admin() OR
  ((email IS NOT NULL AND auth.email() = email) AND status = 'pending') OR
  ((user_id IS NOT NULL AND auth.uid() = user_id) AND status = 'pending')
);