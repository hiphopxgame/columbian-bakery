import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

const CateringPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 bg-gradient-to-b from-coconut-white to-yuca-cream">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
                Event Catering Services
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Bring the authentic taste of Colombia to your special events with our professional catering team. 
                Fresh-baked Bombshells served hot with premium fillings.
              </p>
            </div>

            {/* Hero Service Card */}
            <Card className="mb-12 bg-gradient-to-r from-dulce-caramel/20 to-guava-pink/20 border-dulce-caramel/30">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-serif font-bold text-bread-brown mb-4">
                  Professional On-Site Catering
                </h2>
                <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-6">
                  Our experienced team brings a complete Colombian culinary experience to your venue. 
                  We bake fresh Bombshells on-site, ensuring your guests enjoy them at peak flavor and temperature.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                  <Badge className="bg-guava-pink text-white px-4 py-2">Fresh Baked On-Site</Badge>
                  <Badge className="bg-tropic-green text-white px-4 py-2">Professional Service</Badge>
                  <Badge className="bg-dulce-caramel text-white px-4 py-2">Complete Setup & Cleanup</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Service Options */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-guava-pink/10 to-dulce-caramel/10 border-guava-pink/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-bread-brown flex items-center">
                    <span className="mr-2">🥖</span>
                    Standard Catering Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Perfect for corporate events, smaller gatherings, and casual celebrations.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Minimum Guests:</span>
                      <span>50 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Service Duration:</span>
                      <span>2-4 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bombshells per Person:</span>
                      <span>3-4 pieces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Filling Options:</span>
                      <span>2-3 varieties</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-bread-brown mb-2">Includes:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Professional chef and server</li>
                      <li>• Portable baking equipment</li>
                      <li>• Setup and cleanup</li>
                      <li>• Serving platters and utensils</li>
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
                    onClick={() => navigate('/custom-quote?service=standard-catering')}
                  >
                    Request Standard Catering Quote
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-tropic-green/10 to-bread-brown/10 border-tropic-green/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-bread-brown flex items-center">
                    <span className="mr-2">👑</span>
                    Premium Experience Package
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Complete Colombian culinary experience with cultural presentation and premium service.
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Minimum Guests:</span>
                      <span>100 people</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Service Duration:</span>
                      <span>3-6 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Bombshells per Person:</span>
                      <span>4-6 pieces</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Filling Options:</span>
                      <span>5+ premium varieties</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-bread-brown mb-2">Includes Everything Above Plus:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Interactive baking demonstrations</li>
                      <li>• Cultural storytelling</li>
                      <li>• Premium fillings (guava, dulce de leche)</li>
                      <li>• Branded serving materials</li>
                      <li>• Take-home samples</li>
                    </ul>
                  </div>
                  <Button 
                    className="w-full bg-tropic-green hover:bg-tropic-green/90 text-coconut-white"
                    onClick={() => navigate('/custom-quote?service=premium-catering')}
                  >
                    Request Premium Experience Quote
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Perfect Events */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-bread-brown text-center">
                  Perfect for Your Event
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-bread-brown mb-4 flex items-center">
                      <span className="mr-2">🏢</span>
                      Corporate Events
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Company parties and celebrations</li>
                      <li>• Product launches and conferences</li>
                      <li>• Team building events</li>
                      <li>• Office grand openings</li>
                      <li>• Client appreciation events</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-bread-brown mb-4 flex items-center">
                      <span className="mr-2">💒</span>
                      Special Occasions
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Weddings and receptions</li>
                      <li>• Birthday parties and anniversaries</li>
                      <li>• Graduation celebrations</li>
                      <li>• Family reunions</li>
                      <li>• Holiday gatherings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-bread-brown mb-4 flex items-center">
                      <span className="mr-2">🎪</span>
                      Community Events
                    </h4>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Cultural festivals and fairs</li>
                      <li>• Fundraising events</li>
                      <li>• Grand openings</li>
                      <li>• Farmers markets</li>
                      <li>• Community gatherings</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center">
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold text-bread-brown mb-4">
                  Ready to Bring Colombia to Your Event?
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Let us create an unforgettable culinary experience for your guests. 
                  Every event is custom designed to fit your needs, budget, and vision.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Button 
                  size="lg" 
                  className="bg-cacao-brown hover:bg-cacao-brown/90 text-coconut-white px-8 py-6 text-xl"
                  onClick={() => navigate('/custom-quote?service=event-catering')}
                >
                  Get Custom Catering Quote
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white px-8 py-6 text-xl"
                  onClick={() => navigate('/contact')}
                >
                  Speak with Our Catering Team
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Planning a large event? We offer special pricing for events over 200 guests. 
                <Button variant="link" className="p-0 ml-1" onClick={() => navigate('/contact')}>
                  Contact us for details
                </Button>
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CateringPage;