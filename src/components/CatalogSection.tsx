
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import pandeBonoImage from '@/assets/pandebono-new.jpg';
import panDeYucaImage from '@/assets/pan-de-yuca-new.jpg';

const CatalogSection = () => {
  const products = [
    {
      name: "Classic Bombshell",
      description: "Traditional yuca pastry filled with sweet guava and cream. Every Bombshell includes a rich cream filling by default.",
      tags: ["Retail", "Wholesale", "Gluten-Free"],
      color: "from-guava-pink/20 to-dulce-caramel/20",
      image: "/lovable-uploads/25811de9-3a06-4de9-b0ef-66a20f1e5a99.png"
    },
    {
      name: "Vegan Bombshell",
      description: "Plant-based yuca pastry with dairy-free guava and cashew-based cream. Just as decadent as our classic version.",
      tags: ["Retail", "Wholesale", "Vegan", "Gluten-Free"],
      color: "from-yuca-cream to-guava-pink/20",
      image: "/lovable-uploads/c831cef9-238a-4a72-b80b-03e9497ef8b2.png"
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
              Our signature pastry — the Bombshell — is a gluten-free, yuca-based creation traditionally filled with guava and cream. 
              Every Bombshell includes a rich cream filling by default, with vegan versions available.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

          {/* Traditional Colombian Breads Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-bread-brown mb-4">
                Traditional Colombian Breads
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Beyond our signature Bombshells, our Colombian bakery offers authentic traditional breads 
                that have been cherished in Colombian kitchens for generations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-bread-brown/20 to-dulce-caramel/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={pandeBonoImage} 
                    alt="Pandebono - Traditional Colombian cheese bread"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                    Pandebono
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    A cheese bread made with cassava starch, cornmeal, cheese, and egg, often shaped into a ring or ball.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs bg-bread-brown/20 text-bread-brown border-bread-brown/30">
                      Traditional
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                      Gluten-Free
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <div className="h-32 bg-gradient-to-br from-yuca-cream to-guava-pink/20 flex items-center justify-center overflow-hidden">
                  <img 
                    src={panDeYucaImage} 
                    alt="Pan de Yuca - Traditional Colombian chewy yuca bread"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h4 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                    Pan de Yuca
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    A chewy, cheese-filled bread made with yuca flour.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs bg-bread-brown/20 text-bread-brown border-bread-brown/30">
                      Traditional
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-green-100 text-green-700 border-green-200">
                      Gluten-Free
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 p-6 bg-yuca-cream rounded-lg">
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
