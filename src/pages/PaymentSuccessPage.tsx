import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl font-serif text-bread-brown">
                Payment Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-lg text-muted-foreground">
                Thank you for your order! Your payment has been processed successfully.
              </p>
              
              <div className="bg-yuca-cream/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-bread-brown mb-2">
                  What happens next?
                </h3>
                <ul className="text-left space-y-2 text-muted-foreground">
                  <li>• You'll receive a confirmation email with your order details</li>
                  <li>• We'll prepare your fresh frozen dough order</li>
                  <li>• You'll be notified when your order is ready for pickup/delivery</li>
                  <li>• Questions? Contact us at gavabombshellpdx@gmail.com</li>
                </ul>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full bg-bread-brown hover:bg-bread-brown/90 text-coconut-white"
                >
                  Return Home
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/catalog')}
                  className="w-full"
                >
                  Browse More Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;