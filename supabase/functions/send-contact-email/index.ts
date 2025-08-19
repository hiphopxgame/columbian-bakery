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
    const { contactData } = await req.json()

    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set')
    }

    // Email to bakery owner
    const ownerEmailContent = `
      <h2>New Contact Form Submission</h2>
      <h3>Customer Information:</h3>
      <p><strong>Name:</strong> ${contactData.name}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Inquiry Type:</strong> ${contactData.inquiryType}</p>
      
      <h3>Message:</h3>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      
      <p><em>Please respond to this inquiry promptly.</em></p>
    `

    // Email to customer
    const customerEmailContent = `
      <h2>Thank You for Contacting Us!</h2>
      <p>Dear ${contactData.name},</p>
      
      <p>We've received your message and will get back to you soon. Here's a copy of what you sent:</p>
      
      <h3>Your Message:</h3>
      <p><strong>Inquiry Type:</strong> ${contactData.inquiryType}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message.replace(/\n/g, '<br>')}</p>
      
      <p>We typically respond within 24 hours. Thank you for your interest in our Colombian Bombshells!</p>
      
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
        from: 'contact@gavabombshellpdx.com',
        to: ['gavabombshellpdx@gmail.com'],
        subject: `New Contact Form Submission from ${contactData.name}`,
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
        from: 'contact@gavabombshellpdx.com',
        to: [contactData.email],
        subject: 'Message Received - Colombian Bombshells',
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
        message: 'Contact emails sent successfully',
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
    console.error('Error sending contact emails:', error)
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