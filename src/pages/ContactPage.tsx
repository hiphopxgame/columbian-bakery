import React from 'react';
import Navigation from '@/components/Navigation';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default ContactPage;