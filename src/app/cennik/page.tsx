import { JsonLd } from "@/components/json-ld";
import {
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroBackground } from "@/components/sections/hero-background";
import { PricingSection } from "@/components/sections/pricing-section";
import { pricingFaq } from "@/content/faq";
import {
  formatPln,
  grossPln,
  monthlyPrice,
  plan,
  netOf,
} from "@/lib/pricing";
import { breadcrumbJsonLd, buildMetadata, softwareJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `Cennik — program do wizyt od ${grossPln(plan.monthlyPrice)}/mies. brutto`,
  description: `Cennik Saloonika: ${grossPln(plan.monthlyPrice)} brutto miesięcznie za właściciela i lokal, ${grossPln(plan.pricePerExtraEmployee)} brutto za pracownika, powyżej ${plan.maxEmployees} osób za darmo. Rocznie 2 miesiące gratis.`,
  path: "/cennik",
});

const examples = [
  { label: "Jednoosobowa działalność", employees: 0, branches: 1 },
  { label: "Mała firma: właściciel + 3 osoby", employees: 3, branches: 1 },
  { label: "Dwa lokale, 6 pracowników", employees: 6, branches: 2 },
  { label: "Sieć: 5 lokali, 15+ pracowników", employees: 15, branches: 5 },
];

export default function PricingPage() {
  return (
    <>
      <div className="relative isolate">
        <HeroBackground />
        <PricingSection as="h1" className={heroScreen} />
      </div>

      <Section className="bg-card/50 border-y">
        <SectionHeading
          eyebrow="Przykłady"
          title="Ile zapłaci firma taka jak Twoja?"
          description="Ceny brutto z 23% VAT, pod nimi kwota netto. Przy płatności rocznej płacisz za 10 miesięcy."
        />
        <div className="mx-auto mt-12 max-w-3xl overflow-x-auto rounded-xl border">
          <table className="bg-background w-full text-left text-sm">
            <thead className="bg-muted/60 text-muted-foreground text-xs uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Firma
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  Miesięcznie
                </th>
                <th scope="col" className="px-4 py-3 text-right font-semibold">
                  Rocznie
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {examples.map((ex) => {
                const m = monthlyPrice(ex.employees, ex.branches);
                return (
                  <tr key={ex.label}>
                    <th scope="row" className="px-4 py-3 font-medium">
                      {ex.label}
                    </th>
                    <PriceCell gross={m} />
                    <PriceCell gross={m * 10} />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <FaqSection items={pricingFaq} title="Pytania o cennik i płatności" />
      <CtaSection />
      <JsonLd
        data={[
          softwareJsonLd(),
          breadcrumbJsonLd([{ name: "Cennik", path: "/cennik" }]),
        ]}
      />
    </>
  );
}

function PriceCell({ gross }: { gross: number }) {
  return (
    <td className="px-4 py-3 text-right whitespace-nowrap tabular-nums">
      {formatPln(gross)}
      <span className="text-muted-foreground block text-xs">
        {formatPln(netOf(gross))} netto
      </span>
    </td>
  );
}
