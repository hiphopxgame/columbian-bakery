import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    })
  }

  try {
    const { orderData } = await req.json()

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Email to bakery owner
    const ownerEmailContent = `
      <h2>New Order Request Received</h2>
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${orderData.name}</p>
      <p><strong>Email:</strong> ${orderData.email}</p>
      <p><strong>Phone:</strong> ${orderData.phone || 'Not provided'}</p>
      
      <h3>Order Details:</h3>
      <p><strong>Order Type:</strong> ${orderData.orderType.replace('-', ' ')}</p>
      <p><strong>Quantity:</strong> ${orderData.quantity} ${orderData.orderType === 'retail' ? 'dozen' : 'unit'}${orderData.quantity > 1 ? 's' : ''}</p>
      <p><strong>Total Bombshells:</strong> ${orderData.orderType === 'retail' ? orderData.quantity * 13 : orderData.quantity * 100}</p>
      <p><strong>Dough Type:</strong> ${orderData.doughType}</p>
      <p><strong>Filling:</strong> ${orderData.filling}</p>
      <p><strong>Delivery Format:</strong> ${orderData.delivery}</p>
      <p><strong>Estimated Total:</strong> $${orderData.estimatedTotal}</p>
      
      ${orderData.specialInstructions ? `<h3>Special Instructions:</h3><p>${orderData.specialInstructions}</p>` : ''}
      
      <p><em>Please contact the customer within 24 hours to confirm availability and arrange payment.</em></p>
    `

    // Email to customer
    const customerEmailContent = `
      <h2>Thank You for Your Order Request!</h2>
      <p>Dear ${orderData.name},</p>
      
      <p>We've received your order request for our delicious Colombian Bombshells. Here's a summary of your order:</p>
      
      <h3>Your Order:</h3>
      <p><strong>Order Type:</strong> ${orderData.orderType.replace('-', ' ')}</p>
      <p><strong>Quantity:</strong> ${orderData.quantity} ${orderData.orderType === 'retail' ? 'dozen' : 'unit'}${orderData.quantity > 1 ? 's' : ''}</p>
      <p><strong>Total Bombshells:</strong> ${orderData.orderType === 'retail' ? orderData.quantity * 13 : orderData.quantity * 100}</p>
      <p><strong>Dough Type:</strong> ${orderData.doughType}</p>
      <p><strong>Filling:</strong> ${orderData.filling}</p>
      <p><strong>Delivery Format:</strong> ${orderData.delivery}</p>
      <p><strong>Estimated Total:</strong> $${orderData.estimatedTotal}</p>
      
      ${orderData.specialInstructions ? `<p><strong>Special Instructions:</strong> ${orderData.specialInstructions}</p>` : ''}
      
      <p>We'll contact you within 24 hours to confirm availability, finalize pricing, and arrange payment and delivery details.</p>
      
      <p>Thank you for choosing our authentic Colombian breads!</p>
      
      <p>Best regards,<br>
      The Colombian Bombshells Team</p>
    `

    // Send email to bakery owner
    const ownerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'orders@yourdomain.com',
        to: ['your-bakery-email@example.com'], // Replace with actual bakery email
        subject: `New Order Request from ${orderData.name}`,
        html: ownerEmailContent,
      }),
    })

    // Send confirmation email to customer
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'orders@yourdomain.com',
        to: [orderData.email],
        subject: 'Order Request Received - Colombian Bombshells',
        html: customerEmailContent,
      }),
    })

    const ownerResult = await ownerEmailResponse.json()
    const customerResult = await customerEmailResponse.json()

    if (!ownerEmailResponse.ok) {
      throw new Error(`Failed to send owner email: ${JSON.stringify(ownerResult)}`)
    }

    if (!customerEmailResponse.ok) {
      throw new Error(`Failed to send customer email: ${JSON.stringify(customerResult)}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Order emails sent successfully',
        ownerEmailId: ownerResult.id,
        customerEmailId: customerResult.id
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )

  } catch (error) {
    console.error('Error sending order emails:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    )
  }
})