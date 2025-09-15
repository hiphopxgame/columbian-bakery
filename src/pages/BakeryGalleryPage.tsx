import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Package, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Import local assets as fallback images
import pandebonoImg from '@/assets/pandebono-new.jpg';
import panDeYucaImg from '@/assets/pan-de-yuca-new.jpg';
import almojabanaImg from '@/assets/almojabana.jpg';
import seasonalSpecialImg from '@/assets/seasonal-special-text-5.jpg';

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

const BakeryGalleryPage = () => {
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
    // Seasonal special pricing
    'seasonal-special': { each: 4.00, perUnit: 400 }, // Seasonal Special
  } as Record<string, { each: number; perUnit: number }>;

  // Default pricing for other products
  const getProductPricing = (product: Product) => {
    // Check for seasonal special first
    if (product.tags.some(tag => tag.toLowerCase().includes('seasonal'))) {
      return wholesalePricing['seasonal-special'];
    }
    
    if (wholesalePricing[product.id]) {
      return wholesalePricing[product.id];
    }
    // Default pricing for other products
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
          // Include all products - don't filter out seasonal for wholesale gallery
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
  const traditionalProducts = products.filter(p => p.product_type === 'traditional');

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Signature': return 'bg-guava-pink/20 text-guava-pink border-guava-pink/30';
      case 'Traditional': return 'bg-bread-brown/20 text-bread-brown border-bread-brown/30';
      case 'Seasonal': return 'bg-dulce-caramel/20 text-dulce-caramel border-dulce-caramel/30';
      case 'Gluten-Free': return 'bg-green-100 text-green-700 border-green-200';
      case 'Vegan': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
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
    if (name.includes('bread') || name.includes('pan')) return rosquillasTrayImg;
    return null;
  };

  const handleWholesaleOrder = (product: Product) => {
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

  const ProductCard = ({ product, index }: { product: Product; index: number }) => {
    const pricing = getProductPricing(product);
    const gradientColor = product.product_type === 'signature' 
      ? (index % 2 === 0 ? 'from-guava-pink/20 to-dulce-caramel/20' : 'from-yuca-cream to-guava-pink/20')
      : 'from-bread-brown/20 to-dulce-caramel/20';

    return (
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className={`h-56 bg-gradient-to-br ${gradientColor} overflow-hidden relative`}>
          {product.image_url || getFallbackImage(product.name) ? (
            <img 
              src={product.image_url || getFallbackImage(product.name)!} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const fallback = getFallbackImage(product.name);
                if (fallback && e.currentTarget.src !== fallback) {
                  e.currentTarget.src = fallback;
                } else {
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
          <h3 className="text-xl font-serif font-bold text-bread-brown mb-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
            {product.description}
          </p>
          
          {/* Wholesale Pricing */}
          <div className="mb-4 p-4 bg-tropic-green/10 rounded-lg border border-tropic-green/20">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-tropic-green" />
              <span className="font-semibold text-tropic-green">Wholesale Pricing</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Per Unit (100 pcs):</span>
                <span className="font-bold">${pricing.perUnit}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Each:</span>
                <span>${pricing.each.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-2 p-2 bg-yuca-cream/50 rounded text-xs text-center">
              <Users className="h-3 w-3 inline mr-1" />
              Minimum Order: 2 Units (200 pieces)
            </div>
          </div>

          {/* Tags */}
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
            className="w-full bg-tropic-green hover:bg-tropic-green/90 text-coconut-white"
            onClick={() => handleWholesaleOrder(product)}
          >
            Order Wholesale
          </Button>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navigation />
        <p className="text-muted-foreground">Loading bakery products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-tropic-green to-guava-pink text-coconut-white">
        <div className="container mx-auto px-4 py-16">
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
              Wholesale Bakery Gallery
            </h1>
            <p className="text-xl md:text-2xl text-coconut-white/90 max-w-3xl mx-auto mb-8">
              Discover our complete range of authentic Colombian pastries and breads, 
              crafted for wholesale distribution to bring Colombia's flavors to your business.
            </p>
            <div className="flex items-center justify-center gap-2 text-lg">
              <Package className="h-5 w-5" />
              <span>Wholesale Orders Only • Minimum 200 Pieces</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Products */}
      {signatureProducts.length > 0 && (
        <section className="py-16 bg-yuca-cream/20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-bread-brown mb-4">
                  Our Signature Bombshells
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The pastries that put us on the map - uniquely Colombian, crafted for wholesale distribution
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {signatureProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Traditional Products */}
      {traditionalProducts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-bread-brown mb-4">
                  Traditional Colombian Breads
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Authentic recipes from different regions of Colombia, available for wholesale orders 
                  to bring traditional flavors to your customers.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {traditionalProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-tropic-green/10 to-guava-pink/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-bread-brown mb-6">
              Ready to Bring Colombian Flavors to Your Business?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              All products are available for wholesale orders with competitive pricing. 
              Contact us to discuss volume discounts and custom arrangements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/#wholesale')}
                className="bg-tropic-green hover:bg-tropic-green/90 text-coconut-white"
              >
                <Users className="mr-2 h-5 w-5" />
                Get Wholesale Pricing
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/#contact')}
                className="border-guava-pink text-guava-pink hover:bg-guava-pink hover:text-coconut-white"
              >
                Contact for Custom Orders
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BakeryGalleryPage;