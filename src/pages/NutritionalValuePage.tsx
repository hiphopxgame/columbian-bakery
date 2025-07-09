import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

const NutritionalValuePage = () => {
  const navigate = useNavigate();

  const nutritionalHighlights = [
    {
      title: "Naturally Gluten-Free",
      description: "Made with yuca flour, our Bombshells are naturally free from gluten, making them perfect for those with celiac disease or gluten sensitivity.",
      icon: "🌾",
      badge: "Gluten-Free"
    },
    {
      title: "Rich in Nutrients",
      description: "Yuca is packed with vitamin C, folate, and essential minerals that support immune function and overall health.",
      icon: "💪",
      badge: "Nutrient-Dense"
    },
    {
      title: "Energy Sustaining",
      description: "Complex carbohydrates from yuca provide sustained energy without the blood sugar spikes of refined flour.",
      icon: "⚡",
      badge: "Sustained Energy"
    },
    {
      title: "Vegan Options",
      description: "Our plant-based versions offer all the flavor with cashew-based creams, perfect for dairy-free diets.",
      icon: "🌱",
      badge: "Plant-Based"
    }
  ];

  const nutritionalFacts = [
    { nutrient: "Calories", classic: "180", vegan: "170", unit: "per Bombshell" },
    { nutrient: "Protein", classic: "4g", vegan: "3g", unit: "" },
    { nutrient: "Carbohydrates", classic: "32g", vegan: "30g", unit: "" },
    { nutrient: "Dietary Fiber", classic: "3g", vegan: "3g", unit: "" },
    { nutrient: "Vitamin C", classic: "15%", vegan: "15%", unit: "Daily Value" },
    { nutrient: "Folate", classic: "12%", vegan: "12%", unit: "Daily Value" }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Nutritional Value
            </h1>
            <p className="text-xl text-muted-foreground">
              Delicious meets nutritious - understanding what makes our Bombshells both tasty and wholesome
            </p>
          </div>

          {/* Nutritional Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {nutritionalHighlights.map((highlight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-bread-brown">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{highlight.icon}</span>
                      {highlight.title}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {highlight.badge}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Nutritional Facts Table */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown">
                Nutritional Facts Comparison
              </CardTitle>
              <p className="text-muted-foreground">
                Approximate values per single Bombshell
              </p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-serif text-bread-brown">Nutrient</th>
                      <th className="text-center py-3 px-4 font-serif text-bread-brown">Classic Bombshell</th>
                      <th className="text-center py-3 px-4 font-serif text-bread-brown">Vegan Bombshell</th>
                      <th className="text-center py-3 px-4 font-serif text-bread-brown">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionalFacts.map((fact, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-3 px-4 font-medium">{fact.nutrient}</td>
                        <td className="text-center py-3 px-4">{fact.classic}</td>
                        <td className="text-center py-3 px-4">{fact.vegan}</td>
                        <td className="text-center py-3 px-4 text-sm text-muted-foreground">{fact.unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Ingredient Benefits */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown">
                Key Ingredient Benefits
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-bread-brown mb-2">Yuca (Cassava Root)</h3>
                <p className="text-muted-foreground mb-2">
                  Our foundation ingredient is naturally gluten-free and provides sustained energy through complex carbohydrates. 
                  Rich in vitamin C, folate, and potassium, yuca supports immune function and heart health.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">High in Vitamin C</Badge>
                  <Badge variant="outline" className="text-xs">Good Source of Folate</Badge>
                  <Badge variant="outline" className="text-xs">Potassium Rich</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-bread-brown mb-2">Guava</h3>
                <p className="text-muted-foreground mb-2">
                  This tropical fruit brings natural sweetness along with powerful antioxidants, vitamin C, and dietary fiber. 
                  Guava supports immune health and provides natural energy.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">High Antioxidants</Badge>
                  <Badge variant="outline" className="text-xs">Natural Vitamin C</Badge>
                  <Badge variant="outline" className="text-xs">Dietary Fiber</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-bread-brown mb-2">Cashew Cream (Vegan Option)</h3>
                <p className="text-muted-foreground mb-2">
                  Our plant-based cream alternative provides healthy fats, protein, and minerals like magnesium and zinc, 
                  all while being completely dairy-free.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">Healthy Fats</Badge>
                  <Badge variant="outline" className="text-xs">Plant Protein</Badge>
                  <Badge variant="outline" className="text-xs">Dairy-Free</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-bread-brown hover:bg-bread-brown/90 text-coconut-white"
              onClick={() => navigate('/order')}
            >
              Order Your Nutritious Bombshells
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionalValuePage;