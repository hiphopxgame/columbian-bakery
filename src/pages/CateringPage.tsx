import React from 'react';
import Navigation from '@/components/Navigation';
import CateringSection from '@/components/CateringSection';
import Footer from '@/components/Footer';

const CateringPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <CateringSection />
      <Footer />
    </div>
  );
};

export default CateringPage;