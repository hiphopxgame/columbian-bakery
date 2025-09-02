import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CatalogSection = () => {
  const navigate = useNavigate();
  
  const products = [
    {
      name: "Classic Bombshell",
      description: "Traditional yuca pastry filled with sweet guava and cream. Every Bombshell includes a rich cream filling by default.",
      tags: ["Signature", "Gluten-Free"],
      color: "from-guava-pink/20 to-dulce-caramel/20",
      image: "/lovable-uploads/25811de9-3a06-4de9-b0ef-66a20f1e5a99.png"
    },
    {
      name: "Vegan Bombshell",
      description: "Plant-based yuca pastry with dairy-free guava and cashew-based cream. Just as decadent as our classic version.",
      tags: ["Signature", "Vegan", "Gluten-Free"],
      color: "from-yuca-cream to-guava-pink/20",
      image: "/lovable-uploads/c831cef9-238a-4a72-b80b-03e9497ef8b2.png"
    },
    {
      name: "Pandebono",
      description: "A cheese bread made with cassava starch, cornmeal, cheese, and egg, often shaped into a ring or ball.",
      tags: ["Traditional", "Gluten-Free"],
      color: "from-bread-brown/20 to-dulce-caramel/20",
      image: "/lovable-uploads/b8ecc4df-07da-4ac1-80b9-dda53ef13137.png"
    },
    {
      name: "Pan de Yuca",
      description: "A chewy, cheese-filled bread made with yuca flour.",
      tags: ["Traditional", "Gluten-Free"],
      color: "from-yuca-cream to-guava-pink/20",
      image: "/lovable-uploads/83a02062-7942-4c9d-8980-42b95562ae22.png"
    },
    {
      name: "Pandequeso",
      description: "A soft, fluffy cheese bread made with fresh cheese, creating a light and airy texture with a rich, savory flavor.",
      tags: ["Traditional", "Gluten-Free"],
      color: "from-dulce-caramel/20 to-bread-brown/20",
      image: "/lovable-uploads/a6a97d39-dabc-41a2-9777-6c6c4085aa47.png"
    },
    {
      name: "Almojábana",
      description: "A traditional Colombian bread made with corn flour and fresh cheese. These small, round breads are crispy on the outside and soft on the inside.",
      tags: ["Traditional", "Gluten-Free"],
      color: "from-bread-brown/20 to-yuca-cream",
      image: "/lovable-uploads/a9d2895e-7072-49a0-8e6a-407e9c11b741.png"
    }
  ];

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

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Bakery Catalog
            </h2>
           <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              From our signature Bombshells to authentic Colombian traditional breads, 
              discover the rich flavors that connect us to our heritage and bring Colombia to your table.
            </p>
            <Button
              onClick={() => navigate('/bread-gallery')}
              className="bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
            >
              View Complete Gallery
            </Button>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden"
              >
                <div className={`h-48 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden`}>
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-4xl opacity-60">🥮</div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-serif font-semibold text-bread-brown mb-2 group-hover:text-dulce-caramel transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {product.description}
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

          {/* Footer Note */}
          <div className="text-center mt-16 p-6 bg-yuca-cream rounded-lg">
            <p className="text-muted-foreground">
              <strong>Traditional breads available by special order.</strong> Contact us to place an order for our authentic Colombian breads. 
              We can work with you to create the perfect Colombian bread experience for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;