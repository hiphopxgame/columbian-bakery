-- Fix RLS policies by removing conflicting ALL policy and creating specific policies
DROP POLICY IF EXISTS "Admin can manage all orders" ON cbake_orders;
DROP POLICY IF EXISTS "Anyone can create orders" ON cbake_orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON cbake_orders;
DROP POLICY IF EXISTS "Users can update own pending orders" ON cbake_orders;

-- Allow anyone (including unauthenticated users) to insert orders
CREATE POLICY "Public can insert orders"
ON cbake_orders
FOR INSERT
TO public
WITH CHECK (true);

-- Admin can view all orders
CREATE POLICY "Admin can view all orders"
ON cbake_orders
FOR SELECT
TO authenticated
USING (is_cbake_admin());

-- Admin can update all orders
CREATE POLICY "Admin can update all orders"
ON cbake_orders
FOR UPDATE
TO authenticated
USING (is_cbake_admin())
WITH CHECK (is_cbake_admin());

-- Admin can delete orders
CREATE POLICY "Admin can delete orders"
ON cbake_orders
FOR DELETE
TO authenticated
USING (is_cbake_admin());

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
ON cbake_orders
FOR SELECT
TO public
USING (
  (auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
  (auth.email() IS NOT NULL AND email = auth.email())
);

-- Users can update their own pending orders
CREATE POLICY "Users can update own pending orders"
ON cbake_orders
FOR UPDATE
TO public
USING (
  ((auth.uid() IS NOT NULL AND user_id = auth.uid()) OR
   (auth.email() IS NOT NULL AND email = auth.email())) AND 
  status = 'pending'
);