import React from 'react';
import Navigation from '@/components/Navigation';
import WholesaleSection from '@/components/WholesaleSection';
import Footer from '@/components/Footer';

const WholesalePage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <WholesaleSection />
      <Footer />
    </div>
  );
};

export default WholesalePage;