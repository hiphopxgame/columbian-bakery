import React from 'react';
import Navigation from '@/components/Navigation';
import ContactForm from '@/components/contact/ContactForm';
import NewsletterSignup from '@/components/contact/NewsletterSignup';
import ContactInfo from '@/components/contact/ContactInfo';
import SocialMedia from '@/components/contact/SocialMedia';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-b from-yuca-cream to-coconut-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
                Get in Touch
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We'd love to hear from you! Whether you have questions about our products, 
                want to place an order, or are interested in catering or wholesale opportunities.
              </p>
            </div>

            {/* Quick Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center bg-card/50 border-guava-pink/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">📞</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Call Us</h3>
                  <p className="text-muted-foreground text-sm">
                    For immediate assistance with orders or catering inquiries
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50 border-dulce-caramel/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Email Us</h3>
                  <p className="text-muted-foreground text-sm">
                    Send detailed inquiries and we'll respond within 24 hours
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50 border-tropic-green/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">💬</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Social Media</h3>
                  <p className="text-muted-foreground text-sm">
                    Follow us for updates, photos, and behind-the-scenes content
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Contact Section */}
            <div className="grid lg:grid-cols-2 gap-12 mb-12">
              {/* Contact Form */}
              <div>
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-bread-brown">Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactForm />
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information & Newsletter */}
              <div className="space-y-8">
                <Card className="bg-card/50 border-border/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-bread-brown">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ContactInfo />
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-guava-pink/10 to-dulce-caramel/10 border-guava-pink/20">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-bread-brown">Stay Connected</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <NewsletterSignup />
                    <div className="pt-4 border-t border-border/50">
                      <h4 className="text-lg font-semibold text-bread-brown mb-3">Follow Us</h4>
                      <SocialMedia />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Business Hours & Location */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-yuca-cream to-coconut-white border-bread-brown/20">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-bread-brown flex items-center">
                    <span className="mr-2">🕒</span>
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>7:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>9:00 AM - 5:00 PM</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Note:</strong> Catering and wholesale orders may require advance notice. 
                    Contact us to discuss timing for large orders.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-tropic-green/10 to-bread-brown/10 border-tropic-green/20">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-bread-brown flex items-center">
                    <span className="mr-2">📍</span>
                    Service Area
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-muted-foreground">
                      <strong>Portland Metro Area</strong><br />
                      Delivery and catering services available throughout the greater Portland region
                    </p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>• Downtown Portland</p>
                      <p>• Eastside neighborhoods</p>
                      <p>• Westside communities</p>
                      <p>• Surrounding suburbs</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <strong>Outside Portland?</strong> Contact us about shipping options for wholesale orders.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;