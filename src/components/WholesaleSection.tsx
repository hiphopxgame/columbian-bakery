
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

          {/* Pricing Card */}
          <Card className="mb-12 bg-gradient-to-br from-bread-brown/10 to-yuca-cream border-bread-brown/20">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown text-center">
                Wholesale Pricing - Frozen Dough Only
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">❄️</div>
                <h3 className="text-xl font-serif font-bold text-bread-brown mb-4">
                  Frozen Dough Bombshells
                </h3>
                <p className="text-muted-foreground mb-6">
                  Perfect for establishments that want maximum freshness. 
                  Bake in-house for the ultimate fresh experience.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Per Bombshell:</span>
                    <span className="font-bold text-bread-brown">$2.00</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Per Unit (100):</span>
                    <span className="font-bold text-bread-brown">$200</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Add Cream:</span>
                    <span className="font-semibold text-bread-brown">+$10/unit</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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
