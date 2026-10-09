import { JsonLd } from "@/components/json-ld";
import {
  Container,
  heroScreen,
  SectionHeading,
} from "@/components/layout/section";
import { CalendarMockup } from "@/components/mockups/calendar-mockup";
import {
  ClientCardMockup,
  PhotosMockup,
  TreatmentCardsMockup,
} from "@/components/mockups/client-card-mockup";
import { PhoneMockup } from "@/components/mockups/phone-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";
import { StatsMockup } from "@/components/mockups/stats-mockup";
import { CtaSection } from "@/components/sections/cta-section";
import { FeatureDetail } from "@/components/sections/feature-detail";
import { HeroBackground } from "@/components/sections/hero-background";
import { features, upcomingFeatures } from "@/content/features";
import { cn } from "@/lib/utils";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Funkcje — kalendarz, klienci, SMS i statystyki",
  description:
    "Funkcje Saloonika: kalendarz wizyt zespołu, baza klientów, karty zabiegowe i zdjęcia przed/po, przypomnienia SMS, uprawnienia, statystyki i wiele oddziałów.",
  path: "/funkcje",
});

const visuals: Record<string, React.ReactNode> = {
  kalendarz: <CalendarMockup />,
  klienci: <ClientCardMockup />,
  "karty-zabiegowe": <TreatmentCardsMockup />,
  zdjecia: <PhotosMockup />,
  przypomnienia: <SmsMockup className="mx-auto max-w-sm" />,
  statystyki: <StatsMockup />,
  "aplikacja-mobilna": <PhoneMockup />,
};

export default function FeaturesPage() {
  const all = [...features, ...upcomingFeatures];
  return (
    <>
      <section className={cn(heroScreen, "relative isolate overflow-hidden")}>
        <HeroBackground />
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Funkcje"
            title="Jeden program do prowadzenia całej firmy usługowej"
            description="Kalendarz, klienci, przypomnienia, zespół i statystyki — wszystko w cenie abonamentu, bez dodatkowych modułów."
          />
          <nav
            aria-label="Spis funkcji"
            className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
          >
            {all.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="bg-background hover:bg-accent hover:text-accent-foreground rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
              >
                {f.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      <Container className="space-y-24 py-16 sm:space-y-32 sm:py-24">
        {all.map((feature, i) => (
          <FeatureDetail
            key={feature.id}
            feature={feature}
            visual={visuals[feature.id]}
            reverse={i % 2 === 1}
          />
        ))}
      </Container>

      <CtaSection />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Funkcje", path: "/funkcje" }])}
      />
    </>
  );
}
