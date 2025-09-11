
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

          {/* Wholesale Products */}
          <div className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-bread-brown text-center mb-8">
              Wholesale Product Catalog
            </h3>
            
            {/* Signature Products */}
            <div className="mb-8">
              <h4 className="text-xl font-serif font-semibold text-bread-brown mb-6 flex items-center">
                <span className="mr-2">⭐</span>
                Signature Products
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-guava-pink/10 to-dulce-caramel/10 border-guava-pink/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-lg font-semibold text-bread-brown">Classic Bombshell</h5>
                        <p className="text-sm text-muted-foreground">Yuca pastry with guava and cream</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-guava-pink">$2.00 each</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Per Unit (100):</span>
                        <span className="font-semibold">$200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>2 Units (200 pcs)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-tropic-green/10 to-dulce-caramel/10 border-tropic-green/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-lg font-semibold text-bread-brown">Vegan Bombshell</h5>
                        <p className="text-sm text-muted-foreground">Plant-based with cashew cream</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-tropic-green">$3.00 each</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Per Unit (100):</span>
                        <span className="font-semibold">$300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>2 Units (200 pcs)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Traditional Products */}
            <div>
              <h4 className="text-xl font-serif font-semibold text-bread-brown mb-6 flex items-center">
                <span className="mr-2">🥖</span>
                Traditional Colombian Breads
              </h4>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-bread-brown/10 to-yuca-cream border-bread-brown/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-lg font-semibold text-bread-brown">Pandebono</h5>
                        <p className="text-sm text-muted-foreground">Cheese bread with cassava starch</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-bread-brown">$4.00 each</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Per Unit (100):</span>
                        <span className="font-semibold">$400</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>2 Units (200 pcs)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-dulce-caramel/10 to-yuca-cream border-dulce-caramel/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-lg font-semibold text-bread-brown">Pan de Yuca</h5>
                        <p className="text-sm text-muted-foreground">Chewy cheese bread with yuca flour</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-dulce-caramel">$3.00 each</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Per Unit (100):</span>
                        <span className="font-semibold">$300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>2 Units (200 pcs)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-guava-pink/10 to-yuca-cream border-guava-pink/20">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="text-lg font-semibold text-bread-brown">Pandequeso</h5>
                        <p className="text-sm text-muted-foreground">Soft, fluffy cheese bread</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-guava-pink">$3.50 each</div>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Per Unit (100):</span>
                        <span className="font-semibold">$350</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minimum:</span>
                        <span>2 Units (200 pcs)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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
              All products available as frozen dough - bake fresh in your establishment
            </p>
            <div className="mt-4 p-4 bg-yuca-cream/50 rounded-lg max-w-2xl mx-auto">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> All wholesale prices are for frozen dough only. 
                Products can be mixed and matched in your orders. 
                Cream filling available as add-on for applicable products.
              </p>
            </div>
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
