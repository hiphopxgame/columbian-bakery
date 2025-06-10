
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-yuca-cream via-coconut-white to-guava-pink/20"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-bread-brown mb-6 animate-fade-in-up">
            The Bombshell Has Landed
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            A Taste of Colombia in the Heart of Portland
          </p>
          
          {/* Description */}
          <p className="text-lg text-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            Handcrafted gluten-free yuca pastries filled with authentic Colombian flavors. 
            Made with love, tradition, and the finest ingredients.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              className="bg-bread-brown hover:bg-bread-brown/90 text-coconut-white px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('#retail')}
            >
              Order for Home
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('#wholesale')}
            >
              Order for Business
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="text-bread-brown hover:bg-yuca-cream px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection('#about')}
            >
              Explore the Bakery
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-coconut-white to-transparent"></div>
      
      {/* Colombian accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-colombian-yellow via-colombian-blue to-colombian-red"></div>
    </section>
  );
};

export default HeroSection;
