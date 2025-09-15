-- Drop all existing policies for cbake_orders
DROP POLICY IF EXISTS "Anyone can create orders" ON cbake_orders;
DROP POLICY IF EXISTS "Block public access to orders" ON cbake_orders;
DROP POLICY IF EXISTS "Admin can manage orders" ON cbake_orders;
DROP POLICY IF EXISTS "Authenticated users can view their own orders only" ON cbake_orders;
DROP POLICY IF EXISTS "Users can update their own pending orders" ON cbake_orders;
DROP POLICY IF EXISTS "Users can view their own orders or admin can view all" ON cbake_orders;
DROP POLICY IF EXISTS "Admin can manage orders" ON cbake_orders;

-- Create new clean policies
-- Allow anyone to create orders (no authentication required)
CREATE POLICY "Public can create orders"
ON cbake_orders
FOR INSERT
WITH CHECK (true);

-- Allow users to view their own orders via email match, or admin can view all
CREATE POLICY "View own orders or admin view all"
ON cbake_orders
FOR SELECT
USING (
  is_cbake_admin() OR 
  (email IS NOT NULL AND auth.email() = email) OR
  (user_id IS NOT NULL AND auth.uid() = user_id)
);

-- Allow admin to manage all orders
CREATE POLICY "Admin full access to orders"
ON cbake_orders
FOR ALL
TO authenticated
USING (is_cbake_admin())
WITH CHECK (is_cbake_admin());

-- Allow users to update their own pending orders
CREATE POLICY "Update own pending orders"
ON cbake_orders
FOR UPDATE
USING (
  (email IS NOT NULL AND auth.email() = email AND status = 'pending') OR
  (user_id IS NOT NULL AND auth.uid() = user_id AND status = 'pending')
);