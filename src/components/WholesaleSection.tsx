
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const WholesaleSection = () => {
  return (
    <section id="wholesale" className="py-20 bg-gradient-to-b from-yuca-cream to-coconut-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Wholesale Orders
            </h2>
            <p className="text-xl text-muted-foreground">
              For cafés, restaurants, and wholesale buyers
            </p>
          </div>

          {/* Key Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center bg-card/50 border-guava-pink/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">1 Unit</h3>
                <p className="text-muted-foreground">= 100 Bombshells</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/50 border-guava-pink/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">2 Units</h3>
                <p className="text-muted-foreground">Minimum Order</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/50 border-guava-pink/20">
              <CardContent className="p-6">
                <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">200+</h3>
                <p className="text-muted-foreground">Bombshells per order</p>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-guava-pink/10 to-yuca-cream border-guava-pink/20">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown text-center">
                  Classic Bombshells
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">🥮</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Frozen:</span>
                    <span className="font-bold text-bread-brown">$2.00 each</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ready-Baked:</span>
                    <span className="font-bold text-bread-brown">$3.00 each</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground border-t pt-2">
                    <span>Per Unit (100):</span>
                    <span>$200 / $300</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-100/50 to-yuca-cream border-emerald-200/50">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown text-center">
                  Vegan Bombshells
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">🌱</div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Frozen:</span>
                    <span className="font-bold text-bread-brown">$2.50 each</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ready-Baked:</span>
                    <span className="font-bold text-bread-brown">$3.75 each</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground border-t pt-2">
                    <span>Per Unit (100):</span>
                    <span>$250 / $375</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-bread-brown/10 to-yuca-cream border-bread-brown/20">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown text-center">
                  Traditional Breads
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-4xl mb-3">🍞</div>
                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex justify-between">
                    <span>Pandebono:</span>
                    <span className="font-bold">$2.25 / $3.38</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pan de Yuca:</span>
                    <span className="font-bold">$2.75 / $4.13</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pandequeso:</span>
                    <span className="font-bold">$2.60 / $3.90</span>
                  </div>
                  <div className="text-xs text-muted-foreground border-t pt-2">
                    Frozen / Ready-Baked per piece
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Action */}
          <div className="text-center mb-12">
            <Button 
              size="lg"
              className="bg-bread-brown hover:bg-bread-brown/90 text-coconut-white px-12 py-6 text-xl"
              onClick={() => window.location.href = '/order'}
            >
              Place Wholesale Order
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Frozen dough bombshells - bake fresh in your establishment
            </p>
          </div>

          {/* Contact for Wholesale */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need a custom wholesale solution? Have questions about bulk orders?
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white"
              onClick={() => window.location.href = '/custom-quote'}
            >
              Contact Our Wholesale Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleSection;
