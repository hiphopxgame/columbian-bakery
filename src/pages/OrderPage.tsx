import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { toast } = useToast();
  const [orderType, setOrderType] = useState('wholesale-frozen');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [wholesaleProduct, setWholesaleProduct] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderType: 'wholesale-frozen',
    quantity: 2,
    doughType: '',
    filling: '',
    delivery: '',
    specialInstructions: ''
  });

  // Wholesale pricing mapping - SCALED UP
  const wholesalePricing = {
    'e27d0fd9-94db-4b5d-9c81-a876b831ca3f': 200, // Classic Bombshell - $2.00 each
    'de1d2c3b-d2dc-4d09-bba6-82051180cade': 250, // Vegan Bombshell - $2.50 each  
    'a7323d9f-d71c-4017-89cf-64beda401a44': 400, // Pandebono - $4.00 each
    'db78b11a-9547-441b-9d1b-ed74f74f7012': 300, // Pan de Yuca - $3.00 each
    '1e3472fd-7dcd-42c1-ae41-6cf420f5a0d7': 350  // Pandequeso - $3.50 each
  };

  useEffect(() => {
    // Fetch products for wholesale selection
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('cbake_products')
          .select('*')
          .eq('is_active', true)
          .order('display_order');
        
        if (error) {
          console.error('Error fetching products:', error);
        } else {
          setProducts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();

    // Check if product was selected from catalog
    if (location.state?.selectedProduct) {
      setSelectedProduct(location.state.selectedProduct);
    }
  }, [location.state]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateTotal = () => {
    if (selectedProduct) {
      return formData.quantity * (selectedProduct.price || 0);
    }
    if (wholesaleProduct && wholesalePricing[wholesaleProduct]) {
      return formData.quantity * (wholesalePricing[wholesaleProduct] / 100);
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
          product_id: selectedProduct?.id || wholesaleProduct || null,
          product_name: selectedProduct?.name || products.find(p => p.id === wholesaleProduct)?.name || null,
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
        orderType: 'wholesale-frozen',
        quantity: 2,
        doughType: '',
        filling: '',
        delivery: '',
        specialInstructions: ''
      });
      setOrderType('wholesale-frozen');
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
              {selectedProduct ? `Order ${selectedProduct.name}` : 'Place Your Order'}
            </h1>
            <p className="text-muted-foreground">
              {selectedProduct 
                ? `Fill out the form below to order ${selectedProduct.name}` 
                : 'Fill out the form below to place your order'
              }
            </p>
            {selectedProduct && (
              <div className="mt-4 p-4 bg-yuca-cream rounded-lg">
                <p className="text-bread-brown font-semibold">
                  Selected Product: {selectedProduct.name} - ${selectedProduct.price}
                </p>
              </div>
            )}
          </div>

          {/* Order Type Selection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl font-serif text-bread-brown">
                Wholesale Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-yuca-cream/50 rounded-lg">
                <div className="flex items-center justify-center text-center">
                  <div>
                    <span className="text-2xl mr-2">❄️</span>
                    <span className="font-semibold text-bread-brown">Frozen Dough Only</span>
                    <p className="text-sm text-muted-foreground mt-2">
                      All wholesale orders are frozen dough for maximum freshness - bake fresh in your establishment
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Selection for Wholesale */}
          {!selectedProduct && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl font-serif text-bread-brown">
                  Select Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map((product) => {
                    const wholesalePrice = wholesalePricing[product.id];
                    const pricePerUnit = wholesalePrice / 100;
                    
                    return (
                      <Card 
                        key={product.id}
                        className={`cursor-pointer transition-all border-2 ${
                          wholesaleProduct === product.id 
                            ? 'border-bread-brown bg-yuca-cream/50' 
                            : 'border-border hover:border-bread-brown/50'
                        }`}
                        onClick={() => setWholesaleProduct(product.id)}
                      >
                        <CardContent className="p-4">
                          <div className="text-center">
                            <h4 className="font-semibold text-bread-brown mb-2">{product.name}</h4>
                            <p className="text-xs text-muted-foreground mb-3">{product.description}</p>
                            <div className="space-y-1">
                              <div className="text-lg font-bold text-bread-brown">${pricePerUnit.toFixed(2)} each</div>
                              <div className="text-sm text-muted-foreground">${wholesalePrice}/unit (100)</div>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.tags.map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

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

                 <div>
                   <label className="block text-sm font-medium text-foreground mb-2">
                     Quantity (units) - Minimum 2 units
                   </label>
                   <div className="flex items-center space-x-4">
                     <Button 
                       type="button"
                       variant="outline" 
                       size="sm"
                       onClick={() => handleInputChange('quantity', Math.max(2, formData.quantity - 1))}
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
                       ({formData.quantity * 100} pieces total)
                     </span>
                   </div>
                 </div>

                 {/* Product Options */}
                 <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-foreground mb-2">
                       Delivery Format *
                     </label>
                     <Select value={formData.delivery} onValueChange={(value) => handleInputChange('delivery', value)}>
                       <SelectTrigger>
                         <SelectValue placeholder="How would you like them delivered?" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="frozen">Frozen Dough (recommended)</SelectItem>
                         <SelectItem value="pickup">Pickup at Bakery</SelectItem>
                         <SelectItem value="delivery">Local Delivery</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-foreground mb-2">
                       Special Requirements
                     </label>
                     <Select value={formData.filling} onValueChange={(value) => handleInputChange('filling', value)}>
                       <SelectTrigger>
                         <SelectValue placeholder="Any special requirements?" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="standard">Standard Recipe</SelectItem>
                         <SelectItem value="extra-cream">Extra Cream (+$10/unit)</SelectItem>
                         <SelectItem value="no-cream">No Cream Filling</SelectItem>
                         <SelectItem value="custom">Custom (specify in instructions)</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>
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
                       <span>Product:</span>
                       <span>{
                         selectedProduct?.name || 
                         products.find(p => p.id === wholesaleProduct)?.name || 
                         'Select a product'
                       }</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Format:</span>
                       <span>Frozen Dough (Wholesale)</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Quantity:</span>
                       <span>{formData.quantity} unit{formData.quantity > 1 ? 's' : ''}</span>
                     </div>
                     <div className="flex justify-between">
                       <span>Total Pieces:</span>
                       <span>{formData.quantity * 100}</span>
                     </div>
                     {wholesaleProduct && (
                       <div className="flex justify-between">
                         <span>Price per Unit:</span>
                         <span>${(wholesalePricing[wholesaleProduct] || 0).toFixed(0)}</span>
                       </div>
                     )}
                     <div className="flex justify-between font-semibold text-lg border-t border-border pt-2">
                       <span>Estimated Total:</span>
                       <span>${calculateTotal().toFixed(0)}</span>
                     </div>
                   </div>
                 </div>

                 <Button 
                   type="submit"
                   size="lg" 
                   className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white text-lg font-semibold py-4"
                   disabled={!formData.name || !formData.email || !formData.delivery || (!selectedProduct && !wholesaleProduct)}
                 >
                   Submit Wholesale Order Request
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