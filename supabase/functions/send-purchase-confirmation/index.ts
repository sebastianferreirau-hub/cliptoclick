import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PurchaseConfirmationRequest {
  email: string;
  name: string;
  plan: string;
  amount: number;
  receiptUrl?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, plan, amount, receiptUrl }: PurchaseConfirmationRequest = await req.json();
    console.log('Sending purchase confirmation to:', email);

    const planName = plan === 'one_time' ? 'Pago Único' : '2 Pagos';
    
    const emailResponse = await resend.emails.send({
      from: "ClipCrafters <onboarding@resend.dev>",
      to: [email],
      subject: "¡Bienvenido a ClipCrafters! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center; }
              .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
              .content { padding: 40px 20px; }
              .purchase-card { background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0; }
              .purchase-card h2 { margin: 0 0 16px 0; font-size: 20px; color: #1f2937; }
              .detail-row { display: flex; justify-content: space-between; margin: 12px 0; }
              .detail-label { color: #6b7280; }
              .detail-value { font-weight: 600; color: #1f2937; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 24px 0; }
              .footer { background-color: #f9fafb; padding: 24px 20px; text-align: center; color: #6b7280; font-size: 14px; }
              .next-steps { background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin: 24px 0; }
              .next-steps h3 { margin: 0 0 12px 0; color: #1e40af; font-size: 16px; }
              .next-steps li { margin: 8px 0; color: #1f2937; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Bienvenido a ClipCrafters!</h1>
              </div>
              
              <div class="content">
                <p style="font-size: 16px; color: #1f2937;">Hola ${name},</p>
                
                <p style="font-size: 16px; color: #1f2937;">
                  ¡Gracias por unirte a ClipCrafters! Tu compra se ha procesado exitosamente. Estamos emocionados de tenerte en nuestra comunidad.
                </p>
                
                <div class="purchase-card">
                  <h2>Detalles de tu Compra</h2>
                  <div class="detail-row">
                    <span class="detail-label">Plan:</span>
                    <span class="detail-value">${planName}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Total:</span>
                    <span class="detail-value">$${amount.toFixed(2)} USD</span>
                  </div>
                  ${receiptUrl ? `
                  <div class="detail-row">
                    <span class="detail-label">Recibo:</span>
                    <span class="detail-value"><a href="${receiptUrl}" style="color: #667eea;">Ver Recibo</a></span>
                  </div>
                  ` : ''}
                </div>
                
                <div class="next-steps">
                  <h3>📋 Próximos Pasos</h3>
                  <ol style="margin: 0; padding-left: 20px;">
                    <li>Completa tu onboarding personalizado</li>
                    <li>Descubre tus Núcleos de Contenido</li>
                    <li>Accede al dashboard y comienza a crear</li>
                  </ol>
                </div>
                
                <div style="text-align: center;">
                  <a href="${Deno.env.get('BASE_URL') || 'https://clipcrafters.com'}/onboarding" class="cta-button">
                    Ir al Dashboard
                  </a>
                </div>
                
                <p style="font-size: 14px; color: #6b7280; margin-top: 32px;">
                  Si tienes alguna pregunta, no dudes en contactarnos respondiendo a este email.
                </p>
                
                <p style="font-size: 16px; color: #1f2937; margin-top: 24px;">
                  ¡Nos vemos dentro!<br>
                  <strong>El equipo de ClipCrafters</strong>
                </p>
              </div>
              
              <div class="footer">
                <p style="margin: 0 0 8px 0;">© 2025 ClipCrafters. Todos los derechos reservados.</p>
                <p style="margin: 0;">¿Necesitas ayuda? Escríbenos a support@clipcrafters.com</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-purchase-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
