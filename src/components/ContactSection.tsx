
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, TikTok, Pinterest } from 'lucide-react';

const ContactSection = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle contact form submission
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', newsletterEmail);
    // Handle newsletter signup
    setNewsletterEmail('');
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-yuca-cream to-coconut-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground">
              We'd love to hear from you and answer any questions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
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

            {/* Newsletter & Contact Info */}
            <div className="space-y-8">
              {/* Newsletter Signup */}
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

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-bread-brown">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground">(503) 555-BOMB</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">hello@colombianbakerypdx.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Catering</h4>
                    <p className="text-muted-foreground">catering@colombianbakerypdx.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Wholesale</h4>
                    <p className="text-muted-foreground">wholesale@colombianbakerypdx.com</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground">Portland, Oregon</p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-bread-brown">
                    Follow Us
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Stay connected and see behind-the-scenes content
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 border-guava-pink text-guava-pink hover:bg-guava-pink hover:text-coconut-white"
                    >
                      <Instagram className="w-5 h-5 mr-2" />
                      Instagram
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white"
                    >
                      <TikTok className="w-5 h-5 mr-2" />
                      TikTok
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1 border-dulce-caramel text-dulce-caramel hover:bg-dulce-caramel hover:text-coconut-white"
                    >
                      <Pinterest className="w-5 h-5 mr-2" />
                      Pinterest
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
