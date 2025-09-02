
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const NewsletterSignup = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('cbake_newsletter_subscriptions')
        .insert([{ email: newsletterEmail }]);

      if (error) throw error;

      toast({
        title: "Subscribed Successfully!",
        description: "You'll be the first to know about new flavors and exclusive offers!",
      });
      setNewsletterEmail('');
    } catch (error: any) {
      console.error('Error subscribing to newsletter:', error);
      if (error.code === '23505') {
        toast({
          title: "Already Subscribed",
          description: "You're already subscribed to our newsletter!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "There was an issue subscribing you to our newsletter. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-bread-brown">
          Stay Updated
        </CardTitle>
        <p className="text-muted-foreground">
          Be the first to know when new flavors drop and get exclusive offers!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
          <Input
            type="email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
          <Button 
            type="submit" 
            className="w-full bg-guava-pink hover:bg-guava-pink/90 text-coconut-white font-semibold"
          >
            Subscribe to Newsletter
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;
