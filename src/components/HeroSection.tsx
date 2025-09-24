
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden texture-flour">
      {/* Background gradient with new palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-yuca-beige via-coconut-white to-guava-pink/30"></div>
      
      {/* Floating texture elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-dulce-caramel/20 rounded-full animate-texture-float"></div>
      <div className="absolute bottom-32 right-20 w-12 h-12 bg-tropic-green/20 rounded-full animate-texture-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-guava-pink/30 rounded-full animate-texture-float" style={{animationDelay: '2s'}}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading with enhanced typography */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-cacao-brown mb-6 animate-fade-in-up">
            The Bombshell Has Landed
            <span className="block text-2xl md:text-3xl mt-4 text-guava-pink font-medium animate-joyful-bounce">
              ¡Explosión de Sabor!
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-cacao-brown/80 mb-8 animate-fade-in-up font-medium" style={{animationDelay: '0.2s'}}>
            A Taste of Colombia in the Heart of Portland
          </p>
          
          {/* Description with enhanced styling */}
          <div className="relative">
            <p className="text-lg text-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{animationDelay: '0.4s'}}>
              Handcrafted gluten-free yuca pastries filled with authentic Colombian flavors. 
              Made with love, tradition, and the finest ingredients.
              <span className="block mt-2 text-tropic-green font-semibold">
                Each bite tells a story of Colombian heritage 🇨🇴
              </span>
            </p>
          </div>

          {/* Enhanced CTA Button with joyful styling */}
          <div className="flex justify-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-tropic-green text-tropic-green hover:bg-tropic-green hover:text-coconut-white px-8 py-4 text-lg font-semibold btn-joyful"
              onClick={() => scrollToSection('#wholesale')}
            >
              order now
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-coconut-white to-transparent"></div>
      
      {/* Updated Colombian accent line with new colors */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-colombian-yellow via-tropic-green via-guava-pink to-colombian-blue opacity-80"></div>
      
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-woven opacity-30 pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
