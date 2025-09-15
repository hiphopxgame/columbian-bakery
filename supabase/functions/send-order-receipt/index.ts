import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderReceiptRequest {
  orderId: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  productName: string;
  quantity: number;
  estimatedTotal: number;
  orderType: string;
  deliveryFormat: string;
  specialInstructions?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const orderData: OrderReceiptRequest = await req.json();

    console.log("Sending order receipt for:", orderData.orderId);

    const companyLine = orderData.companyName 
      ? `<p><strong>Company:</strong> ${orderData.companyName}</p>` 
      : '';

    const specialInstructionsSection = orderData.specialInstructions
      ? `
        <div style="margin-top: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #8B4513; border-radius: 4px;">
          <h3 style="color: #8B4513; margin-top: 0;">Special Instructions:</h3>
          <p style="margin-bottom: 0; white-space: pre-wrap;">${orderData.specialInstructions}</p>
        </div>
      `
      : '';

    const emailResponse = await resend.emails.send({
      from: "C'Bake Colombian Bakery <orders@cbake.lovable.app>",
      to: [orderData.email],
      subject: `Order Confirmation - ${orderData.productName} (Order #${orderData.orderId.slice(-8)})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Order Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #8B4513; margin-bottom: 10px;">¡Gracias por tu pedido!</h1>
            <p style="color: #666; font-size: 18px;">Thank you for your order!</p>
          </div>

          <div style="background-color: #FDF5E6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #8B4513; margin-top: 0;">Order Confirmation</h2>
            <p>Dear ${orderData.firstName} ${orderData.lastName},</p>
            <p>We've received your wholesale order and are excited to serve you! Here are your order details:</p>
          </div>

          <div style="background-color: #fff; border: 2px solid #F5DEB3; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #8B4513; margin-top: 0; border-bottom: 2px solid #F5DEB3; padding-bottom: 10px;">Order Details</h3>
            <p><strong>Order #:</strong> ${orderData.orderId.slice(-8)}</p>
            <p><strong>Customer:</strong> ${orderData.firstName} ${orderData.lastName}</p>
            ${companyLine}
            <p><strong>Product:</strong> ${orderData.productName}</p>
            <p><strong>Quantity:</strong> ${orderData.quantity} unit${orderData.quantity > 1 ? 's' : ''} (${orderData.quantity * 100} pieces total)</p>
            <p><strong>Format:</strong> ${orderData.deliveryFormat}</p>
            <p><strong>Estimated Total:</strong> $${orderData.estimatedTotal.toFixed(2)}</p>
          </div>

          ${specialInstructionsSection}

          <div style="background-color: #E6F3FF; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #8B4513; margin-top: 0;">What Happens Next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team will review your order within 24 hours</li>
              <li>We'll contact you to confirm availability and final pricing</li>
              <li>Once confirmed, we'll arrange payment and delivery/pickup</li>
              <li>Your frozen dough will be prepared fresh and ready for baking</li>
            </ul>
          </div>

          <div style="background-color: #F0F8FF; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #8B4513; margin-top: 0;">Contact Information</h3>
            <p>If you have any questions about your order, please contact us:</p>
            <p>
              📧 Email: orders@cbakebakery.com<br>
              📱 Phone: (503) 555-BAKE<br>
              🕒 Business Hours: Mon-Fri 6AM-4PM, Sat 7AM-2PM
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; margin-bottom: 10px;">
              <strong>C'Bake Colombian Bakery</strong><br>
              Authentic Colombian Frozen Dough & Pastries
            </p>
            <p style="color: #999; font-size: 14px;">
              Follow us on social media for updates and special offers!<br>
              Instagram: @cbakebakery | Facebook: C'Bake Colombian Bakery
            </p>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Order receipt email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: emailResponse.data?.id 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error sending order receipt:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);