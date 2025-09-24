import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent } from '@/components/ui/card';
import BombshellGallery from '@/components/BombshellGallery';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-b from-coconut-white to-yuca-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Section Header - WHO */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
                Who We Are
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A Colombian family bringing authentic flavors and traditions to Portland
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Left Column - Our Story (WHO & WHY) */}
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-semibold text-bread-brown mb-4">
                  Our Family Story
                </h2>
                
                <div className="space-y-4 text-foreground">
                  <p className="text-lg leading-relaxed">
                    <strong>Who:</strong> We are a Colombian family who moved to Portland with a dream - 
                    to share the authentic flavors of our homeland with our new community.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    <strong>Why:</strong> We believe food is the best way to bridge cultures and create connections. 
                    Every Bombshell we make carries the love and traditions passed down through our family for generations.
                  </p>
                  
                  <p className="text-lg leading-relaxed">
                    <strong>When:</strong> Established in 2024, we started this journey to bring Portland something 
                    it has never tasted before - authentic Colombian yuca pastries made with traditional techniques.
                  </p>
                </div>

                <div className="mt-8 p-6 bg-guava-pink/10 rounded-lg border border-guava-pink/20">
                  <h3 className="text-xl font-serif font-semibold text-bread-brown mb-3">
                    Our Mission
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    To preserve and share Colombian culinary heritage while serving the Portland community 
                    with the highest quality, naturally gluten-free pastries that anyone can enjoy.
                  </p>
                </div>
              </div>

              {/* Right Column - Gallery */}
              <BombshellGallery />
            </div>

            {/* WHAT - Feature Cards with Clear Benefits */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-guava-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌱</span>
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                    What: Naturally Gluten-Free
                  </h4>
                  <p className="text-muted-foreground">
                    Made with yuca flour - not wheat substitutes. Perfect for celiac and gluten-sensitive customers who miss quality pastries.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-dulce-caramel/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⏰</span>
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                    When: Fresh Daily
                  </h4>
                  <p className="text-muted-foreground">
                    Made fresh every morning using traditional techniques. Order online for same-day pickup or next-day delivery.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-bread-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                    Why: Authentic & Unique
                  </h4>
                  <p className="text-muted-foreground">
                    The only authentic Colombian Bombshells in Portland. Experience flavors you cannot find anywhere else in the Pacific Northwest.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;