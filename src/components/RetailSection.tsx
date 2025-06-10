
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const RetailSection = () => {
  const [doughType, setDoughType] = useState('');
  const [filling, setFilling] = useState('');
  const [delivery, setDelivery] = useState('');
  const [quantity, setQuantity] = useState(2);

  const calculateTotal = () => {
    return quantity * 25;
  };

  return (
    <section id="retail" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-bread-brown mb-6">
              Retail Orders
            </h2>
            <p className="text-xl text-muted-foreground">
              Perfect for families, gatherings, and special occasions
            </p>
          </div>

          {/* Pricing Overview */}
          <Card className="mb-12 bg-gradient-to-r from-yuca-cream to-coconut-white border-guava-pink/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">$25</h3>
                  <p className="text-muted-foreground">per dozen</p>
                  <Badge variant="secondary" className="mt-2">13 Bombshells per box</Badge>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">~$2.00</h3>
                  <p className="text-muted-foreground">per Bombshell</p>
                  <Badge variant="secondary" className="mt-2">Baker's dozen</Badge>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-bread-brown mb-2">2 dozen</h3>
                  <p className="text-muted-foreground">minimum order</p>
                  <Badge variant="secondary" className="mt-2">26 Bombshells</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-bread-brown">
                Customize Your Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Quantity (dozens)
                </label>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(2, quantity - 1))}
                    disabled={quantity <= 2}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                  <span className="text-muted-foreground ml-4">
                    ({quantity * 13} Bombshells total)
                  </span>
                </div>
              </div>

              {/* Dough Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Dough Type
                </label>
                <Select value={doughType} onValueChange={setDoughType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your dough type" />
                  </SelectTrigger>
                  <SelectContent className="bg-coconut-white border-border/50">
                    <SelectItem value="classic">Classic Yuca Dough</SelectItem>
                    <SelectItem value="vegan">Vegan Yuca Dough</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filling */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Filling
                </label>
                <Select value={filling} onValueChange={setFilling}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your favorite filling" />
                  </SelectTrigger>
                  <SelectContent className="bg-coconut-white border-border/50">
                    <SelectItem value="guava">Guava Cream</SelectItem>
                    <SelectItem value="dulce">Dulce de Leche</SelectItem>
                    <SelectItem value="coconut">Coconut Cream</SelectItem>
                    <SelectItem value="none">None (Plain)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Delivery Format */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Delivery Format
                </label>
                <Select value={delivery} onValueChange={setDelivery}>
                  <SelectTrigger>
                    <SelectValue placeholder="How would you like them delivered?" />
                  </SelectTrigger>
                  <SelectContent className="bg-coconut-white border-border/50">
                    <SelectItem value="frozen">Frozen (reheat at home)</SelectItem>
                    <SelectItem value="warm">Warm & Ready-to-Eat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Order Summary */}
              <div className="bg-yuca-cream p-6 rounded-lg">
                <h4 className="text-lg font-serif font-semibold text-bread-brown mb-4">
                  Order Summary
                </h4>
                <div className="space-y-2 text-foreground">
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{quantity} dozen{quantity > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Bombshells:</span>
                    <span>{quantity * 13}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>

              {/* Order Button */}
              <Button 
                size="lg" 
                className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white text-lg font-semibold py-4"
                disabled={!doughType || !filling || !delivery}
              >
                Customize & Order Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RetailSection;
