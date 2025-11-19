import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
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
  LayoutDashboard,
  Zap,
  Calendar,
  FileText,
  Users as UsersIcon,
  ChevronDown
} from "lucide-react";
import { BRAND, PRICING, COPY, TYPOGRAPHY, CARD_STYLES, BUTTON_STYLES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50">
      
      {/* ==================== HERO SECTION - IMPROVED HIERARCHY ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-transparent">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="page-container pt-20 pb-16 md:pt-32 md:pb-24 relative z-10">
          
          {/* Subtle brand badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-white border-2 border-purple-200 text-purple-700 px-4 py-1.5 text-xs font-medium shadow-sm">
              {BRAND.fullName}
            </Badge>
          </div>

          {/* Brand name + Main headline combined */}
          <div className="text-center mb-6 max-w-5xl mx-auto">
            {/* Brand name - small, above headline */}
            <div className="mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {BRAND.name}
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
            </div>

            {/* Main headline - THE H1 */}
            <h2 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            )}>
              {COPY.hero.headline}
            </h2>
          </div>

          {/* Subheadline */}
          <p className={cn(
            TYPOGRAPHY.pageSubtitle,
            "text-center mb-12 mx-auto"
          )}>
            {COPY.hero.subheadline}
          </p>

          {/* PRIMARY CTA - Single, unmissable */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <Button
              size="lg"
              onClick={() => window.location.href = "/checkout"}
              className={cn(
                "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                "text-white text-lg md:text-xl px-10 md:px-14 py-6 md:py-8",
                "rounded-2xl shadow-xl hover:shadow-2xl",
                "transform hover:scale-105 transition-all duration-200",
                "font-bold"
              )}
            >
              <Sparkles className="w-6 h-6 mr-3" />
              {COPY.cta.primary}
            </Button>

            {/* Urgency badge - animated, below CTA */}
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-6 py-2.5 text-sm font-semibold shadow-lg animate-pulse border-2 border-amber-300">
              🔥 {COPY.cta.primaryUrgency}
            </Badge>
          </div>

          {/* Secondary CTA - ghost style, low priority */}
          <div className="flex justify-center mb-16">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-gray-600 hover:text-gray-900 text-base hover:bg-gray-100 group"
            >
              {COPY.cta.secondary}
              <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>

          {/* Social proof numbers - AFTER CTAs */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 max-w-4xl mx-auto mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                363M
              </div>
              <p className={cn(TYPOGRAPHY.bodySmall, "text-gray-600 font-medium")}>
                Impresiones en 90 días
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                150+
              </div>
              <p className={cn(TYPOGRAPHY.bodySmall, "text-gray-600 font-medium")}>
                Creadores activos
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                8h
              </div>
              <p className={cn(TYPOGRAPHY.bodySmall, "text-gray-600 font-medium")}>
                Ahorradas/semana
              </p>
            </div>
          </div>

          {/* Founder quote - tertiary, subtle */}
          <div className="max-w-3xl mx-auto">
            <Card className="border border-gray-200 bg-white/80 backdrop-blur shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">S</span>
                    </div>
                  </div>
                  <div>
                    <p className={cn(TYPOGRAPHY.body, "italic text-gray-700 mb-2")}>
                      "{COPY.hero.founderQuote.text}"
                    </p>
                    <p className={cn(TYPOGRAPHY.bodySmall, "text-gray-600 font-medium")}>
                      — {COPY.hero.founderQuote.author}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ==================== SOCIAL PROOF - CASE STUDIES ==================== */}
      <section className="section bg-gradient-to-b from-white to-purple-50">
        <div className="page-container">
          <SectionHeader
            title={COPY.socialProof.headline}
            subtitle={COPY.socialProof.subheadline}
            gradient
          />

          {/* Case study grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Instagram case */}
            <Card className={cn(CARD_STYLES.secondary, "interactive-scale")}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-purple-100 text-purple-700">Instagram</Badge>
                  </div>
                </div>
                <CardTitle className={TYPOGRAPHY.cardTitle}>
                  @ferenloscielos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={TYPOGRAPHY.body}>
                  De 15K a 40K seguidores en 90 días. 50K+ views/reel promedio.
                </p>
              </CardContent>
            </Card>

            {/* TikTok case */}
            <Card className={cn(CARD_STYLES.secondary, "interactive-scale")}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-purple-100 text-purple-700">TikTok</Badge>
                  </div>
                </div>
                <CardTitle className={TYPOGRAPHY.cardTitle}>
                  @mariaclaudiaql
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={TYPOGRAPHY.body}>
                  De 500 a 12K seguidores en 60 días. Cuenta fantasma → audiencia real.
                </p>
              </CardContent>
            </Card>

            {/* Multi-channel case */}
            <Card className={cn(CARD_STYLES.primary, "interactive-scale")}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-700">Multi-canal</Badge>
                  </div>
                </div>
                <CardTitle className={TYPOGRAPHY.cardTitle}>
                  @sebasferreirauu
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={TYPOGRAPHY.body}>
                  +120M impresiones en Q1 2025. Instagram, TikTok, Snapchat sincronizados.
                </p>
              </CardContent>
            </Card>
          </div>

          <p className={cn(TYPOGRAPHY.caption, "text-center text-gray-500 italic")}>
            {COPY.socialProof.disclaimer}
          </p>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section id="how-it-works" className="section">
        <div className="page-container">
          <SectionHeader
            title={COPY.howItWorks.title}
            subtitle={COPY.howItWorks.subtitle}
          />

          <div className="grid md:grid-cols-3 gap-8">
            {COPY.howItWorks.steps.map((step, index) => (
              <Card key={index} className={cn(CARD_STYLES.secondary, "interactive-scale")}>
                <CardHeader>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4 mx-auto">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                  <CardTitle className={cn(TYPOGRAPHY.cardTitle, "text-center")}>
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className={cn(TYPOGRAPHY.body, "mb-4")}>
                    {step.description}
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className={cn(TYPOGRAPHY.bodySmall, "text-red-800")}>
                      {step.painPoint}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT'S INCLUDED ==================== */}
      <section className="section bg-gradient-to-b from-white to-purple-50">
        <div className="page-container">
          <SectionHeader
            title={COPY.includes.title}
            subtitle={COPY.includes.subtitle}
            gradient
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {COPY.includes.items.map((item, index) => {
              const icons = [
                <Sparkles className="w-6 h-6" />,
                <Calendar className="w-6 h-6" />,
                <LayoutDashboard className="w-6 h-6" />,
                <FileText className="w-6 h-6" />,
                <UsersIcon className="w-6 h-6" />,
                <GraduationCap className="w-6 h-6" />
              ];

              return (
                <Card key={index} className={cn(CARD_STYLES.secondary, "interactive-scale")}>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        {icons[index]}
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        {item.value}
                      </Badge>
                    </div>
                    <CardTitle className={TYPOGRAPHY.cardTitle}>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={TYPOGRAPHY.bodySmall}>
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Value comparison */}
          <Card className={cn(CARD_STYLES.primary, "max-w-3xl mx-auto")}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className={cn(TYPOGRAPHY.body, "text-gray-700 mb-2")}>
                  Valor total si compras todo por separado:
                </p>
                <div className="text-4xl font-bold text-gray-400 line-through mb-4">
                  $1,294
                </div>
                <p className={cn(TYPOGRAPHY.bodyLarge, "text-gray-900 font-semibold mb-2")}>
                  Tu inversión hoy:
                </p>
                <div className={cn(
                  "text-6xl font-bold mb-4",
                  TYPOGRAPHY.gradientText
                )}>
                  ${PRICING.course.price}
                </div>
                <p className={cn(TYPOGRAPHY.body, "text-gray-700")}>
                  Ahorro de $997. Pago único. Sin renovaciones ocultas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ==================== PRICING - MOVED UP ==================== */}
      <section className="section">
        <div className="page-container">
          <SectionHeader
            title={COPY.pricing.title}
            subtitle={COPY.pricing.subtitle}
            gradient
          />

          {/* Main pricing card */}
          <div className="max-w-2xl mx-auto">
            <Card className={cn(CARD_STYLES.elevated)}>
              <CardHeader className="text-center border-b border-purple-200 bg-white/80 backdrop-blur pb-8">
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-2 mb-4 mx-auto">
                  {COPY.pricing.mainPlan.badge}
                </Badge>
                <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  ${COPY.pricing.mainPlan.price}
                </div>
                <p className={cn(TYPOGRAPHY.body, "text-gray-600")}>
                  {COPY.pricing.mainPlan.frequency}
                </p>
              </CardHeader>
              <CardContent className="pt-8">
                <ul className="space-y-4 mb-8">
                  {COPY.pricing.mainPlan.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className={TYPOGRAPHY.body}>{item}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  onClick={() => window.location.href = "/checkout"}
                  className={cn(BUTTON_STYLES.primary, "w-full text-xl py-8")}
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  Conseguir acceso ahora
                </Button>

                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <p className={cn(TYPOGRAPHY.bodySmall, "text-green-900")}>
                      {COPY.pricing.mainPlan.guarantee}
                    </p>
                  </div>
                </div>

                <p className={cn(TYPOGRAPHY.caption, "text-center text-gray-500 mt-6")}>
                  Después del trial de 90 días, el Dashboard es $19/mes (opcional). El curso + Notion + Discord son tuyos para siempre.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Urgency banner */}
          {COPY.pricing.urgency.enabled && (
            <div className="max-w-2xl mx-auto mt-8">
              <Card className="border-2 border-amber-300 bg-amber-50">
                <CardContent className="pt-6 text-center">
                  <p className={cn(TYPOGRAPHY.bodyLarge, "text-amber-900 font-semibold")}>
                    🔥 {COPY.pricing.urgency.text}
                  </p>
                  <p className={cn(TYPOGRAPHY.bodySmall, "text-amber-800 mt-2")}>
                    {COPY.pricing.urgency.reasoning}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* ==================== FAQ - IMPROVED ==================== */}
      <section className="section bg-gradient-to-b from-white to-purple-50">
        <div className="page-container">
          <SectionHeader
            title={COPY.faq.title}
          />

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {COPY.faq.questions.map((item, index) => (
                <Card key={index} className={cn(CARD_STYLES.secondary)}>
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="hover:no-underline px-6 py-4">
                      <div className="flex items-center gap-3 text-left">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                        </div>
                        <span className={cn(TYPOGRAPHY.cardTitle, "text-base")}>
                          {item.q}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className={cn(TYPOGRAPHY.body, "text-gray-700")}>
                        {item.a}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Card>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="section">
        <div className="page-container">
          <SectionHeader
            title={COPY.finalCTA.title}
            gradient
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Path 1 - Pain */}
            <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50">
              <CardHeader>
                <CardTitle className={cn(TYPOGRAPHY.cardTitle, "text-red-900")}>
                  {COPY.finalCTA.option1.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn(TYPOGRAPHY.body, "text-red-800 mb-6")}>
                  {COPY.finalCTA.option1.description}
                </p>
                <ul className="space-y-3">
                  {COPY.finalCTA.option1.timeline?.map((item: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className={cn(TYPOGRAPHY.bodySmall, "text-red-800")}>
                        <strong>{item.period}:</strong> {item.outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Path 2 - Solution */}
            <Card className={cn(CARD_STYLES.elevated)}>
              <CardHeader>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4 w-fit">
                  ✨ Opción inteligente
                </Badge>
                <CardTitle className={cn(TYPOGRAPHY.cardTitle, "bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent")}>
                  {COPY.finalCTA.option2.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn(TYPOGRAPHY.body, "text-gray-700 mb-6")}>
                  {COPY.finalCTA.option2.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {COPY.finalCTA.option2.timeline?.map((item: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className={cn(TYPOGRAPHY.bodySmall, "text-gray-700")}>
                        <strong>{item.period}:</strong> {item.outcome}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  onClick={() => window.location.href = "/checkout"}
                  className={cn(BUTTON_STYLES.primary, "w-full text-lg py-6")}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  {COPY.finalCTA.option2.cta}
                </Button>
                <div className="mt-4 text-center">
                  <Badge className="bg-amber-100 text-amber-900 border-amber-300 text-sm">
                    🔥 {COPY.finalCTA.option2.urgency}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="section-tight bg-gray-900 text-white">
        <div className="page-container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className={cn(TYPOGRAPHY.bodySmall, "text-gray-400")}>
              {BRAND.fullName} · {BRAND.principles.join(" · ")}
            </p>
            <div className="flex gap-6">
              <a href="/terms" className={cn(TYPOGRAPHY.bodySmall, "text-gray-400 hover:text-white transition-colors")}>
                Términos
              </a>
              <a href="/privacy" className={cn(TYPOGRAPHY.bodySmall, "text-gray-400 hover:text-white transition-colors")}>
                Privacidad
              </a>
              <a href="/refund" className={cn(TYPOGRAPHY.bodySmall, "text-gray-400 hover:text-white transition-colors")}>
                Reembolso
              </a>
            </div>
          </div>
          <p className={cn(TYPOGRAPHY.caption, "text-gray-500 text-center mt-6")}>
            © 2025 {BRAND.name}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
