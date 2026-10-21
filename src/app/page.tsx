import { JsonLd } from "@/components/json-ld";
import { AudienceGate } from "@/components/layout/audience-gate";
import { ComingSoon } from "@/components/sections/coming-soon";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeaturesBento } from "@/components/sections/features-bento";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IndustriesStrip } from "@/components/sections/industries-strip";
import { PricingSection } from "@/components/sections/pricing-section";
import { Trust } from "@/components/sections/trust";
import { generalFaq } from "@/content/faq";
import { buildMetadata, softwareJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({ path: "/" });

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesStrip />
      <FeaturesBento />
      <HowItWorks />
      <Trust />
      <ComingSoon />
      <PricingSection />
      <FaqSection items={generalFaq} className="bg-card/50 border-y" />
      <CtaSection />
      <JsonLd data={softwareJsonLd()} />
      <AudienceGate />
    </>
  );
}
