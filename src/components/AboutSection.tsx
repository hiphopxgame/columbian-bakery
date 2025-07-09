
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BombshellGallery from '@/components/BombshellGallery';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-coconut-white to-yuca-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              About the Bombshell
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A celebration of Colombian craftsmanship, bringing authentic flavors to Portland
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
          <div className="grid md:grid-cols-3 gap-8">
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
    </section>
  );
};

export default AboutSection;
