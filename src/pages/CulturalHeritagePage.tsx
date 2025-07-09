import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CulturalHeritagePage = () => {
  const navigate = useNavigate();

  const traditions = [
    {
      title: "Yuca: The Foundation",
      description: "Cassava root has been a staple in Colombian cuisine for centuries, representing resilience and sustenance in our culture.",
      icon: "🌿"
    },
    {
      title: "Guava: Sweet Traditions",
      description: "The beloved guava fruit carries stories of family gatherings and shared sweetness across generations.",
      icon: "🍑"
    },
    {
      title: "Family Recipes",
      description: "Our Bombshell recipe carries the wisdom of Colombian grandmothers, passed down through loving hands.",
      icon: "👵"
    },
    {
      title: "Portland Connection",
      description: "Bringing authentic Colombian flavors to Portland, creating a bridge between two beautiful cultures.",
      icon: "🌉"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yuca-cream to-coconut-white py-8">
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
              Cultural Heritage
            </h1>
            <p className="text-xl text-muted-foreground">
              Celebrating the rich traditions and stories behind every Bombshell
            </p>
          </div>

          {/* Hero Section */}
          <Card className="mb-12 bg-gradient-to-r from-guava-pink/10 to-dulce-caramel/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-bread-brown mb-4">
                From Colombian Kitchens to Portland Hearts
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every Bombshell carries within it the essence of Colombian culture – a legacy of ingredients 
                that have nourished families for generations. The yuca root, our foundation, represents the 
                strength and adaptability of our people. Combined with the sweetness of guava, it tells a 
                story of joy, celebration, and the importance of sharing good food with those we love.
              </p>
            </CardContent>
          </Card>

          {/* Traditions Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {traditions.map((tradition, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-bread-brown">
                    <span className="text-2xl mr-3">{tradition.icon}</span>
                    {tradition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{tradition.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Story Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown">
                The Bombshell Story
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                In the heart of Colombia, where the Andes meet the Caribbean breeze, families have gathered 
                for centuries around the simple pleasure of fresh-baked goods. The Bombshell represents more 
                than just a pastry – it's a celebration of cultural identity, a bridge between past and present.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our founder's journey from Colombian kitchens to Portland's vibrant food scene represents 
                the beautiful tapestry of immigration and cultural exchange. Each Bombshell we create honors 
                the traditions while embracing innovation, ensuring that these cherished flavors continue 
                to bring people together, one bite at a time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When you taste a Bombshell, you're experiencing generations of culinary wisdom, the warmth 
                of Colombian hospitality, and the joy of sharing authentic flavors with your community.
              </p>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <Button 
              size="lg"
              className="bg-bread-brown hover:bg-bread-brown/90 text-coconut-white"
              onClick={() => navigate('/order')}
            >
              Experience Our Heritage - Order Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalHeritagePage;