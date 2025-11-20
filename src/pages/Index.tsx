import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, XCircle, Clock, Shield, TrendingUp, GraduationCap, Sparkles, LayoutDashboard, PlayCircle, Zap, Calendar, FileText, Users as UsersIcon } from "lucide-react";
import { BRAND, PRICING, COPY } from "@/lib/constants";
import Hero from "@/components/landing/Hero";
import SocialProof from "@/components/landing/SocialProof";
import HowItWorks from "@/components/landing/HowItWorks";
import IncludesGrid from "@/components/landing/IncludesGrid";
import AgendaTimeline from "@/components/landing/AgendaTimeline";
import PricingBox from "@/components/landing/PricingBox";
import GuaranteeBox from "@/components/landing/GuaranteeBox";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-heading gradient-text mb-2">
              {BRAND.name}
            </h1>
            <p className="text-sm text-muted-foreground">{BRAND.fullName}</p>
          </div>

          <h2 className="text-4xl md:text-6xl font-heading mb-6 leading-tight">
            {COPY.hero.headline}
          </h2>

          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed max-w-4xl mx-auto">
            {COPY.hero.subheadline}
          </p>

          {/* Social Proof Numbers */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-success">363M</div>
              <div className="text-sm text-muted-foreground mt-1">Impresiones en 90 días</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text">150+</div>
              <div className="text-sm text-muted-foreground mt-1">Creadores activos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent">8h</div>
              <div className="text-sm text-muted-foreground mt-1">Ahorradas por semana</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-white px-10 py-6 text-lg font-semibold shadow-glow w-full sm:w-auto" onClick={() => window.location.href = "/checkout"}>
              {COPY.cta.primary}
            </Button>
            <Button size="lg" variant="outline" className="border-2 px-10 py-6 text-lg font-semibold w-full sm:w-auto" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              {COPY.cta.secondary}
            </Button>
          </div>

          {/* Urgency */}
          <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-5 py-2.5">
            <Clock className="w-4 h-4 text-warning" />
            <span className="text-sm text-warning font-medium">
              {COPY.cta.primaryUrgency}
            </span>
          </div>

          {/* Founder Quote */}
          <blockquote className="mt-16 border-l-4 border-primary pl-6 italic text-left max-w-3xl mx-auto bg-card rounded-r-lg p-6 shadow-card">
            <p className="text-foreground text-lg mb-4">"{COPY.hero.founderQuote.text}"</p>
            <cite className="text-muted-foreground not-italic text-sm font-medium">
              — {COPY.hero.founderQuote.author}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* PHASE 1: Enhanced Social Proof Section */}
      <section className="px-4 py-20 bg-card">
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

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-border hover:border-primary/50 hover:shadow-elegant transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Instagram</span>
                  <TrendingUp className="w-5 h-5 text-success" />
                </CardTitle>
                <p className="text-muted-foreground text-sm">@ferenloscielos</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4 flex items-center justify-center relative group-hover:scale-105 transition-transform overflow-hidden">
                  <PlayCircle className="w-16 h-16 text-primary/60" />
                </div>
                <p className="text-foreground text-sm leading-relaxed">
                  De 3K a 24K seguidores en 30 días. 50K+ views/reel promedio. <strong>3K a 24K seguidores</strong> en 90 días. <strong>50K+ views/reel</strong> promedio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary/50 hover:shadow-elegant transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>TikTok</span>
                  <TrendingUp className="w-5 h-5 text-success" />
                </CardTitle>
                <p className="text-muted-foreground text-sm">@mariaclaudiaql2</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg mb-4 flex items-center justify-center relative group-hover:scale-105 transition-transform overflow-hidden">
                  <PlayCircle className="w-16 h-16 text-accent/60" />
                </div>
                <p className="text-foreground text-sm leading-relaxed">
                  De 0 a 24K seguidores en 90 días. Cuenta invisible → audiencia real. <strong>500 a 12K seguidores</strong> en 60 días. Cuenta fantasma → audiencia real.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-primary/50 hover:shadow-elegant transition-all group">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Multi-canal</span>
                  <TrendingUp className="w-5 h-5 text-success" />
                </CardTitle>
                <p className="text-muted-foreground text-sm">@sebasferreirau</p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-success/10 to-accent/10 rounded-lg mb-4 flex items-center justify-center relative group-hover:scale-105 transition-transform overflow-hidden">
                  <PlayCircle className="w-16 h-16 text-success/60" />
                </div>
                <p className="text-foreground text-sm leading-relaxed">
                  <strong>+120M impresiones</strong> en Q1 2025. Fundador aplicando el método.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* PHASE 2: Creator Testimonials Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-heading text-center mb-12">
            Lo que dicen creadores que aplicaron el sistema
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {COPY.testimonials.map((testimonial, index) => <Card key={index} className="border-2 border-border hover:border-primary/50 hover:shadow-elegant transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.handle}</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-foreground/90 mb-4 text-sm leading-relaxed" dangerouslySetInnerHTML={{
                __html: testimonial.quote
              }} />
                  
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <TrendingUp className="w-4 h-4" />
                    <span>{testimonial.metric}</span>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* PHASE 3: Updated How It Works Section */}
      <section id="how-it-works" className="px-4 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              {COPY.howItWorks.title}
            </h3>
            <p className="text-xl text-muted-foreground">
              {COPY.howItWorks.subtitle}
            </p>
          </div>

          <div className="space-y-16">
            {COPY.howItWorks.steps.map((step, index) => <div key={index} className="grid md:grid-cols-2 gap-12 items-center">
                <div className={index % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-2xl shadow-glow">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl md:text-3xl font-heading mb-4">
                        {step.title}
                      </h4>
                      <p className="text-foreground/90 text-lg mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="flex items-start gap-3 bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                        <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-destructive/90 leading-relaxed">{step.painPoint}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={index % 2 === 0 ? "order-2" : "order-2 md:order-1"}>
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl border-2 border-border flex items-center justify-center shadow-elegant">
                    <Zap className="w-20 h-20 text-primary/40" />
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* PHASE 4: Enhanced What's Included Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              {COPY.includes.title}
            </h3>
            <p className="text-xl text-muted-foreground">
              {COPY.includes.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {COPY.includes.items.map((item, index) => <Card key={index} className="border-2 border-border hover:border-primary/50 hover:shadow-elegant transition-all group">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition flex items-center justify-center flex-shrink-0">
                      {index === 0 && <Sparkles className="w-6 h-6 text-primary" />}
                      {index === 1 && <Calendar className="w-6 h-6 text-primary" />}
                      {index === 2 && <LayoutDashboard className="w-6 h-6 text-primary" />}
                      {index === 3 && <FileText className="w-6 h-6 text-primary" />}
                      {index === 4 && <UsersIcon className="w-6 h-6 text-primary" />}
                      {index === 5 && <GraduationCap className="w-6 h-6 text-primary" />}
                    </div>
                    <Badge className="bg-success/10 text-success border border-success/30 whitespace-nowrap ml-3">
                      {item.value}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>)}
          </div>

          {/* Total Value */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border-2 border-primary/20">
            <p className="text-foreground/80 text-lg mb-2">Valor total si compras todo por separado:</p>
            <p className="text-4xl font-bold text-muted-foreground/40 mb-3 line-through">
              $1,294
            </p>
            <p className="text-foreground/80 text-lg mb-3">Tu inversión hoy:</p>
            <p className="text-6xl font-bold gradient-text mb-3">
              ${PRICING.course.price}
            </p>
            <p className="text-muted-foreground">
              Ahorro de <strong className="text-success">$997</strong>. Pago único. Sin renovaciones ocultas.
            </p>
          </div>
        </div>
      </section>

      {/* PHASE 7: Program Roadmap Section */}
      <section className="px-4 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              {COPY.agenda.title}
            </h3>
            <p className="text-xl text-muted-foreground">
              {COPY.agenda.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {COPY.agenda.modules.map((module, index) => <Card key={index} className="glass-card hover:border-success/50 transition-all group cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="border-success/50 text-success">
                      M{module.week}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition">
                    {module.title}
                  </CardTitle>
                </CardHeader>
              </Card>)}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Cada módulo termina con una acción de 15–30 min
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingBox />

      {/* PHASE 6: Behind the Scenes Section */}
      <section className="px-4 py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              {COPY.behindTheScenes.title}
            </h3>
            <p className="text-xl text-muted-foreground">
              {COPY.behindTheScenes.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg shadow-2xl border-2 border-primary/20 flex items-center justify-center">
                <LayoutDashboard className="w-24 h-24 text-primary/40" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <p className="text-lg">Banco de clips siempre listo</p>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <p className="text-lg">Ideas catalogadas en Notion</p>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                <p className="text-lg">Métricas que dicen qué funciona</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <GuaranteeBox />

      {/* FAQ Section */}
      <FAQ />

      {/* PHASE 5: Visual Two Paths Final CTA */}
      <section className="px-4 py-20 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-heading mb-4">
              {COPY.finalCTA.title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Path 1 - Pain */}
            <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-2 border-destructive/30 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <XCircle className="w-64 h-64 text-destructive absolute -bottom-16 -right-16" />
              </div>
              
              <CardHeader className="relative z-10">
                <CardTitle className="text-2xl text-destructive flex items-center gap-3">
                  <XCircle className="w-8 h-8" />
                  {COPY.finalCTA.option1.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                <p className="text-destructive/90 font-medium">
                  {COPY.finalCTA.option1.description}
                </p>
                
                <div className="space-y-3 pt-4">
                  {COPY.finalCTA.option1.timeline.map((item, index) => <div key={index} className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive/80">
                        <strong>{item.period}</strong> {item.outcome}
                      </p>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Path 2 - Solution */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary relative overflow-hidden">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                <Badge className="bg-gradient-primary text-white px-6 py-2">
                  ✨ Opción inteligente
                </Badge>
              </div>
              
              <div className="absolute inset-0 opacity-10">
                <CheckCircle2 className="w-64 h-64 text-primary absolute -bottom-16 -right-16" />
              </div>
              
              <CardHeader className="relative z-10 pt-8">
                <CardTitle className="text-2xl text-primary flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8" />
                  {COPY.finalCTA.option2.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 space-y-6">
                <p className="text-foreground/90 font-medium">
                  {COPY.finalCTA.option2.description}
                </p>
                
                <div className="space-y-3">
                  {COPY.finalCTA.option2.timeline.map((item, index) => <div key={index} className="flex items-start gap-2">
                      <Zap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-foreground/80">
                        <strong>{item.period}</strong> {item.outcome}
                      </p>
                    </div>)}
                </div>
                
                <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 text-white py-6 text-lg font-semibold shadow-glow" onClick={() => window.location.href = "/checkout"}>
                  {COPY.finalCTA.option2.cta}
                </Button>

                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-warning/10 border border-warning/30 rounded-full px-4 py-2">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-sm text-warning font-medium">
                      {COPY.finalCTA.option2.urgency}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-muted/30 border-t border-border">
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
    </div>;
};
export default Index;