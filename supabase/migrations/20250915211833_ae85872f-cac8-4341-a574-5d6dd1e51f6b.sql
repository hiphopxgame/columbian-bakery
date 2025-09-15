-- Fix RLS policies for cbake_orders - remove conflicting admin policy and recreate properly
DROP POLICY IF EXISTS "Admin full access to orders" ON cbake_orders;
DROP POLICY IF EXISTS "Public can create orders" ON cbake_orders;
DROP POLICY IF EXISTS "View own orders or admin view all" ON cbake_orders;
DROP POLICY IF EXISTS "Update own pending orders" ON cbake_orders;

-- Allow anyone (including unauthenticated users) to create orders
CREATE POLICY "Anyone can create orders"
ON cbake_orders
FOR INSERT
WITH CHECK (true);

-- Admin can manage all orders (separate policy for authenticated admins only)
CREATE POLICY "Admin can manage all orders"
ON cbake_orders
FOR ALL
TO authenticated
USING (is_cbake_admin())
WITH CHECK (is_cbake_admin());

-- Users can view their own orders by email match or user_id, admin can view all
CREATE POLICY "Users can view their own orders"
ON cbake_orders
FOR SELECT
USING (
  is_cbake_admin() OR 
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.email() IS NOT NULL AND email = auth.email())
);

-- Users can update their own pending orders
CREATE POLICY "Users can update own pending orders"
ON cbake_orders
FOR UPDATE
USING (
  is_cbake_admin() OR
  (auth.uid() IS NOT NULL AND user_id = auth.uid() AND status = 'pending') OR
  (auth.email() IS NOT NULL AND email = auth.email() AND status = 'pending')
);