
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

          {/* Pricing Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown text-center">
                Wholesale Pricing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-serif text-bread-brown">Format</th>
                      <th className="text-center py-4 px-4 font-serif text-bread-brown">Price Each</th>
                      <th className="text-center py-4 px-4 font-serif text-bread-brown">Unit Total</th>
                      <th className="text-center py-4 px-4 font-serif text-bread-brown">Cream Add-On</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="py-6 px-4">
                        <div>
                          <h4 className="font-semibold text-foreground">Baked & Stuffed</h4>
                          <p className="text-sm text-muted-foreground">Ready to serve</p>
                        </div>
                      </td>
                      <td className="text-center py-6 px-4 font-semibold text-lg text-bread-brown">$3.00</td>
                      <td className="text-center py-6 px-4 font-semibold text-lg text-bread-brown">$300</td>
                      <td className="text-center py-6 px-4">
                        <Badge variant="secondary">Included</Badge>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-6 px-4">
                        <div>
                          <h4 className="font-semibold text-foreground">Frozen Dough Only</h4>
                          <p className="text-sm text-muted-foreground">Bake fresh in-house</p>
                        </div>
                      </td>
                      <td className="text-center py-6 px-4 font-semibold text-lg text-bread-brown">$2.00</td>
                      <td className="text-center py-6 px-4 font-semibold text-lg text-bread-brown">$200</td>
                      <td className="text-center py-6 px-4 text-bread-brown font-semibold">+$10/unit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Order Options */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-dulce-caramel/10 to-guava-pink/10 border-dulce-caramel/20">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown flex items-center">
                  <span className="mr-2">🔥</span>
                  Baked & Stuffed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Perfect for cafés and restaurants that want to serve immediately. 
                  Comes fully baked with your choice of filling.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Per Bombshell:</span>
                    <span className="font-semibold">$3.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Unit (100):</span>
                    <span className="font-semibold">$300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Filling:</span>
                    <Badge variant="secondary">Included</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full bg-dulce-caramel hover:bg-dulce-caramel/90 text-coconut-white"
                  onClick={() => window.location.href = '/order'}
                >
                  Order Baked & Stuffed
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-bread-brown/10 to-yuca-cream border-bread-brown/20">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown flex items-center">
                  <span className="mr-2">❄️</span>
                  Frozen Dough Only
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Ideal for establishments that want maximum freshness. 
                  Bake in-house for the ultimate fresh experience.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Per Bombshell:</span>
                    <span className="font-semibold">$2.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Per Unit (100):</span>
                    <span className="font-semibold">$200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Add Cream:</span>
                    <span className="font-semibold">+$10/unit</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white"
                  onClick={() => window.location.href = '/order'}
                >
                  Order Frozen Dough
                </Button>
              </CardContent>
            </Card>
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
