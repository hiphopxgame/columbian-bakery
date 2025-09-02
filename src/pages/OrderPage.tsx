import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const OrderPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState('retail');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'retail',
    quantity: 2,
    doughType: '',
    filling: '',
    delivery: '',
    specialInstructions: ''
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    if (orderType === 'retail') {
      return formData.quantity * 25;
    } else if (orderType === 'wholesale-baked') {
      return formData.quantity * 300;
    } else if (orderType === 'wholesale-frozen') {
      return formData.quantity * 200;
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('cbake_orders')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          order_type: orderType,
          quantity: formData.quantity,
          dough_type: formData.doughType,
          filling: formData.filling,
          delivery: formData.delivery,
          special_instructions: formData.specialInstructions,
          estimated_total: calculateTotal()
        }]);

      if (error) throw error;

      toast({
        title: "Order Submitted Successfully!",
        description: "We've received your order and will contact you within 24 hours to confirm.",
      });
      
      // Navigate to thank you page
      navigate('/thank-you');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        orderType: 'retail',
        quantity: 2,
        doughType: '',
        filling: '',
        delivery: '',
        specialInstructions: ''
      });
      setOrderType('retail');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Error Submitting Order",
        description: "There was an issue submitting your order. Please try again or contact us directly.",
        variant: "destructive",
      });
    }
  };

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
            <h1 className="text-4xl font-serif font-bold text-bread-brown mb-2">
              Place Your Order
            </h1>
            <p className="text-muted-foreground">
              Fill out the form below to place your Bombshell order
            </p>
          </div>

          {/* Order Type Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-bread-brown">
                Select Order Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <Button
                  variant={orderType === 'retail' ? 'default' : 'outline'}
                  onClick={() => {
                    setOrderType('retail');
                    handleInputChange('orderType', 'retail');
                  }}
                  className="h-auto p-4 flex flex-col"
                >
                  <span className="font-semibold">Retail</span>
                  <span className="text-sm opacity-75">2+ dozen minimum</span>
                  <Badge variant="secondary" className="mt-2">$25/dozen</Badge>
                </Button>
                <Button
                  variant={orderType === 'wholesale-baked' ? 'default' : 'outline'}
                  onClick={() => {
                    setOrderType('wholesale-baked');
                    handleInputChange('orderType', 'wholesale-baked');
                  }}
                  className="h-auto p-4 flex flex-col"
                >
                  <span className="font-semibold">Wholesale Baked</span>
                  <span className="text-sm opacity-75">Ready to serve</span>
                  <Badge variant="secondary" className="mt-2">$300/unit</Badge>
                </Button>
                <Button
                  variant={orderType === 'wholesale-frozen' ? 'default' : 'outline'}
                  onClick={() => {
                    setOrderType('wholesale-frozen');
                    handleInputChange('orderType', 'wholesale-frozen');
                  }}
                  className="h-auto p-4 flex flex-col"
                >
                  <span className="font-semibold">Wholesale Frozen</span>
                  <span className="text-sm opacity-75">Bake fresh in-house</span>
                  <Badge variant="secondary" className="mt-2">$200/unit</Badge>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown">
                Order Details
              </CardTitle>
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

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity ({orderType === 'retail' ? 'dozens' : 'units'})
                  </label>
                  <div className="flex items-center space-x-4">
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={() => handleInputChange('quantity', Math.max(orderType === 'retail' ? 2 : 2, formData.quantity - 1))}
                      disabled={formData.quantity <= 2}
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold w-12 text-center">{formData.quantity}</span>
                    <Button 
                      type="button"
                      variant="outline" 
                      size="sm"
                      onClick={() => handleInputChange('quantity', formData.quantity + 1)}
                    >
                      +
                    </Button>
                    <span className="text-muted-foreground ml-4">
                      ({orderType === 'retail' ? formData.quantity * 13 : formData.quantity * 100} Bombshells total)
                    </span>
                  </div>
                </div>

                {/* Product Options */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Dough Type *
                    </label>
                    <Select value={formData.doughType} onValueChange={(value) => handleInputChange('doughType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your dough type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic Yuca Dough</SelectItem>
                        <SelectItem value="vegan">Vegan Yuca Dough</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Filling (Guava & Cream included) *
                    </label>
                    <Select value={formData.filling} onValueChange={(value) => handleInputChange('filling', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your favorite filling" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guava">Guava & Cream (Standard)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Delivery Format *
                  </label>
                  <Select value={formData.delivery} onValueChange={(value) => handleInputChange('delivery', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="How would you like them delivered?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="frozen">Frozen (reheat at home)</SelectItem>
                      <SelectItem value="warm">Warm & Ready-to-Eat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Special Instructions
                  </label>
                  <Textarea
                    value={formData.specialInstructions}
                    onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                    placeholder="Any special requests or dietary requirements..."
                    rows={3}
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-yuca-cream p-6 rounded-lg">
                  <h4 className="text-lg font-serif font-semibold text-bread-brown mb-4">
                    Order Summary
                  </h4>
                  <div className="space-y-2 text-foreground">
                    <div className="flex justify-between">
                      <span>Order Type:</span>
                      <span className="capitalize">{orderType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quantity:</span>
                      <span>{formData.quantity} {orderType === 'retail' ? 'dozen' : 'unit'}{formData.quantity > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Bombshells:</span>
                      <span>{orderType === 'retail' ? formData.quantity * 13 : formData.quantity * 100}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                      <span>Estimated Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white text-lg font-semibold py-4"
                  disabled={!formData.name || !formData.email || !formData.doughType || !formData.filling || !formData.delivery}
                >
                  Submit Order Request
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  This is a request for quote. We'll contact you within 24 hours to confirm availability, 
                  final pricing, and arrange payment.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;