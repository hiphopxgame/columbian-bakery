import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  description: string;
  product_type: 'signature' | 'traditional';
  tags: string[];
  image_url: string;
  base_price: number;
  display_order: number;
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Wholesale pricing mapping
  const wholesalePricing = {
    'e27d0fd9-94db-4b5d-9c81-a876b831ca3f': { each: 2.00, perUnit: 200 }, // Classic Bombshell
    'de1d2c3b-d2dc-4d09-bba6-82051180cade': { each: 2.50, perUnit: 250 }, // Vegan Bombshell  
    'a7323d9f-d71c-4017-89cf-64beda401a44': { each: 4.00, perUnit: 400 }, // Pandebono
    'db78b11a-9547-441b-9d1b-ed74f74f7012': { each: 3.00, perUnit: 300 }, // Pan de Yuca
    '1e3472fd-7dcd-42c1-ae41-6cf420f5a0d7': { each: 3.50, perUnit: 350 }, // Pandequeso
  } as Record<string, { each: number; perUnit: number }>;

  // Default pricing for seasonal and other products
  const getProductPricing = (product: Product) => {
    if (wholesalePricing[product.id]) {
      return wholesalePricing[product.id];
    }
    // Default pricing for seasonal and other products
    return { each: product.base_price, perUnit: product.base_price * 100 };
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('cbake_products')
          .select('*')
          .eq('is_active', true)
          .order('display_order');
        
        if (error) {
          console.error('Error fetching products:', error);
        } else {
          setProducts((data || []).map(product => ({
            ...product,
            product_type: product.product_type as 'signature' | 'traditional'
          })));
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Signature': return 'bg-guava-pink/20 text-guava-pink border-guava-pink/30';
      case 'Traditional': return 'bg-bread-brown/20 text-bread-brown border-bread-brown/30';
      case 'Seasonal': return 'bg-dulce-caramel/20 text-dulce-caramel border-dulce-caramel/30';
      case 'Gluten-Free': return 'bg-green-100 text-green-700 border-green-200';
      case 'Vegan': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Coming Soon': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Catering': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Raw': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getGradientColor = (productType: string, index: number) => {
    if (productType === 'signature') {
      return index % 2 === 0 ? 'from-guava-pink/20 to-dulce-caramel/20' : 'from-yuca-cream to-guava-pink/20';
    }
    const gradients = [
      'from-bread-brown/20 to-dulce-caramel/20',
      'from-yuca-cream to-guava-pink/20',
      'from-dulce-caramel/20 to-bread-brown/20'
    ];
    return gradients[index % gradients.length];
  };

  const handleOrderClick = (product: Product) => {
    navigate('/order', { 
      state: { 
        selectedProduct: {
          id: product.id,
          name: product.name,
          price: product.base_price
        }
      }
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
                Bakery Catalog
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                From our signature Bombshells to authentic Colombian traditional breads, 
                discover the rich flavors that connect us to our heritage and bring Colombia to your table.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/bread-gallery')}
                  className="bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
                >
                  View Complete Gallery
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  variant="outline"
                  className="border-guava-pink text-guava-pink hover:bg-guava-pink hover:text-coconut-white"
                >
                  Back to Home
                </Button>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="text-center">
                <p className="text-muted-foreground">Loading products...</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {products.map((product, index) => (
                    <Card 
                      key={product.id} 
                      className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden cursor-pointer"
                      onClick={() => handleOrderClick(product)}
                    >
                      <div className={`h-48 bg-gradient-to-br ${getGradientColor(product.product_type, index)} flex items-center justify-center overflow-hidden`}>
                        {product.image_url ? (
                          <img 
                            src={product.image_url} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl opacity-60">🥮</div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="mb-2">
                          <h3 className="text-lg font-serif font-semibold text-bread-brown group-hover:text-dulce-caramel transition-colors mb-2">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                            {product.description}
                          </p>
                          
                          {/* Pricing Information */}
                          {(() => {
                            const pricing = getProductPricing(product);
                            const isSeasonalProduct = product.tags.some(tag => tag.includes('SEASONAL'));
                            
                            return (
                              <div className="mb-4 p-3 bg-yuca-cream/50 rounded-lg">
                                <div className="text-lg font-bold text-bread-brown mb-1">
                                  ${pricing.each.toFixed(2)} each
                                </div>
                                <div className="text-sm text-muted-foreground mb-1">
                                  <strong>Per Unit (100):</strong> ${pricing.perUnit}
                                </div>
                                {isSeasonalProduct ? (
                                  <div className="text-sm text-muted-foreground">
                                    <strong>Limited Time</strong>
                                  </div>
                                ) : (
                                  <div className="text-sm text-muted-foreground">
                                    <strong>Minimum:</strong> 2 Units (200 pcs)
                                  </div>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex} 
                              variant="outline" 
                              className={`text-xs ${getTagColor(tag)}`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOrderClick(product);
                            }}
                          >
                            Order Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Footer Note */}
                <div className="text-center mt-16 p-6 bg-yuca-cream rounded-lg">
                  <p className="text-muted-foreground">
                    <strong>Traditional breads available by special order.</strong> Contact us to place an order for our authentic Colombian breads. 
                    We can work with you to create the perfect Colombian bread experience for your needs.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CatalogPage;