import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function capturePayPalPayment(paypalOrderId: string) {
  const clientId = Deno.env.get('PAYPAL_CLIENT_ID');
  const clientSecret = Deno.env.get('PAYPAL_CLIENT_SECRET');
  
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  // Get access token
  const auth = btoa(`${clientId}:${clientSecret}`);
  const tokenResponse = await fetch('https://api-m.paypal.com/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const tokenData = await tokenResponse.json();
  
  if (!tokenResponse.ok) {
    throw new Error(`PayPal token error: ${tokenData.error_description}`);
  }

  // Capture payment
  const captureResponse = await fetch(`https://api-m.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${tokenData.access_token}`,
      'Content-Type': 'application/json',
    },
  });

  const captureResult = await captureResponse.json();
  
  if (!captureResponse.ok) {
    throw new Error(`PayPal capture error: ${JSON.stringify(captureResult)}`);
  }

  return captureResult;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { paypalOrderId, orderId } = await req.json();

    const paypalResult = await capturePayPalPayment(paypalOrderId);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Update order status in database
    const { error: updateError } = await supabase
      .from('cbake_orders')
      .update({ 
        status: 'paid',
        estimated_total: parseFloat(paypalResult.purchase_units[0].payments.captures[0].amount.value)
      })
      .eq('id', orderId);

    if (updateError) {
      throw new Error(`Database update error: ${updateError.message}`);
    }

    // Create payment record
    const { error: paymentError } = await supabase
      .from('payments')
      .insert({
        amount: Math.round(parseFloat(paypalResult.purchase_units[0].payments.captures[0].amount.value) * 100), // Store in cents
        customer_name: paypalResult.payer.name.given_name + ' ' + paypalResult.payer.name.surname,
        customer_email: paypalResult.payer.email_address,
        currency: paypalResult.purchase_units[0].payments.captures[0].amount.currency_code.toLowerCase(),
        status: 'completed',
        service_type: 'bakery_order'
      });

    if (paymentError) {
      console.error('Payment record creation error:', paymentError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        paypalResult,
        message: 'Payment captured successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error capturing PayPal payment:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});