-- Update admin policies to use the correct email address
DROP POLICY IF EXISTS "Admin can manage orders" ON public.cbake_orders;
DROP POLICY IF EXISTS "Admin can manage messages" ON public.cbake_messages;
DROP POLICY IF EXISTS "Admin can manage newsletter subscriptions" ON public.cbake_newsletter_subscriptions;
DROP POLICY IF EXISTS "Admin can manage quotes" ON public.cbake_quotes;

-- Recreate policies with correct email
CREATE POLICY "Admin can manage orders" 
ON public.cbake_orders 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com');

CREATE POLICY "Admin can manage messages" 
ON public.cbake_messages 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com');

CREATE POLICY "Admin can manage newsletter subscriptions" 
ON public.cbake_newsletter_subscriptions 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com');

CREATE POLICY "Admin can manage quotes" 
ON public.cbake_quotes 
FOR ALL 
USING (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com')
WITH CHECK (auth.uid() IS NOT NULL AND auth.email() = 'gavabombshellpdx@gmail.com');