import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const processPayment = async () => {
      const paypalOrderId = searchParams.get('token');
      const orderId = sessionStorage.getItem('pendingOrderId');
      const storedPaypalOrderId = sessionStorage.getItem('paypalOrderId');

      if (!paypalOrderId || !orderId || paypalOrderId !== storedPaypalOrderId) {
        toast({
          title: "Payment Error",
          description: "Invalid payment session. Please try again.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      try {
        const response = await supabase.functions.invoke('capture-paypal-payment', {
          body: {
            paypalOrderId,
            orderId
          }
        });

        if (response.error) {
          throw new Error(response.error.message);
        }

        // Send receipt email
        try {
          await supabase.functions.invoke('send-order-receipt', {
            body: {
              orderId,
              paymentCompleted: true
            }
          });
        } catch (emailError) {
          console.error('Error sending receipt email:', emailError);
        }

        setSuccess(true);
        setProcessing(false);

        // Clear session storage
        sessionStorage.removeItem('pendingOrderId');
        sessionStorage.removeItem('paypalOrderId');

        toast({
          title: "Payment Successful!",
          description: "Your order has been confirmed and you'll receive a receipt via email.",
        });

      } catch (error) {
        console.error('Error processing payment:', error);
        toast({
          title: "Payment Processing Error",
          description: "There was an issue confirming your payment. Please contact us if you were charged.",
          variant: "destructive",
        });
        setProcessing(false);
      }
    };

    if (searchParams.get('success') === 'true') {
      processPayment();
    } else if (searchParams.get('canceled') === 'true') {
      toast({
        title: "Payment Canceled",
        description: "Your payment was canceled. Your order has not been processed.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [searchParams, navigate, toast]);

  if (processing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-bread-brown" />
              <h2 className="text-xl font-semibold">Processing Payment...</h2>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment with PayPal.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="h-12 w-12 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
                ✕
              </div>
              <h2 className="text-xl font-semibold">Payment Failed</h2>
              <p className="text-muted-foreground">
                There was an issue processing your payment. Please try again.
              </p>
              <Button onClick={() => navigate('/')} className="w-full">
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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