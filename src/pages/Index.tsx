
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CatalogSection from '@/components/CatalogSection';
import AboutBakerySection from '@/components/AboutBakerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CatalogSection />
      <AboutBakerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
