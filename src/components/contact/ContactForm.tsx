
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactForm = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle contact form submission
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-bread-brown">
          Send us a Message
        </CardTitle>
        <p className="text-muted-foreground">
          Have questions about our products, orders, or partnerships? 
          We're here to help!
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Name *
            </label>
            <Input
              value={contactForm.name}
              onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <Input
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="your.email@example.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message *
            </label>
            <Textarea
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Tell us how we can help you..."
              rows={5}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white text-lg font-semibold py-3"
          >
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
