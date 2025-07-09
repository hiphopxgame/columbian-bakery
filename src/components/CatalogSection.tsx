
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const CatalogSection = () => {
  const products = [
    {
      name: "Classic Guava Bombshell",
      description: "Traditional yuca pastry filled with sweet guava cream",
      tags: ["Retail", "Wholesale", "Gluten-Free"],
      color: "from-guava-pink/20 to-dulce-caramel/20",
      image: "/lovable-uploads/d19d4938-15fa-41fc-a515-47093ac4239a.png"
    },
    {
      name: "Dulce de Leche Bombshell",
      description: "Rich caramel-filled pastry with authentic Colombian dulce de leche",
      tags: ["Retail", "Wholesale", "Gluten-Free"],
      color: "from-dulce-caramel/20 to-bread-brown/20",
      image: "/lovable-uploads/871ce97d-7c8b-45c1-bc72-42a33c3e2956.png"
    },
    {
      name: "Coconut Cream Bombshell",
      description: "Light and tropical with creamy coconut filling",
      tags: ["Retail", "Wholesale", "Gluten-Free"],
      color: "from-coconut-white to-yuca-cream",
      image: "/lovable-uploads/a2ef11b1-af95-4824-b397-ccc6e2e537ab.png"
    },
    {
      name: "Vegan Bombshell",
      description: "Plant-based yuca pastry with dairy-free fillings",
      tags: ["Retail", "Wholesale", "Vegan", "Coming Soon"],
      color: "from-yuca-cream to-guava-pink/20",
      image: "/lovable-uploads/c03fd8e2-7379-427a-aace-4c30e2e41f14.png"
    },
    {
      name: "Pandebono",
      description: "Traditional Colombian cheese bread, crispy outside and chewy inside",
      tags: ["Retail", "Seasonal"],
      color: "from-bread-brown/20 to-dulce-caramel/20",
      image: "/lovable-uploads/3bac3804-1983-4829-82b1-3db97a1856d2.png"
    },
    {
      name: "Almojábana",
      description: "Sweet and salty Colombian bread with fresh cheese",
      tags: ["Retail", "Seasonal"],
      color: "from-coconut-white to-yuca-cream",
      image: "/lovable-uploads/a9d2895e-7072-49a0-8e6a-407e9c11b741.png"
    },
    {
      name: "Roscones",
      description: "Ring-shaped sweet bread, perfect for special occasions",
      tags: ["Catering", "Seasonal"],
      color: "from-guava-pink/20 to-bread-brown/20",
      image: "/lovable-uploads/b6885ed7-b5a7-4f96-b04a-74819abd3824.png"
    },
    {
      name: "Raw Dough Portions",
      description: "Uncooked yuca dough for wholesale customers to bake fresh",
      tags: ["Wholesale", "Raw"],
      color: "from-yuca-cream to-coconut-white",
      image: "/lovable-uploads/3158bddf-4527-4a8b-940c-5b0ef15c6d57.png"
    }
  ];

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Retail': return 'bg-guava-pink/20 text-guava-pink border-guava-pink/30';
      case 'Wholesale': return 'bg-bread-brown/20 text-bread-brown border-bread-brown/30';
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our complete selection of authentic Colombian breads and pastries, 
              each made with traditional recipes and the finest ingredients
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 overflow-hidden"
              >
                <div className="h-48 overflow-hidden bg-gradient-to-br from-yuca-beige to-coconut-white">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
          <div className="text-center mt-12 p-6 bg-yuca-cream rounded-lg">
            <p className="text-muted-foreground">
              <strong>Custom orders available.</strong> Don't see what you're looking for? 
              We can work with you to create the perfect Colombian bread experience for your needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
