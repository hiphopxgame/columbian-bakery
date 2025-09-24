import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const WholesalePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-b from-yuca-cream to-coconut-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
                Wholesale Partnership
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Partner with us to bring authentic Colombian flavors to your customers. 
                Perfect for cafés, restaurants, and retail establishments.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center bg-card/50 border-guava-pink/20">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">📦</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Bulk Orders</h3>
                  <p className="text-sm text-muted-foreground">Minimum 200 pieces</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50 border-guava-pink/20">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">🧊</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Frozen Dough</h3>
                  <p className="text-sm text-muted-foreground">Bake fresh on-site</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50 border-guava-pink/20">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">💰</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Better Margins</h3>
                  <p className="text-sm text-muted-foreground">Wholesale pricing</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card/50 border-guava-pink/20">
                <CardContent className="p-6">
                  <div className="text-3xl mb-2">🤝</div>
                  <h3 className="text-lg font-serif font-bold text-bread-brown mb-2">Support</h3>
                  <p className="text-sm text-muted-foreground">Training & materials</p>
                </CardContent>
              </Card>
            </div>

            {/* Product Showcase */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-guava-pink/10 to-dulce-caramel/10 border-guava-pink/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-bread-brown">Signature Bombshells</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Classic Guava & Cream</span>
                      <Badge>$2.00 each</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Vegan Cashew Cream</span>
                      <Badge>$2.50 each</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Dulce de Leche</span>
                      <Badge>$2.25 each</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Per unit = 100 pieces | Minimum order: 2 units (200 pieces)
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-bread-brown/10 to-yuca-cream border-bread-brown/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-bread-brown">Traditional Breads</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Pandebono (Cheese)</span>
                      <Badge>$4.00 each</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pan de Yuca</span>
                      <Badge>$3.00 each</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pandequeso</span>
                      <Badge>$3.50 each</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All naturally gluten-free | Frozen dough for fresh baking
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Why Partner With Us */}
            <Card className="mb-12 bg-gradient-to-r from-yuca-cream to-coconut-white border-guava-pink/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-serif font-bold text-bread-brown text-center mb-6">
                  Why Partner With The Colombian Bakery?
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Authentic Colombian recipes</strong> passed down through generations</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Naturally gluten-free</strong> products that meet growing dietary needs</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Unique market positioning</strong> - first authentic Colombian bakery in Portland</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Comprehensive support</strong> including training and marketing materials</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Consistent quality</strong> with professional-grade frozen dough</span>
                    </div>
                    <div className="flex items-start">
                      <span className="w-2 h-2 bg-guava-pink rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Growing demand</strong> for authentic, healthy, diverse food options</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  size="lg"
                  className="bg-bread-brown hover:bg-bread-brown/90 text-coconut-white px-12 py-6 text-xl"
                  onClick={() => navigate('/order')}
                >
                  Start Wholesale Order
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white px-12 py-6 text-xl"
                  onClick={() => navigate('/custom-quote')}
                >
                  Request Partnership Info
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Questions about wholesale pricing or partnership opportunities? 
                <Button variant="link" className="p-0 ml-1" onClick={() => navigate('/contact')}>
                  Contact our wholesale team
                </Button>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default WholesalePage;