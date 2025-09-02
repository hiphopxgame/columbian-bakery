-- Allow anyone to read cbake_orders for the admin panel
CREATE POLICY "Anyone can view cbake orders for admin" 
ON public.cbake_orders 
FOR SELECT 
USING (true);

-- Allow anyone to update cbake_orders status for the admin panel  
CREATE POLICY "Anyone can update cbake orders for admin"
ON public.cbake_orders 
FOR UPDATE 
USING (true);

-- Allow anyone to read cbake_messages for the admin panel
CREATE POLICY "Anyone can view cbake messages for admin"
ON public.cbake_messages 
FOR SELECT 
USING (true);

-- Allow anyone to update cbake_messages for the admin panel
CREATE POLICY "Anyone can update cbake messages for admin"
ON public.cbake_messages 
FOR UPDATE 
USING (true);

-- Allow anyone to read cbake_quotes for the admin panel
CREATE POLICY "Anyone can view cbake quotes for admin"
ON public.cbake_quotes 
FOR SELECT 
USING (true);

-- Allow anyone to update cbake_quotes for the admin panel
CREATE POLICY "Anyone can update cbake quotes for admin"
ON public.cbake_quotes 
FOR UPDATE 
USING (true);

-- Allow anyone to read newsletter subscriptions for the admin panel
CREATE POLICY "Anyone can view newsletter subscriptions for admin"
ON public.cbake_newsletter_subscriptions 
FOR SELECT 
USING (true);