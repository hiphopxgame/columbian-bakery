
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const AboutBakerySection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              About Colombian Bakery PDX
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A story of heritage, innovation, and the pursuit of authentic flavors
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Story */}
            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-semibold text-bread-brown">
                Our Story
              </h3>
              <div className="space-y-4 text-foreground leading-relaxed">
                <p>
                  Colombian Bakery PDX was born from a deep love for the rich baking traditions 
                  of Colombia and a desire to share these authentic flavors with Portland's 
                  vibrant food community.
                </p>
                <p>
                  Our founder grew up surrounded by the aromas of fresh bread and the warmth 
                  of family recipes passed down through generations. After moving to Portland, 
                  the longing for these childhood flavors sparked a mission to bring authentic 
                  Colombian baking to the Pacific Northwest.
                </p>
                <p>
                  Every Bombshell we create is a testament to this heritage—made with traditional 
                  techniques, premium ingredients, and the love that only comes from honoring 
                  one's roots while embracing innovation.
                </p>
              </div>
            </div>

            {/* Right Column - Image Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-dulce-caramel to-bread-brown rounded-2xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-coconut-white">
                  <div className="w-24 h-24 bg-coconut-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl">👩‍🍳</span>
                  </div>
                  <p className="text-lg font-medium">Our Founder</p>
                  <p className="text-sm opacity-90">Crafting authentic Colombian flavors</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-card/50 border-guava-pink/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-guava-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🇨🇴</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-3">
                  Cultural Heritage
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every recipe honors the rich traditions of Colombian baking, 
                  preserving authentic flavors and techniques for future generations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-dulce-caramel/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-dulce-caramel/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-3">
                  Nutritional Value
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Yuca flour provides natural gluten-free nutrition, offering a healthy 
                  alternative without compromising on taste or texture.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-bread-brown/20 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-bread-brown/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-3">
                  Innovation & Tradition
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We blend time-honored Colombian recipes with modern techniques, 
                  creating products that honor the past while embracing the future.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Mission Statement */}
          <Card className="bg-gradient-to-r from-yuca-cream to-coconut-white border-guava-pink/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-serif font-semibold text-bread-brown mb-4">
                Our Mission
              </h3>
              <p className="text-lg text-foreground max-w-4xl mx-auto leading-relaxed">
                To bring the authentic taste of Colombia to Portland in a way that honors both 
                our rich traditions and innovative spirit. We believe that food is a bridge between 
                cultures, and every Bombshell we create is an invitation to experience the warmth, 
                flavor, and joy of Colombian hospitality.
              </p>
            </CardContent>
          </Card>

          {/* Colombian Heritage Section */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-serif font-semibold text-bread-brown mb-6">
              The Tradition of Yuca
            </h3>
            <div className="max-w-4xl mx-auto space-y-4 text-foreground leading-relaxed">
              <p>
                Yuca, also known as cassava, has been a staple of Colombian cuisine for centuries. 
                This versatile root vegetable provides not only incredible flavor and texture but 
                also natural gluten-free nutrition that modern diets crave.
              </p>
              <p>
                In Colombian bakeries, yuca flour creates pastries with a unique elasticity and 
                subtle sweetness that perfectly complements both savory and sweet fillings. 
                Our Bombshells honor this tradition while introducing Portland to the remarkable 
                versatility of this ancient ingredient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBakerySection;
