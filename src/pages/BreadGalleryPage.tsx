import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Import local assets as fallback images
import pandebonoImg from '@/assets/pandebono-new.jpg';
import panDeYucaImg from '@/assets/pan-de-yuca-new.jpg';
import almojabanaImg from '@/assets/almojabana.jpg';
import seasonalSpecialImg from '@/assets/seasonal-special-text-2.jpg';

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
  ingredients?: string;
  origin?: string;
}

const BreadGalleryPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  const signatureProducts = products.filter(p => p.product_type === 'signature');
  const traditionalBreads = products.filter(p => p.product_type === 'traditional');
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Traditional': return 'bg-bread-brown/20 text-bread-brown border-bread-brown/30';
      case 'Signature': return 'bg-guava-pink/20 text-guava-pink border-guava-pink/30';
      case 'Seasonal': return 'bg-dulce-caramel/20 text-dulce-caramel border-dulce-caramel/30';
      case 'Gluten-Free': return 'bg-green-100 text-green-700 border-green-200';
      case 'Vegan': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cheese': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Sweet Corn': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Holiday Special': return 'bg-red-100 text-red-700 border-red-200';
      case 'Guava': return 'bg-pink-100 text-pink-700 border-pink-200';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-bread-brown to-dulce-caramel text-coconut-white">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-coconut-white hover:bg-coconut-white/10 hover:text-coconut-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
              Colombian Bread Gallery
            </h1>
            <p className="text-xl md:text-2xl text-coconut-white/90 max-w-3xl mx-auto">
              Discover the rich tradition of Colombian baking with our authentic breads and signature pastries, 
              each recipe passed down through generations and crafted with love in Portland.
            </p>
          </div>
        </div>
      </div>

      {/* Signature Products Section */}
      <section className="py-16 bg-yuca-cream/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-bread-brown mb-4">
                Our Signature Bombshells
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The pastries that put us on the map - uniquely Colombian, lovingly crafted in Portland
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {signatureProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleOrderClick(product)}
                >
                  <div className="h-64 bg-gradient-to-br from-guava-pink/20 to-dulce-caramel/20 overflow-hidden relative">
                    {product.image_url || getFallbackImage(product.name) ? (
                      <img 
                        src={product.image_url || getFallbackImage(product.name)!} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-serif font-semibold text-bread-brown">
                        {product.name}
                      </h3>
                      {product.base_price && (
                        <span className="text-lg font-semibold text-guava-pink">
                          ${product.base_price}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {product.description}
                    </p>
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
                    <Button 
                      className="w-full bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(product);
                      }}
                    >
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traditional Breads Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-bread-brown mb-4">
                Traditional Colombian Breads
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Authentic recipes from different regions of Colombia, each with its own story and traditional preparation methods. 
                These breads connect us to our heritage and bring the flavors of Colombia to your table.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {traditionalBreads.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleOrderClick(product)}
                >
                  <div className="h-48 bg-gradient-to-br from-bread-brown/20 to-dulce-caramel/20 overflow-hidden relative">
                    {product.image_url || getFallbackImage(product.name) ? (
                      <img 
                        src={product.image_url || getFallbackImage(product.name)!} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-serif font-semibold text-bread-brown">
                        {product.name}
                      </h3>
                      {product.base_price && (
                        <span className="text-sm font-semibold text-guava-pink">
                          ${product.base_price}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {product.description}
                    </p>
                    {(product.origin || product.ingredients) && (
                      <div className="space-y-2 mb-4">
                        {product.origin && (
                          <div className="text-xs text-dulce-caramel font-medium">
                            <strong>Origin:</strong> {product.origin}
                          </div>
                        )}
                        {product.ingredients && (
                          <div className="text-xs text-dulce-caramel font-medium">
                            <strong>Key Ingredients:</strong> {product.ingredients}
                          </div>
                        )}
                      </div>
                    )}
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
                    <Button 
                      className="w-full bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(product);
                      }}
                    >
                      Order Now - ${product.base_price}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-guava-pink/10 to-yuca-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-bread-brown mb-6">
              Ready to Experience Authentic Colombian Flavors?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              All traditional breads are available by special order. Contact us to discuss your needs 
              and we'll create the perfect Colombian bread experience for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/#contact')}
                className="bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
              >
                Contact Us for Orders
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/')}
                className="border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white"
              >
                Back to Homepage
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BreadGalleryPage;