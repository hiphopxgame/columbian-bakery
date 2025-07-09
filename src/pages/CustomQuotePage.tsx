import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CustomQuotePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    guestCount: '',
    eventDate: '',
    flavors: '',
    budget: '',
    deliveryLocation: '',
    setupRequired: '',
    message: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the quote request to your backend
    toast({
      title: "Quote Request Submitted!",
      description: "We'll get back to you within 24 hours with a custom quote.",
    });
    console.log('Quote request submitted:', formData);
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
            <h1 className="text-4xl font-serif font-bold text-bread-brown mb-2">
              Custom Quote Request
            </h1>
            <p className="text-muted-foreground">
              Let us create the perfect Colombian experience for your special event
            </p>
          </div>

          {/* Catering Options Overview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

          {/* Quote Request Form */}
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown text-center">
                Request Your Custom Quote
              </CardTitle>
              <p className="text-muted-foreground text-center">
                Provide details about your event and we'll create a personalized quote
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
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
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(503) 555-0123"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company/Organization
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Company name (if applicable)"
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Event Type *
                    </label>
                    <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
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
                      Number of Guests *
                    </label>
                    <Input
                      value={formData.guestCount}
                      onChange={(e) => handleInputChange('guestCount', e.target.value)}
                      placeholder="Approximate guest count"
                      required
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
                      Estimated Budget Range
                    </label>
                    <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500">Under $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                        <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                        <SelectItem value="over-5000">Over $5,000</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preferred Flavors
                  </label>
                  <Input
                    value={formData.flavors}
                    onChange={(e) => handleInputChange('flavors', e.target.value)}
                    placeholder="Guava, Dulce de Leche, Coconut, or let us suggest..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Delivery Location
                  </label>
                  <Input
                    value={formData.deliveryLocation}
                    onChange={(e) => handleInputChange('deliveryLocation', e.target.value)}
                    placeholder="Event venue address or delivery location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Setup & Service Requirements
                  </label>
                  <Select value={formData.setupRequired} onValueChange={(value) => handleInputChange('setupRequired', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Do you need setup assistance?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delivery-only">Delivery Only</SelectItem>
                      <SelectItem value="setup-included">Setup & Display Included</SelectItem>
                      <SelectItem value="full-service">Full Service (Setup, Serving, Cleanup)</SelectItem>
                      <SelectItem value="discuss">Let's Discuss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Additional Details & Special Requests
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your event, special dietary requirements, presentation preferences, or any specific requests..."
                    rows={5}
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white text-lg font-semibold py-4"
                  disabled={!formData.name || !formData.email || !formData.eventType || !formData.guestCount}
                >
                  Request Custom Quote
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    We'll review your request and get back to you within 24 hours with a detailed quote.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Planning ahead?</strong> We recommend booking catering services at least 2 weeks in advance.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Questions? Call us at <strong>(503) 555-BOMB</strong> or email <strong>catering@colombianbakerypdx.com</strong>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomQuotePage;