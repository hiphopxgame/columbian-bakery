
import React from 'react';
import ContactForm from '@/components/contact/ContactForm';
import NewsletterSignup from '@/components/contact/NewsletterSignup';
import ContactInfo from '@/components/contact/ContactInfo';
import SocialMedia from '@/components/contact/SocialMedia';

const ContactSection = () => {
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
            <ContactForm />

            {/* Newsletter & Contact Info */}
            <div className="space-y-8">
              <NewsletterSignup />
              <ContactInfo />
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
