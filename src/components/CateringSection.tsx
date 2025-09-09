import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CateringSection = () => {
  return (
    <section id="catering" className="py-20 bg-gradient-to-b from-coconut-white to-yuca-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Event Catering Services
            </h2>
            <p className="text-xl text-muted-foreground">
              Fresh baked bombshells delivered hot for your special events
            </p>
          </div>

          {/* Hero Card */}
          <Card className="mb-12 bg-gradient-to-r from-dulce-caramel/20 to-guava-pink/20 border-dulce-caramel/30">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-serif font-bold text-bread-brown mb-4">
                Hire Our Team for Your Event
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Let our professional team bring the authentic Colombian experience directly to your event. 
                We'll bake fresh bombshells on-site and serve them hot with premium fillings.
              </p>
            </CardContent>
          </Card>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center bg-card/50 border-tropic-green/20">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">👨‍🍳</div>
                <h3 className="text-xl font-serif font-bold text-bread-brown mb-2">Professional Team</h3>
                <p className="text-muted-foreground">Experienced bakers and service staff</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/50 border-guava-pink/20">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="text-xl font-serif font-bold text-bread-brown mb-2">Fresh & Hot</h3>
                <p className="text-muted-foreground">Baked fresh on-site during your event</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card/50 border-dulce-caramel/20">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">🎪</div>
                <h3 className="text-xl font-serif font-bold text-bread-brown mb-2">Full Service</h3>
                <p className="text-muted-foreground">Complete setup, service, and cleanup</p>
              </CardContent>
            </Card>
          </div>

          {/* Event Types */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown text-center">
                Perfect For Your Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-bread-brown mb-4 flex items-center">
                    <span className="mr-2">🎊</span>
                    Corporate Events
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Company parties and celebrations</li>
                    <li>• Product launches and conferences</li>
                    <li>• Team building events</li>
                    <li>• Office grand openings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-bread-brown mb-4 flex items-center">
                    <span className="mr-2">💒</span>
                    Special Occasions
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Weddings and receptions</li>
                    <li>• Birthday parties and anniversaries</li>
                    <li>• Cultural festivals and fairs</li>
                    <li>• Community gatherings</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Catering Packages */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-guava-pink/10 to-dulce-caramel/10 border-guava-pink/20">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown flex items-center">
                  <span className="mr-2">🥖</span>
                  Standard Catering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Perfect for smaller events and gatherings. Fresh baked bombshells 
                  with choice of traditional fillings.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Minimum:</span>
                    <span className="font-semibold">50 guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Time:</span>
                    <span className="font-semibold">2-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Includes:</span>
                    <Badge variant="secondary">Setup & Service</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full bg-guava-pink hover:bg-guava-pink/90 text-coconut-white"
                  onClick={() => window.location.href = '/custom-quote?service=standard-catering'}
                >
                  Request Standard Catering
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-tropic-green/10 to-bread-brown/10 border-tropic-green/20">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown flex items-center">
                  <span className="mr-2">👑</span>
                  Premium Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Complete Colombian culinary experience with premium fillings, 
                  interactive stations, and cultural presentation.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Minimum:</span>
                    <span className="font-semibold">100 guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service Time:</span>
                    <span className="font-semibold">3-6 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Includes:</span>
                    <Badge variant="secondary">Full Experience</Badge>
                  </div>
                </div>
                <Button 
                  className="w-full bg-tropic-green hover:bg-tropic-green/90 text-coconut-white"
                  onClick={() => window.location.href = '/custom-quote?service=premium-catering'}
                >
                  Request Premium Experience
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact CTA */}
          <div className="text-center mt-12">
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">
                Ready to Bring Colombia to Your Event?
              </h3>
              <p className="text-muted-foreground">
                Contact us for a custom quote and let's make your event unforgettable!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-cacao-brown hover:bg-cacao-brown/90 text-coconut-white"
                onClick={() => window.location.href = '/custom-quote?service=event-catering'}
              >
                Get Custom Catering Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-bread-brown text-bread-brown hover:bg-bread-brown hover:text-coconut-white"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Contact Our Catering Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;