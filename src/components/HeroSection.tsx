
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import BombshellGallery from '@/components/BombshellGallery';

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden texture-flour bg-gradient-to-b from-coconut-white to-yuca-cream">
      {/* Background gradient with new palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-yuca-beige via-coconut-white to-guava-pink/30"></div>
      
      {/* Floating texture elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-dulce-caramel/20 rounded-full animate-texture-float"></div>
      <div className="absolute bottom-32 right-20 w-12 h-12 bg-tropic-green/20 rounded-full animate-texture-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-guava-pink/30 rounded-full animate-texture-float" style={{animationDelay: '2s'}}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main heading with enhanced typography */}
          <div className="text-center mb-16">
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
            <p className="text-lg text-foreground mb-12 max-w-2xl mx-auto animate-fade-in-up leading-relaxed" style={{animationDelay: '0.4s'}}>
              Handcrafted gluten-free yuca pastries filled with authentic Colombian flavors. 
              Made with love, tradition, and the finest ingredients.
              <span className="block mt-2 text-tropic-green font-semibold">
                Each bite tells a story of Colombian heritage 🇨🇴
              </span>
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Description */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-bread-brown mb-4">
                What Makes Our Bombshells Special
              </h3>
              
              <div className="space-y-4 text-foreground">
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Gluten-free pastry</strong> made from premium Colombian yuca dough</span>
                </p>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Authentic fillings</strong> including guava cream, dulce de leche, and coconut</span>
                </p>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Vegan and savory versions</strong> currently in development</span>
                </p>
                <p className="flex items-start">
                  <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span><strong>Naturally gluten-free</strong> made with care and intention</span>
                </p>
              </div>
            </div>

            {/* Right Column - Gallery */}
            <BombshellGallery />
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-guava-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                  Naturally Gluten-Free
                </h4>
                <p className="text-muted-foreground">
                  Made with yuca flour, naturally free from gluten while maintaining authentic Colombian taste
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-dulce-caramel/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🇨🇴</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                  Authentic Colombian
                </h4>
                <p className="text-muted-foreground">
                  Traditional recipes passed down through generations, bringing true Colombian flavors to Portland
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-bread-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👩‍🍳</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                  Handcrafted Daily
                </h4>
                <p className="text-muted-foreground">
                  Each Bombshell is carefully crafted by hand with attention to detail and love for the craft
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced CTA Button at bottom */}
          <div className="flex justify-center animate-fade-in-up">
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
