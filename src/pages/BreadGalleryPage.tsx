import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BreadGalleryPage = () => {
  const navigate = useNavigate();

  const traditionalBreads = [
    {
      name: "Pandebono",
      description: "A cheese bread made with cassava starch, cornmeal, cheese, and egg, often shaped into a ring or ball. This beloved Colombian staple has a slightly sweet flavor and chewy texture.",
      tags: ["Traditional", "Gluten-Free", "Cheese"],
      image: "/lovable-uploads/b8ecc4df-07da-4ac1-80b9-dda53ef13137.png",
      origin: "Valle del Cauca region",
      ingredients: "Cassava starch, cornmeal, fresh cheese, eggs"
    },
    {
      name: "Pan de Yuca",
      description: "A chewy, cheese-filled bread made with yuca flour. This traditional bread has a unique texture and rich cheese flavor that pairs perfectly with Colombian coffee.",
      tags: ["Traditional", "Gluten-Free", "Cheese"],
      image: "/lovable-uploads/83a02062-7942-4c9d-8980-42b95562ae22.png",
      origin: "Coastal regions of Colombia",
      ingredients: "Yuca flour, fresh cheese, eggs, butter"
    },
    {
      name: "Pandequeso",
      description: "A soft, fluffy cheese bread made with fresh cheese, creating a light and airy texture with a rich, savory flavor. Perfect for breakfast or afternoon snack.",
      tags: ["Traditional", "Gluten-Free", "Cheese"],
      image: "/lovable-uploads/a6a97d39-dabc-41a2-9777-6c6c4085aa47.png",
      origin: "Andean regions of Colombia",
      ingredients: "Fresh cheese, cassava flour, eggs, milk"
    }
  ];

  const signatureProducts = [
    {
      name: "Classic Bombshell",
      description: "Our signature yuca pastry filled with sweet guava and cream. Every Bombshell includes a rich cream filling by default.",
      tags: ["Signature", "Gluten-Free", "Guava"],
      image: "/lovable-uploads/25811de9-3a06-4de9-b0ef-66a20f1e5a99.png",
      specialty: "House specialty with traditional Colombian flavors"
    },
    {
      name: "Vegan Bombshell",
      description: "Plant-based yuca pastry with dairy-free guava and cashew-based cream. Just as decadent as our classic version.",
      tags: ["Signature", "Vegan", "Gluten-Free"],
      image: "/lovable-uploads/c831cef9-238a-4a72-b80b-03e9497ef8b2.png",
      specialty: "Plant-based version of our beloved Bombshell"
    }
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Traditional': return 'bg-bread-brown/20 text-bread-brown border-bread-brown/30';
      case 'Signature': return 'bg-guava-pink/20 text-guava-pink border-guava-pink/30';
      case 'Gluten-Free': return 'bg-green-100 text-green-700 border-green-200';
      case 'Vegan': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Cheese': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Sweet Corn': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Holiday Special': return 'bg-red-100 text-red-700 border-red-200';
      case 'Guava': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

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
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-64 bg-gradient-to-br from-guava-pink/20 to-dulce-caramel/20 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-serif font-semibold text-bread-brown mb-3">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-sm text-dulce-caramel font-medium mb-4 italic">
                      {product.specialty}
                    </p>
                    <div className="flex flex-wrap gap-2">
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
              {traditionalBreads.map((bread, index) => (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-bread-brown/20 to-dulce-caramel/20 overflow-hidden">
                    <img 
                      src={bread.image} 
                      alt={bread.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                      {bread.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {bread.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-dulce-caramel font-medium">
                        <strong>Origin:</strong> {bread.origin}
                      </div>
                      <div className="text-xs text-dulce-caramel font-medium">
                        <strong>Key Ingredients:</strong> {bread.ingredients}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bread.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="outline" 
                          className={`text-xs ${getTagColor(tag)}`}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
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