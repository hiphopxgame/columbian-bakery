import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

const InnovationTraditionPage = () => {
  const navigate = useNavigate();

  const innovations = [
    {
      title: "Modern Baking Techniques",
      traditional: "Wood-fired ovens and hand-shaping",
      modern: "Precision temperature control and consistent texture",
      impact: "Ensures perfect results every time while preserving authentic flavors",
      icon: "🔥"
    },
    {
      title: "Vegan Adaptations",
      traditional: "Dairy-based cream fillings",
      modern: "Cashew-based cream alternatives",
      impact: "Inclusive options without compromising on taste or tradition",
      icon: "🌱"
    },
    {
      title: "Quality Preservation",
      traditional: "Same-day consumption",
      modern: "Freezing technology for extended freshness",
      impact: "Enjoy authentic flavors days later with perfect texture",
      icon: "❄️"
    },
    {
      title: "Artisan Scaling",
      traditional: "Small family batches",
      modern: "Consistent quality at larger volumes",
      impact: "Bringing authentic Colombian flavors to more Portland families",
      icon: "📈"
    }
  ];

  const principles = [
    {
      title: "Respect for Tradition",
      description: "Every innovation starts with deep respect for the original recipes and techniques passed down through generations.",
      values: ["Authentic flavors", "Traditional ingredients", "Cultural integrity"]
    },
    {
      title: "Purposeful Innovation",
      description: "We only innovate when it serves our customers better - whether through accessibility, quality, or convenience.",
      values: ["Customer-focused", "Quality-driven", "Practical solutions"]
    },
    {
      title: "Community Connection",
      description: "Balancing the needs of our Portland community while honoring our Colombian heritage.",
      values: ["Local adaptation", "Cultural bridge", "Inclusive offerings"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-coconut-white to-yuca-cream py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
              Innovation & Tradition
            </h1>
            <p className="text-xl text-muted-foreground">
              Where centuries-old recipes meet modern techniques to create the perfect Bombshell experience
            </p>
          </div>

          {/* Philosophy Section */}
          <Card className="mb-12 bg-gradient-to-r from-guava-pink/10 to-dulce-caramel/10">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-bread-brown mb-4">
                Our Philosophy: Honoring the Past, Embracing the Future
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Bombshell PDX, we believe that true innovation doesn't replace tradition—it enhances it. 
                Every modern technique we employ serves a single purpose: to bring you the most authentic, 
                delicious Colombian experience possible, while making it accessible to our diverse Portland community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our innovations are born from love—love for the original recipes, love for our customers, 
                and love for the beautiful cultural exchange that happens when traditional flavors find new homes.
              </p>
            </CardContent>
          </Card>

          {/* Innovation Examples */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-bread-brown mb-8 text-center">
              Tradition Meets Innovation
            </h2>
            <div className="grid gap-6">
              {innovations.map((innovation, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center text-bread-brown">
                      <span className="text-2xl mr-3">{innovation.icon}</span>
                      {innovation.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-semibold text-sm text-bread-brown mb-2">Traditional Approach</h4>
                        <p className="text-muted-foreground text-sm">{innovation.traditional}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-bread-brown mb-2">Modern Enhancement</h4>
                        <p className="text-muted-foreground text-sm">{innovation.modern}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-bread-brown mb-2">Customer Impact</h4>
                        <p className="text-muted-foreground text-sm">{innovation.impact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Core Principles */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-bread-brown mb-8 text-center">
              Our Guiding Principles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map((principle, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-serif text-bread-brown">
                      {principle.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">{principle.description}</p>
                    <div className="space-y-2">
                      {principle.values.map((value, valueIndex) => (
                        <Badge key={valueIndex} variant="outline" className="mr-2">
                          {value}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Future Vision */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown">
                Looking Forward: Our Vision for the Future
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                As we continue to grow, our commitment remains unchanged: to be a bridge between cultures, 
                bringing the authentic taste of Colombia to Portland while embracing innovations that serve our community better.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-bread-brown mb-2">Sustainability Innovations</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Eco-friendly packaging solutions</li>
                    <li>• Local ingredient sourcing when possible</li>
                    <li>• Energy-efficient production methods</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-bread-brown mb-2">Community Expansion</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• Educational workshops on Colombian cuisine</li>
                    <li>• Partnerships with local businesses</li>
                    <li>• Seasonal flavor innovations</li>
                  </ul>
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
              Taste Tradition & Innovation Today
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationTraditionPage;