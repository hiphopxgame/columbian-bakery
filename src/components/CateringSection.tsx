
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CateringSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    guestCount: '',
    eventDate: '',
    flavors: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Catering inquiry submitted:', formData);
    // Handle form submission
  };

  const cateringOptions = [
    {
      title: "Weddings",
      description: "Make your special day even sweeter with authentic Colombian pastries",
      icon: "💍",
      features: ["Custom flavor selection", "Elegant presentation", "Dietary accommodations"]
    },
    {
      title: "Corporate Events",
      description: "Impress clients and colleagues with unique, professional catering",
      icon: "🏢",
      features: ["Bulk ordering", "On-time delivery", "Professional setup"]
    },
    {
      title: "Private Parties",
      description: "Celebrate any occasion with a taste of Colombia",
      icon: "🎉",
      features: ["Flexible quantities", "Mix and match flavors", "Personal touch"]
    },
    {
      title: "Café Partnerships",
      description: "Regular wholesale supply for your establishment",
      icon: "☕",
      features: ["Consistent supply", "Competitive pricing", "Brand collaboration"]
    }
  ];

  return (
    <section id="catering" className="py-20 bg-gradient-to-b from-coconut-white to-yuca-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Catering & Special Orders
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Bring the authentic taste of Colombia to your special events, 
              corporate gatherings, and celebrations
            </p>
          </div>

          {/* Catering Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cateringOptions.map((option, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 bg-card/50">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-lg font-serif font-semibold text-bread-brown mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {option.description}
                  </p>
                  <div className="space-y-1">
                    {option.features.map((feature, featureIndex) => (
                      <p key={featureIndex} className="text-xs text-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-guava-pink rounded-full mr-2"></span>
                        {feature}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown text-center">
                Request a Custom Quote
              </CardTitle>
              <p className="text-muted-foreground text-center">
                Tell us about your event and we'll create the perfect Colombian experience
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event Type *
                    </label>
                    <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="bg-coconut-white">
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="private">Private Party</SelectItem>
                        <SelectItem value="cafe">Café Partnership</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Number of Guests
                    </label>
                    <Input
                      value={formData.guestCount}
                      onChange={(e) => handleInputChange('guestCount', e.target.value)}
                      placeholder="Approximate guest count"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event Date
                    </label>
                    <Input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange('eventDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Flavors
                    </label>
                    <Input
                      value={formData.flavors}
                      onChange={(e) => handleInputChange('flavors', e.target.value)}
                      placeholder="Guava, Dulce de Leche, Coconut..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Details
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your event, special dietary requirements, or any specific requests..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white text-lg font-semibold py-4"
                >
                  Request Custom Quote
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              <strong>Planning ahead?</strong> We recommend booking catering services at least 2 weeks in advance for best availability.
            </p>
            <p className="text-muted-foreground">
              Questions? Call us directly at <strong>(503) 555-BOMB</strong> or email <strong>catering@colombianbakerypdx.com</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
