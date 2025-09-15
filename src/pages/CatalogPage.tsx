import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Import local assets as fallback images
import pandebonoImg from '@/assets/pandebono-new.jpg';
import panDeYucaImg from '@/assets/pan-de-yuca-new.jpg';
import almojabanaImg from '@/assets/almojabana.jpg';
import seasonalSpecialImg from '@/assets/seasonal-special-text-7.jpg';

// Traditional Colombian bread images
const rosquillasImg = '/lovable-uploads/92220056-2f30-4e7e-8b75-13c68fcf1255.png';
const rosquillasTrayImg = '/lovable-uploads/73edac2d-30e6-48c0-b81a-b5593f2cae8e.png'; 
const buñuelosImg = '/lovable-uploads/d9a9dd79-df02-4d45-9f7f-8e81c92a3525.png';
const traditionalBreadsImg = '/lovable-uploads/ae3df215-a2f4-46c1-ac95-c0bc111fae1b.png';

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
    // Default pricing for seasonal and other products - with null safety
    const basePrice = product.base_price || 0;
    return { each: basePrice, perUnit: basePrice * 100 };
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

  // Get fallback image based on product name
  const getFallbackImage = (productName: string) => {
    const name = productName.toLowerCase();
    if (name.includes('seasonal')) return seasonalSpecialImg;
    if (name.includes('pandebono')) return pandebonoImg;
    if (name.includes('pan de yuca')) return panDeYucaImg;
    if (name.includes('almojabana')) return almojabanaImg;
    if (name.includes('rosquilla')) return rosquillasImg;
    if (name.includes('buñuelo')) return buñuelosImg;
    if (name.includes('traditional') || name.includes('colombian')) return traditionalBreadsImg;
    // For any other traditional bread, use one of the new images
    if (name.includes('bread') || name.includes('pan')) return rosquillasTrayImg;
    return null;
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
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="border-guava-pink text-guava-pink hover:bg-guava-pink hover:text-coconut-white"
              >
                Back to Home
              </Button>
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
                      <div className={`h-48 bg-gradient-to-br ${getGradientColor(product.product_type, index)} flex items-center justify-center overflow-hidden relative`}>
                        {product.image_url || getFallbackImage(product.name) ? (
                          <img 
                            src={product.image_url || getFallbackImage(product.name)!} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onError={(e) => {
                              // If main image fails, try fallback
                              const fallback = getFallbackImage(product.name);
                              if (fallback && e.currentTarget.src !== fallback) {
                                e.currentTarget.src = fallback;
                              } else {
                                // If both fail, hide image and show placeholder
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <div 
                          className="absolute inset-0 flex items-center justify-center text-4xl opacity-60"
                          style={{ display: product.image_url || getFallbackImage(product.name) ? 'none' : 'flex' }}
                        >
                          🥮
                        </div>
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
                                  ${(pricing.each || 0).toFixed(2)} each
                                </div>
                                <div className="text-sm text-muted-foreground mb-1">
                                  <strong>Per Unit (100):</strong> ${pricing.perUnit || 0}
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