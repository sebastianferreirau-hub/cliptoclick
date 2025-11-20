import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, Clock, Mail } from "lucide-react";

const RefundPolicy = () => {
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
          title="Política de Reembolso"
          subtitle="Garantía de 30 días con condiciones transparentes"
        />

        <Card className="mb-6 border-success/20 bg-success/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Nuestra Garantía</h3>
                <p className="text-sm text-muted-foreground">
                  Ofrecemos una garantía de 30 días porque confiamos en la calidad de nuestro curso. 
                  Sin embargo, para evitar abusos, esta garantía requiere que demuestres esfuerzo real 
                  en completar el programa.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Garantía del Curso Completo ($297)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Si compras el curso completo y cumples con las condiciones, puedes solicitar un 
                reembolso completo dentro de los primeros 30 días.
              </p>

              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <h4 className="font-semibold">Condiciones para Reembolso:</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">1</Badge>
                    <div>
                      <p className="text-sm font-medium">Completa al menos 6 de 8 módulos del curso</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Queremos asegurarnos de que realmente probaste el contenido antes de decidir
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">2</Badge>
                    <div>
                      <p className="text-sm font-medium">Completa el quiz de Content Cores</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Esto demuestra que hiciste el ejercicio fundamental del curso
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">3</Badge>
                    <div>
                      <p className="text-sm font-medium">Solicita dentro de 30 días desde la compra</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Después de este período, el acceso de por vida no es reembolsable
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="mt-1">4</Badge>
                    <div>
                      <p className="text-sm font-medium">Explica brevemente por qué no funcionó para ti</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Esto nos ayuda a mejorar el curso para futuros estudiantes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-success/10 p-4 rounded-lg border border-success/20">
                <p className="text-sm font-medium mb-2">¿Por qué estas condiciones?</p>
                <p className="text-sm text-muted-foreground">
                  Estas condiciones aseguran que solo las personas que realmente intentaron 
                  implementar el contenido pidan un reembolso. Si hiciste el trabajo y aún así 
                  no viste valor, con gusto te devolvemos tu dinero.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Dashboard Pro ($19/mes) - Política de Cancelación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Dashboard Pro es una suscripción mensual que puedes cancelar en cualquier momento.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    <h4 className="font-semibold">Puedes:</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                    <li>• Cancelar en cualquier momento</li>
                    <li>• Mantener acceso hasta fin del período pagado</li>
                    <li>• Reactivar cuando quieras</li>
                  </ul>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-destructive" />
                    <h4 className="font-semibold">No ofrecemos:</h4>
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-7">
                    <li>• Reembolsos prorrateados</li>
                    <li>• Reembolsos parciales de meses ya pagados</li>
                    <li>• Créditos por tiempo no usado</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                <p className="text-sm font-medium mb-2">90 días gratis con el curso</p>
                <p className="text-sm text-muted-foreground">
                  Si compras el curso completo, obtienes 90 días gratis de Dashboard Pro. 
                  Después de este período, tu tarjeta será cargada automáticamente $19 USD/mes 
                  a menos que canceles antes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Cómo Solicitar un Reembolso
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Envía un email</h4>
                    <p className="text-sm text-muted-foreground">
                      Escribe a{" "}
                      <a href="mailto:hola@cliptoclic.com" className="text-primary hover:underline">
                        hola@cliptoclic.com
                      </a>{" "}
                      con el asunto "Solicitud de Reembolso"
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Incluye la información requerida</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Email de tu cuenta</li>
                      <li>• Fecha de compra</li>
                      <li>• ID de transacción (si lo tienes)</li>
                      <li>• Breve explicación de por qué solicitas el reembolso</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Verificamos tu progreso</h4>
                    <p className="text-sm text-muted-foreground">
                      Revisaremos tu cuenta para confirmar que cumples con las condiciones 
                      (módulos completados, quiz realizado)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-primary">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Procesamiento</h4>
                    <p className="text-sm text-muted-foreground">
                      Si todo está en orden, procesaremos el reembolso dentro de 3-5 días hábiles. 
                      El dinero llegará a tu cuenta original en 5-10 días hábiles adicionales, 
                      dependiendo de tu banco.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-muted/30 p-4 rounded-lg">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  <strong>Tiempo de respuesta:</strong> Respondemos todas las solicitudes dentro de 48 horas
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                Qué NO se Reembolsa
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p className="font-medium text-foreground mb-3">
                No ofrecemos reembolsos en los siguientes casos:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Compras mayores a 30 días</p>
                    <p className="text-sm">
                      Después del período de garantía, el acceso es de por vida y no reembolsable
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">No completaste los requisitos</p>
                    <p className="text-sm">
                      Si no completaste al menos 6 módulos y el quiz de Content Cores
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Dashboard Pro después de 90 días gratis</p>
                    <p className="text-sm">
                      Una vez que empiezas a pagar $19/mes, no hay reembolsos (pero puedes cancelar)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">"No tuve resultados"</p>
                    <p className="text-sm">
                      No garantizamos resultados específicos en redes sociales. Los resultados dependen 
                      de tu esfuerzo, consistencia y factores externos
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Violación de términos</p>
                    <p className="text-sm">
                      Si compartiste tu cuenta, violaste derechos de autor, o abusaste del servicio
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-foreground">Promociones o descuentos especiales</p>
                    <p className="text-sm">
                      Los códigos de descuento o precios promocionales pueden tener condiciones diferentes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Situaciones Especiales</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Problemas técnicos graves</h4>
                <p className="text-sm">
                  Si experimentas problemas técnicos que te impiden acceder al curso por más de 72 horas, 
                  contáctanos inmediatamente. Evaluaremos cada caso individualmente.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Contenido no cumple expectativas</h4>
                <p className="text-sm">
                  Antes de solicitar un reembolso, agenda una sesión de feedback. A veces podemos resolver 
                  tus inquietudes o mostrarte cómo aprovechar mejor el contenido.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Compras duplicadas</h4>
                <p className="text-sm">
                  Si compraste accidentalmente dos veces, contáctanos inmediatamente para un reembolso 
                  completo de la compra duplicada.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold text-foreground mb-1">
                  ¿Puedo pedir reembolso si solo vi 1-2 módulos?
                </p>
                <p className="text-sm text-muted-foreground">
                  No. Necesitas completar al menos 6 de 8 módulos para demostrar que realmente probaste 
                  el programa antes de decidir que no es para ti.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">
                  ¿Qué pasa con mi acceso a Discord después del reembolso?
                </p>
                <p className="text-sm text-muted-foreground">
                  Perderás acceso a la comunidad Discord y a todos los materiales del curso. 
                  El acceso "de por vida" termina con el reembolso.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">
                  ¿Cuánto tarda en llegar el dinero?
                </p>
                <p className="text-sm text-muted-foreground">
                  Una vez aprobada, procesamos el reembolso en 3-5 días hábiles. Tu banco puede tardar 
                  5-10 días adicionales en reflejar el dinero en tu cuenta.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">
                  ¿Puedo volver a comprar después de un reembolso?
                </p>
                <p className="text-sm text-muted-foreground">
                  Sí, pero solo se permite una garantía por persona. Si vuelves a comprar, 
                  no habrá opción de reembolso.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">¿Tienes dudas sobre reembolsos?</h3>
              <p className="text-muted-foreground mb-4">
                Si tienes preguntas antes de solicitar un reembolso, escríbenos y con gusto 
                aclaramos cualquier duda:
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
                  <Link to="/terms" className="text-primary hover:underline">
                    Términos y Condiciones
                  </Link>
                  {" | "}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Política de Privacidad
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

export default RefundPolicy;
