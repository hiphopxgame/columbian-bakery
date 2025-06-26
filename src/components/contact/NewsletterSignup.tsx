
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSignup = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', newsletterEmail);
    // Handle newsletter signup
    setNewsletterEmail('');
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
