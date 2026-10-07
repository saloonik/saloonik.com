import { Section, SectionHeading } from "@/components/layout/section";
import { siteConfig } from "@/config/site";
import { plan } from "@/lib/pricing";
import { PricingCalculator } from "./pricing-calculator";

export function PricingSection({
  as = "h2",
  className,
}: {
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Section id="cennik" className={className}>
      <SectionHeading
        as={as}
        eyebrow="Cennik"
        title={
          as === "h1"
            ? "Cennik programu Saloonik"
            : "Prosty cennik bez ukrytych opłat"
        }
        description={`Od ${plan.monthlyPrice} zł netto miesięcznie za właściciela i jeden lokal. Każdy kolejny pracownik od ${plan.pricePerExtraEmployeeAboveTier} zł, a powyżej ${plan.maxEmployees} osób — za darmo.`}
      />
      <div className="mt-14">
        <PricingCalculator
          registerUrl={siteConfig.registerUrl}
          contactEmail={siteConfig.contactEmail}
        />
      </div>
    </Section>
  );
}
