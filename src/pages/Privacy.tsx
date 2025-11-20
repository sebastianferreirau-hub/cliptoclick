import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Database, Lock, Eye, UserCheck } from "lucide-react";

const Privacy = () => {
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
          title="Política de Privacidad"
          subtitle="Última actualización: Enero 2025"
        />

        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Tu privacidad es importante</h3>
                <p className="text-sm text-muted-foreground">
                  Esta política explica qué información recopilamos, cómo la usamos, y tus derechos 
                  sobre tus datos personales. Nos tomamos la seguridad de tus datos muy en serio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                1. Información que Recopilamos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="account-info">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      Información de Cuenta
                      <Badge variant="secondary">Obligatorio</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2">
                    <p>Cuando creas una cuenta, recopilamos:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Dirección de email</li>
                      <li>Nombre completo</li>
                      <li>País de residencia</li>
                      <li>Idioma preferido</li>
                      <li>Contraseña (almacenada de forma encriptada)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="oauth-data">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      Datos de OAuth (Redes Sociales)
                      <Badge variant="outline">Opcional</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2">
                    <p>Si decides conectar tus redes sociales, recopilamos:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li><strong>Instagram:</strong> Token de acceso, ID de cuenta, métricas públicas (impresiones, engagement, alcance)</li>
                      <li><strong>TikTok:</strong> Token de acceso, ID de usuario, estadísticas de videos públicos</li>
                      <li><strong>Snapchat:</strong> Token de acceso, ID de cuenta, métricas de Spotlight</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      <strong>Nota importante:</strong> Solo accedemos a métricas y estadísticas públicas. 
                      NO accedemos a mensajes privados, contenido no publicado, ni información de contactos.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="analytics">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      Analytics de Contenido
                      <Badge variant="outline">Opcional</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2">
                    <p>Cuando usas el Dashboard Pro, almacenamos:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Métricas de rendimiento de tus publicaciones (vistas, likes, shares, comentarios)</li>
                      <li>Información que tú ingresas manualmente sobre tus posts</li>
                      <li>Puntuaciones y análisis generados por nuestro sistema</li>
                    </ul>
                    <p className="mt-3 text-sm">
                      No almacenamos el contenido real de tus videos o imágenes, solo las métricas asociadas.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment">
                  <AccordionTrigger>
                    <span className="flex items-center gap-2">
                      Información de Pago
                      <Badge variant="secondary">Procesado por Stripe</Badge>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2">
                    <p>Cuando realizas un pago:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Stripe procesa y almacena tu información de tarjeta de forma segura</li>
                      <li>Nosotros solo recibimos: ID de cliente, ID de transacción, monto, estado del pago</li>
                      <li><strong>NO almacenamos números de tarjeta ni CVV</strong></li>
                    </ul>
                    <p className="mt-3 text-sm">
                      Para más información, consulta la{" "}
                      <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Política de Privacidad de Stripe
                      </a>
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="course-progress">
                  <AccordionTrigger>
                    Progreso del Curso y Contenido del Usuario
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2">
                    <p>Para mejorar tu experiencia de aprendizaje, rastreamos:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Lecciones completadas y tiempo de visualización</li>
                      <li>Notas y comentarios que dejes en las lecciones</li>
                      <li>Resultados del quiz de Content Cores</li>
                      <li>Planes de contenido generados por IA</li>
                      <li>Ideas y referencias que guardes en tu biblioteca</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technical">
                  <AccordionTrigger>
                    Información Técnica y de Uso
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground space-y-2">
                    <p>Automáticamente recopilamos:</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Dirección IP y ubicación aproximada</li>
                      <li>Tipo de dispositivo y navegador</li>
                      <li>Páginas visitadas y tiempo de navegación</li>
                      <li>Cookies de sesión (necesarias para el funcionamiento del sitio)</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                2. Cómo Usamos tu Información
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Usamos la información recopilada para:</p>
              
              <div className="space-y-4 mt-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Proveer el Servicio</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Crear y gestionar tu cuenta</li>
                    <li>Procesar pagos y gestionar suscripciones</li>
                    <li>Mostrar analytics y métricas en el dashboard</li>
                    <li>Generar recomendaciones de contenido con IA</li>
                    <li>Guardar tu progreso en el curso</li>
                  </ul>
                </div>

                <div className="border-l-4 border-secondary pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Mejorar la Experiencia</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Personalizar el contenido y recomendaciones</li>
                    <li>Analizar patrones de uso para mejorar la plataforma</li>
                    <li>Solucionar problemas técnicos</li>
                    <li>Desarrollar nuevas funcionalidades</li>
                  </ul>
                </div>

                <div className="border-l-4 border-accent pl-4">
                  <h4 className="font-semibold text-foreground mb-1">Comunicaciones</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>Enviar confirmaciones de compra y recibos</li>
                    <li>Notificaciones importantes sobre tu cuenta</li>
                    <li>Actualizaciones del curso y nuevas lecciones</li>
                    <li>Emails educativos (puedes darte de baja en cualquier momento)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                3. Compartir Información con Terceros
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p className="font-semibold text-foreground">
                No vendemos tus datos personales a terceros. Nunca.
              </p>
              
              <p className="mt-4">Compartimos información solo con:</p>
              
              <div className="space-y-3 mt-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Proveedores de Servicios</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li><strong>Supabase/Lovable Cloud:</strong> Almacenamiento de base de datos</li>
                    <li><strong>Stripe:</strong> Procesamiento de pagos</li>
                    <li><strong>Vimeo:</strong> Hosting de videos del curso</li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Plataformas OAuth</h4>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li><strong>Meta/Instagram:</strong> Solo cuando conectas tu cuenta</li>
                    <li><strong>TikTok:</strong> Solo cuando conectas tu cuenta</li>
                    <li><strong>Snap Inc.:</strong> Solo cuando conectas tu cuenta</li>
                  </ul>
                  <p className="text-xs mt-2">
                    Estas plataformas tienen sus propias políticas de privacidad que debes revisar.
                  </p>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Obligaciones Legales</h4>
                  <p className="text-sm">
                    Podemos divulgar información si es requerido por ley, orden judicial, o para 
                    proteger nuestros derechos legales.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                4. Seguridad de Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Implementamos medidas de seguridad para proteger tu información:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Encriptación SSL/TLS:</strong> Todas las comunicaciones están encriptadas</li>
                <li><strong>Contraseñas hasheadas:</strong> Nunca almacenamos contraseñas en texto plano</li>
                <li><strong>Row Level Security (RLS):</strong> Cada usuario solo puede acceder a sus propios datos</li>
                <li><strong>Tokens OAuth encriptados:</strong> Los tokens de acceso se almacenan de forma segura</li>
                <li><strong>Monitoreo continuo:</strong> Detectamos y respondemos a amenazas de seguridad</li>
              </ul>
              <p className="mt-4 text-sm bg-muted/30 p-3 rounded">
                <strong>Nota:</strong> Ningún sistema es 100% seguro. Aunque tomamos todas las precauciones, 
                no podemos garantizar seguridad absoluta.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                5. Tus Derechos
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Tienes los siguientes derechos sobre tus datos personales:</p>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Acceso</h4>
                    <p className="text-sm">Puedes ver todos tus datos desde tu dashboard</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Corrección</h4>
                    <p className="text-sm">Actualiza tu perfil y datos en cualquier momento</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Eliminación</h4>
                    <p className="text-sm">Solicita la eliminación de tu cuenta y todos tus datos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Desconectar OAuth</h4>
                    <p className="text-sm">Revoca el acceso a tus redes sociales desde el dashboard</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Exportar Datos</h4>
                    <p className="text-sm">Solicita una copia de todos tus datos en formato legible</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-primary">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Cancelar Suscripción</h4>
                    <p className="text-sm">Cancela Dashboard Pro desde tu panel de configuración</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm bg-primary/10 p-3 rounded">
                Para ejercer estos derechos, contáctanos en{" "}
                <a href="mailto:hola@cliptoclick.com" className="text-primary hover:underline font-medium">
                  hola@cliptoclick.com
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies y Tecnologías Similares</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Usamos cookies esenciales para:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Mantener tu sesión activa</li>
                <li>Recordar tus preferencias de idioma</li>
                <li>Mejorar el rendimiento del sitio</li>
              </ul>
              <p className="mt-3 text-sm">
                No usamos cookies de terceros para publicidad o tracking invasivo.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Retención de Datos</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>Mantenemos tus datos mientras:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Tu cuenta esté activa</li>
                <li>Sea necesario para proporcionar el servicio</li>
                <li>Sea requerido por obligaciones legales o fiscales</li>
              </ul>
              <p className="mt-3">
                Si solicitas la eliminación de tu cuenta, borraremos tus datos dentro de 30 días, 
                excepto la información que debamos retener por ley.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Privacidad de Menores</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Nuestro servicio está dirigido a personas mayores de 18 años. No recopilamos 
                intencionalmente información de menores de edad.
              </p>
              <p className="mt-3">
                Si descubrimos que hemos recopilado datos de un menor sin consentimiento parental, 
                eliminaremos esa información inmediatamente.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Transferencias Internacionales</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Tus datos pueden ser transferidos y almacenados en servidores ubicados fuera de tu país. 
                Nos aseguramos de que estos proveedores cumplan con estándares de protección de datos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Cambios a esta Política</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Podemos actualizar esta política ocasionalmente. Los cambios importantes serán 
                notificados por email o mediante un aviso destacado en la plataforma.
              </p>
              <p className="mt-3">
                La fecha de "Última actualización" al inicio de esta página indica cuándo se 
                realizó el cambio más reciente.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Contacto sobre Privacidad</h3>
              <p className="text-muted-foreground mb-4">
                Si tienes preguntas, inquietudes o solicitudes sobre esta política de privacidad 
                o el manejo de tus datos personales, contáctanos:
              </p>
              <a 
                href="mailto:hola@cliptoclick.com" 
                className="text-primary hover:underline font-medium"
              >
                hola@cliptoclick.com
              </a>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Ver también:{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Términos y Condiciones
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

export default Privacy;
