import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </Link>

        <PageHeader 
          title="Términos y Condiciones"
          subtitle="Última actualización: Enero 2025"
        />

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Aceptación de Términos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Al acceder y utilizar Clip to Click ("el Servicio"), aceptas estar sujeto a estos Términos y Condiciones. 
                Si no estás de acuerdo con alguna parte de estos términos, no debes usar el Servicio.
              </p>
              <p>
                Estos términos se aplican a todos los usuarios, incluyendo visitantes, estudiantes registrados, 
                y usuarios de la suscripción Dashboard Pro.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Descripción del Servicio</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Clip to Click ofrece los siguientes servicios:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Curso Completo:</strong> 8 módulos de formación en creación de contenido para redes sociales ($297 USD)</li>
                <li><strong>Dashboard Pro:</strong> Plataforma de analytics y planificación de contenido ($19 USD/mes, incluye 90 días gratis con el curso)</li>
                <li><strong>Comunidad Discord:</strong> Acceso de por vida a nuestra comunidad privada</li>
                <li><strong>Plantillas Notion:</strong> Herramientas de organización y planificación</li>
                <li><strong>Integraciones OAuth:</strong> Conexión opcional con Instagram, TikTok y Snapchat para analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Cuentas de Usuario y Elegibilidad</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Debes tener al menos 18 años de edad para usar el Servicio. Al crear una cuenta, garantizas que:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Toda la información que proporcionas es precisa y actual</li>
                <li>Mantendrás la seguridad de tu contraseña</li>
                <li>Eres responsable de toda actividad bajo tu cuenta</li>
                <li>No compartirás tu cuenta con otras personas</li>
              </ul>
              <p className="mt-3">
                Cada licencia del curso es para uso individual. No está permitido revender, redistribuir o 
                compartir el contenido del curso con terceros.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Pagos, Facturación y Reembolsos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p><strong>Curso Completo:</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pago único de $297 USD</li>
                <li>Acceso inmediato a todos los módulos</li>
                <li>Incluye 90 días gratis de Dashboard Pro</li>
              </ul>
              
              <p className="mt-4"><strong>Dashboard Pro (Suscripción):</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>$19 USD/mes, facturado mensualmente</li>
                <li>Se renueva automáticamente hasta que canceles</li>
                <li>Puedes cancelar en cualquier momento desde tu dashboard</li>
                <li>Mantienes acceso hasta el final del período pagado</li>
              </ul>

              <p className="mt-4">
                <strong>Política de Reembolsos:</strong> Consulta nuestra{" "}
                <Link to="/refund-policy" className="text-primary hover:underline">
                  Política de Reembolso
                </Link>{" "}
                para detalles completos sobre nuestra garantía de 30 días.
              </p>

              <p className="mt-3">
                Todos los pagos se procesan de forma segura a través de Stripe. 
                No almacenamos información de tarjetas de crédito.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Acceso al Curso y Contenido</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Al comprar el curso, obtienes acceso ilimitado de por vida al contenido, sujeto a:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Nos reservamos el derecho de actualizar el contenido sin previo aviso</li>
                <li>El acceso puede ser revocado si violas estos términos</li>
                <li>El contenido está protegido por derechos de autor</li>
                <li>No puedes descargar, copiar o redistribuir el contenido</li>
              </ul>
              <p className="mt-3">
                Hacemos nuestro mejor esfuerzo para mantener el servicio disponible, pero no garantizamos 
                disponibilidad ininterrumpida.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Propiedad Intelectual</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Todo el contenido del curso, incluyendo videos, plantillas, documentos y materiales, 
                es propiedad exclusiva de Clip to Click y está protegido por leyes de propiedad intelectual.
              </p>
              <p className="mt-3">
                <strong>Prohibido:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Reproducir, duplicar o copiar el contenido</li>
                <li>Vender, revender o explotar comercialmente el contenido</li>
                <li>Modificar o crear trabajos derivados del contenido</li>
                <li>Compartir tu acceso con terceros</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Integraciones OAuth y Redes Sociales</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Las integraciones con Instagram, TikTok y Snapchat son opcionales y requieren 
                que autorices el acceso a tus cuentas de redes sociales.
              </p>
              <p className="mt-3">
                Al conectar tus redes sociales:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Autorizas a Clip to Click a acceder a métricas y analytics públicos</li>
                <li>No accedemos a mensajes privados ni contenido no publicado</li>
                <li>Puedes desconectar las integraciones en cualquier momento</li>
                <li>Los tokens de acceso pueden expirar según las políticas de cada plataforma</li>
                <li>Eres responsable de cumplir con los términos de servicio de cada plataforma</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Resultados y Garantías</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                <strong>No garantizamos resultados específicos.</strong> El éxito en redes sociales depende de 
                múltiples factores incluyendo tu esfuerzo, consistencia, nicho, calidad de contenido y factores 
                externos fuera de nuestro control.
              </p>
              <p className="mt-3">
                Los testimonios y casos de éxito presentados son resultados reales de usuarios, pero no son 
                garantía de que obtendrás los mismos resultados.
              </p>
              <p className="mt-3">
                Las herramientas de IA (quiz, planes de contenido) son orientativas y no sustituyen tu 
                criterio profesional.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Limitación de Responsabilidad</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                En la máxima medida permitida por la ley, Clip to Click no será responsable por:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Pérdida de ganancias, datos o oportunidades comerciales</li>
                <li>Daños indirectos, incidentales o consecuentes</li>
                <li>Interrupciones del servicio o errores técnicos</li>
                <li>Acciones o políticas de terceros (Instagram, TikTok, Snapchat, Stripe)</li>
                <li>Resultados de tu estrategia de contenido</li>
              </ul>
              <p className="mt-3">
                Nuestra responsabilidad máxima se limita al monto que pagaste por el servicio.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Modificaciones a los Términos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                Los cambios importantes serán notificados por email o mediante aviso en la plataforma.
              </p>
              <p className="mt-3">
                El uso continuo del Servicio después de cambios en los términos constituye tu 
                aceptación de los nuevos términos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Terminación</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Podemos suspender o terminar tu acceso al Servicio si:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violas estos Términos y Condiciones</li>
                <li>Usas el servicio de manera fraudulenta o abusiva</li>
                <li>Compartes tu acceso con terceros</li>
                <li>Realizas actividades ilegales</li>
              </ul>
              <p className="mt-3">
                Tú puedes cancelar tu suscripción en cualquier momento desde tu dashboard.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>12. Ley Aplicable y Jurisdicción</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Estos términos se rigen por las leyes aplicables. Cualquier disputa se resolverá 
                mediante arbitraje o en los tribunales competentes.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Contacto</h3>
              <p className="text-muted-foreground mb-4">
                Si tienes preguntas sobre estos términos, contáctanos en:
              </p>
              <a 
                href="mailto:hola@cliptoclic.com" 
                className="text-primary hover:underline font-medium"
              >
                hola@cliptoclic.com
              </a>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Ver también:{" "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Política de Privacidad
                  </Link>
                  {" | "}
                  <Link to="/refund-policy" className="text-primary hover:underline">
                    Política de Reembolso
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          © {currentYear} Clip to Click. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default Terms;
