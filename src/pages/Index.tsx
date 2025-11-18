import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Shield,
  TrendingUp,
  GraduationCap,
  Sparkles,
  LayoutDashboard
} from "lucide-react";
import { BRAND, PRICING, COPY } from "@/lib/constants";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-heading gradient-text mb-2">
              {BRAND.name}
            </h1>
            <p className="text-sm text-muted-foreground">{BRAND.fullName}</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
            {COPY.hero.headline}
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            {COPY.hero.subheadline}
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success">363M</div>
              <div className="text-sm text-muted-foreground">Impresiones en 90 días</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success">150+</div>
              <div className="text-sm text-muted-foreground">Creadores activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-success">8h</div>
              <div className="text-sm text-muted-foreground">Ahorradas por semana</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-white px-8 py-6 text-lg font-semibold w-full sm:w-auto shadow-glow"
              onClick={() => window.location.href = "/checkout"}
            >
              {COPY.cta.primary}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-6 text-lg w-full sm:w-auto"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {COPY.cta.secondary}
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm text-warning font-medium">
              {COPY.cta.primaryUrgency}
            </span>
          </div>

          <blockquote className="mt-16 border-l-4 border-primary pl-6 italic text-left max-w-2xl mx-auto">
            <p className="text-muted-foreground text-lg mb-4">"{COPY.hero.founderQuote.text}"</p>
            <cite className="text-muted-foreground/70 not-italic text-sm">
              — {COPY.hero.founderQuote.author}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-heading mb-4">
              {COPY.socialProof.headline}
            </h3>
            <p className="text-xl text-muted-foreground">
              {COPY.socialProof.subheadline}
            </p>
            <p className="text-sm text-muted-foreground/70 mt-4">
              {COPY.socialProof.disclaimer}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Instagram</CardTitle>
                <p className="text-muted-foreground text-sm">@ferenloscielos</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded mb-4 flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <p className="text-sm">
                  De 15K a 40K seguidores en 90 días. 50K+ views/reel promedio.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>TikTok</CardTitle>
                <p className="text-muted-foreground text-sm">@mariaclaudiaql</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded mb-4 flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <p className="text-sm">
                  De 500 a 12K seguidores en 60 días. Cuenta fantasma → audiencia real.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Multi-canal</CardTitle>
                <p className="text-muted-foreground text-sm">@sebasferreirauu</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded mb-4 flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <p className="text-sm">
                  +120M impresiones en Q1 2025. Fundador aplicando el método.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              El sistema que elimina el caos creativo
            </h3>
            <p className="text-xl text-muted-foreground">
              3 pasos. Sin improvisación. Sin depender de 'inspiración'.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card p-8 text-center relative hover:shadow-elegant transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow">
                1
              </div>
              <div className="p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-4 mt-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-3">Aprende el método probado</h4>
              <p className="text-muted-foreground mb-4">
                8 módulos que enseñan exactamente qué grabar, cómo editarlo en minutos (no horas), y cómo publicar sin quemarte
              </p>
              <div className="flex items-start gap-2 text-destructive text-sm">
                <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>Sin esto: Grabas todo el día sin saber qué usar. Editas 3 horas para 1 video.</p>
              </div>
            </Card>

            <Card className="glass-card p-8 text-center relative hover:shadow-elegant transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow">
                2
              </div>
              <div className="p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-4 mt-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-3">IA detecta tus verticales en 30 min</h4>
              <p className="text-muted-foreground mb-4">
                Quiz de 7 preguntas que analiza tu perfil y genera 3 verticales de contenido + plan de publicación de 7 días
              </p>
              <div className="flex items-start gap-2 text-destructive text-sm">
                <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>Sin esto: Pruebas 20 temas diferentes. Ninguno pega. Pierdes 6 meses.</p>
              </div>
            </Card>

            <Card className="glass-card p-8 text-center relative hover:shadow-elegant transition-all">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow">
                3
              </div>
              <div className="p-4 rounded-xl bg-primary/10 w-fit mx-auto mb-4 mt-4">
                <LayoutDashboard className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-3">Dashboard te mantiene on track</h4>
              <p className="text-muted-foreground mb-4">
                Organiza clips, conecta Notion, mide qué funciona y qué no. Todo en un lugar. Sin perderte en 15 apps.
              </p>
              <div className="flex items-start gap-2 text-destructive text-sm">
                <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>Sin esto: Clips en el celular. Ideas en notas. Métricas olvidadas. Caos total.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              Lo que obtienes hoy (no hay upsells ocultos)
            </h3>
            <p className="text-xl text-muted-foreground">
              Un pago. Acceso completo. Sin sorpresas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between">
                  <span>Quiz IA de Content Cores</span>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    $497 valor
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Descubre tus 3 verticales + 20 ángulos de contenido en 30 min
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between">
                  <span>Plan de 7 días personalizado</span>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    8h ahorro/mes
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  IA genera tu calendario de publicación. Solo ejecutas.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between">
                  <span>Dashboard operativo (90 días gratis)</span>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    $171 ahorro
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Organiza clips, conecta Notion/Drive, mide impresiones. Después $19/mes (opcional)
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between">
                  <span>Sistema Notion completo</span>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    20h setup
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Plantilla probada: banco de ideas, clips, inspos, calendario. Copy-paste y listo.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between">
                  <span>Comunidad Discord (de por vida)</span>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    $97/mes valor
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  150+ creadores compartiendo qué funciona. Feedback en &lt;48h. Leaderboards semanales.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl flex items-start justify-between">
                  <span>Curso completo (8 módulos)</span>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    12h contenido
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clipping, edición rápida (ritmo 0.6s), distribución multi-plataforma, análisis de datos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              Una decisión hoy. Un sistema para siempre.
            </h3>
            <p className="text-xl text-muted-foreground">
              Sin cohortes. Sin esperas. Empieza en 5 minutos.
            </p>
          </div>

          <Card className="glass-card relative overflow-hidden border-primary/50">
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-primary text-white">
                Recomendado para creadores serios
              </Badge>
            </div>

            <CardHeader className="text-center pt-12 pb-8">
              <div className="mb-4">
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2">
                  ${PRICING.course.price}
                </div>
                <p className="text-muted-foreground">Pago único</p>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>✓ Curso completo (8 módulos, 12 horas)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>✓ Quiz IA + Plan de 7 días generado</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>✓ Dashboard operativo (90 días gratis, después $19/mes opcional)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>✓ Plantilla Notion + recursos descargables</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>✓ Comunidad Discord (acceso de por vida)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span>✓ Sesiones grupales de feedback (&lt;48h response)</span>
                </div>
              </div>

              <Button 
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-lg font-semibold shadow-glow"
                onClick={() => window.location.href = "/checkout"}
              >
                Conseguir acceso completo ahora
              </Button>

              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2">
                  <Clock className="w-4 h-4 text-warning" />
                  <span className="text-sm text-warning font-medium">
                    47 spots restantes este mes
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-muted/50 rounded-lg p-4">
                <Shield className="w-6 h-6 text-success flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">
                    Garantía de 30 días (ver detalles abajo)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantee */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-card">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-success" />
                </div>
              </div>
              <CardTitle className="text-3xl mb-4">
                {COPY.guarantee.title}
              </CardTitle>
              <p className="text-xl text-muted-foreground">
                {COPY.guarantee.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {COPY.guarantee.detailsList.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="mb-3">
                  <strong>Por qué pedimos esto:</strong>
                </p>
                <p className="text-muted-foreground text-sm">
                  {COPY.guarantee.reasoning}
                </p>
              </div>

              <div className="bg-warning/10 rounded-lg p-4 border border-warning/30">
                <p className="text-warning text-sm">
                  <strong>Advertencia:</strong> {COPY.guarantee.disclaimer}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              Preguntas que todos hacen (respuestas directas)
            </h3>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="glass-card px-6 rounded-xl border-none">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">¿Necesito cámara profesional o puedo empezar con mi celular?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                iPhone 11+ (o Android equivalente) es suficiente. De hecho, el 90% de contenido viral se graba con celular. No gastes en cámara hasta que domines el sistema.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="glass-card px-6 rounded-xl border-none">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">No sé editar. ¿Esto es para mí?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                Sí. Enseñamos edición desde cero. El método está diseñado para que alguien que nunca editó pueda crear videos en 15 minutos después de Módulo 2.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="glass-card px-6 rounded-xl border-none">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">Ya probé otros cursos de contenido. ¿Qué hace este diferente?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                La mayoría de cursos enseñan teoría ('sé auténtico', 'publica consistente'). Nosotros damos el sistema operativo: qué grabar, cómo organizarlo, cómo medir. Y tenemos los números para probarlo (363M views en 90 días).
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="glass-card px-6 rounded-xl border-none">
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold">¿Cuánto tiempo necesito por semana para ver resultados?</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                Semana 1-2: 5 horas (setup + aprender método). Semana 3+: 3 horas/semana (1 hora grabar, 2 horas editar/publicar). Si no tienes 3 horas/semana, este no es el momento para ti.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              Dos caminos desde aquí
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card border-destructive/50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <XCircle className="w-6 h-6 text-destructive" />
                  Seguir improvisando
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg">
                  Grabas cuando 'te inspiras'. Editas sin sistema. Publicas cuando 'sale algo bueno'. En 6 meses sigues igual: inconsistente, frustrado, sin clarity.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-success/50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-gradient-primary text-white">
                  Opción inteligente
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                  Conseguir el sistema hoy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg">
                  En 8 semanas dominas clipping, edición rápida, distribución multi-plataforma. En 3 meses publicas 60+ piezas sin burnout. En 6 meses tienes un sistema que escala solo.
                </p>
                
                <Button
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-lg font-semibold shadow-glow"
                  onClick={() => window.location.href = "/checkout"}
                >
                  Conseguir acceso — $297
                </Button>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning font-medium">
                      47 spots restantes
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-muted/30 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-muted-foreground text-sm mb-4">
              {BRAND.fullName} · {BRAND.principles.join(" · ")}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <a href="/terms" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Términos y condiciones
            </a>
            <a href="/privacy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Política de privacidad
            </a>
            <a href="/refund-policy" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Política de reembolso
            </a>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground/70 text-sm">
              © 2025 {BRAND.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
