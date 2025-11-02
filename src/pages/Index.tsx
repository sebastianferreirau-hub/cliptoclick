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
  return (
    <div className="min-h-screen">
      <Hero />
      <SocialProof />
      <HowItWorks />
      <IncludesGrid />
      <AgendaTimeline />
      <PricingBox />
      <GuaranteeBox />
      <FAQ />
      <FinalCTA />
      
      <footer className="bg-muted/30 py-8 text-center text-sm text-muted-foreground">
        <p>From Clip to Click™ · Relatable &gt; Perfecto · Ritmo &gt; Efectos</p>
        <p className="mt-2">© 2025 ClipCrafters. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Index;
