
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
              The Colombian Bakery
              <span className="block text-2xl md:text-3xl mt-4 text-guava-pink font-medium animate-joyful-bounce">
                Authentic Colombian Pastries in Portland
              </span>
            </h1>
            
            {/* WHO & WHAT */}
            <p className="text-xl md:text-2xl text-cacao-brown/80 mb-8 animate-fade-in-up font-medium" style={{animationDelay: '0.2s'}}>
              Family-owned bakery bringing traditional Colombian flavors to Portland
            </p>

            {/* Order Button */}
            <div className="flex justify-center mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-tropic-green text-tropic-green hover:bg-tropic-green hover:text-coconut-white px-8 py-4 text-lg font-semibold btn-joyful"
                onClick={() => navigate('/order')}
              >
                order now
              </Button>
            </div>
            
            {/* WHY - Value Proposition */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl font-serif font-semibold text-bread-brown mb-6">Why Choose Our Bombshells?</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-tropic-green">🌱 Naturally Gluten-Free</h3>
                  <p className="text-foreground">Made with premium yuca flour - no artificial substitutes needed. Perfect for celiac and gluten-sensitive customers.</p>
                  
                  <h3 className="text-lg font-semibold text-tropic-green">🇨🇴 100% Authentic</h3>
                  <p className="text-foreground">Family recipes passed down through generations. Taste the real Colombia in every bite.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-tropic-green">👩‍🍳 Handcrafted Fresh Daily</h3>
                  <p className="text-foreground">Each pastry is carefully made by hand using traditional techniques. No mass production, just artisan quality.</p>
                  
                  <h3 className="text-lg font-semibold text-tropic-green">📅 Available Now</h3>
                  <p className="text-foreground">Order online for pickup or delivery. Perfect for events, offices, or treating yourself.</p>
                </div>
              </div>
            </div>
          </div>

          {/* WHAT - Product Details */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - What We Offer */}
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-semibold text-bread-brown mb-6">
                What Are Bombshells?
              </h2>
              
              <div className="space-y-4 text-foreground">
                <p className="text-lg leading-relaxed">
                  <strong>Bombshells</strong> are traditional Colombian pastries made from yuca (cassava) flour. 
                  Think of them as the perfect fusion of a croissant and a empanada - flaky, golden, and bursting with flavor.
                </p>
                
                <h3 className="text-xl font-semibold text-tropic-green mt-6 mb-4">Our Signature Fillings:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Guava & Cream Cheese:</strong> Sweet tropical guava paired with rich cream cheese</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Dulce de Leche:</strong> Creamy caramel made the traditional way</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Fresh Coconut:</strong> Sweet grated coconut with a hint of vanilla</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Savory Options:</strong> Cheese and herb varieties coming soon</span>
                  </li>
                </ul>
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
