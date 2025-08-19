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
    const { quoteData } = await req.json()

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Email to bakery owner
    const ownerEmailContent = `
      <h2>New Custom Quote Request</h2>
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${quoteData.name}</p>
      <p><strong>Email:</strong> ${quoteData.email}</p>
      <p><strong>Phone:</strong> ${quoteData.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${quoteData.company || 'Not provided'}</p>
      
      <h3>Event Details:</h3>
      <p><strong>Event Type:</strong> ${quoteData.eventType}</p>
      <p><strong>Guest Count:</strong> ${quoteData.guestCount}</p>
      <p><strong>Event Date:</strong> ${quoteData.eventDate}</p>
      <p><strong>Budget Range:</strong> ${quoteData.budget}</p>
      <p><strong>Preferred Flavors:</strong> ${quoteData.flavors}</p>
      <p><strong>Delivery Location:</strong> ${quoteData.deliveryLocation}</p>
      <p><strong>Setup Requirements:</strong> ${quoteData.setupRequirements}</p>
      
      ${quoteData.additionalDetails ? `<h3>Additional Details:</h3><p>${quoteData.additionalDetails.replace(/\n/g, '<br>')}</p>` : ''}
      
      <p><em>Please prepare a custom quote and respond promptly.</em></p>
    `

    // Email to customer
    const customerEmailContent = `
      <h2>Thank You for Your Custom Quote Request!</h2>
      <p>Dear ${quoteData.name},</p>
      
      <p>We've received your custom catering quote request and are excited to work with you! Here's a summary of your request:</p>
      
      <h3>Your Event Details:</h3>
      <p><strong>Event Type:</strong> ${quoteData.eventType}</p>
      <p><strong>Guest Count:</strong> ${quoteData.guestCount}</p>
      <p><strong>Event Date:</strong> ${quoteData.eventDate}</p>
      <p><strong>Budget Range:</strong> ${quoteData.budget}</p>
      <p><strong>Preferred Flavors:</strong> ${quoteData.flavors}</p>
      <p><strong>Delivery Location:</strong> ${quoteData.deliveryLocation}</p>
      
      ${quoteData.additionalDetails ? `<p><strong>Additional Details:</strong> ${quoteData.additionalDetails.replace(/\n/g, '<br>')}</p>` : ''}
      
      <p>Our catering team will review your request and prepare a customized quote for your event. We'll contact you within 48 hours with detailed pricing and options.</p>
      
      <p>Thank you for considering our Colombian Bombshells for your special event!</p>
      
      <p>Best regards,<br>
      The Colombian Bombshells Catering Team</p>
    `

    // Send email to bakery owner
    const ownerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'catering@yourdomain.com',
        to: ['your-bakery-email@example.com'], // Replace with actual bakery email
        subject: `New Custom Quote Request from ${quoteData.name}`,
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
        from: 'catering@yourdomain.com',
        to: [quoteData.email],
        subject: 'Custom Quote Request Received - Colombian Bombshells',
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
        message: 'Quote emails sent successfully',
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
    console.error('Error sending quote emails:', error)
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