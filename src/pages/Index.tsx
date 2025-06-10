
import React from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import RetailSection from '@/components/RetailSection';
import WholesaleSection from '@/components/WholesaleSection';
import CatalogSection from '@/components/CatalogSection';
import CateringSection from '@/components/CateringSection';
import AboutBakerySection from '@/components/AboutBakerySection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RetailSection />
      <WholesaleSection />
      <CatalogSection />
      <CateringSection />
      <AboutBakerySection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
