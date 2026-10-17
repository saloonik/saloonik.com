import * as motion from "motion/react-client";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "@/components/ui/icons";
import { revealGroup, revealItem } from "@/components/ui/reveal";
import {
  Container,
  heroScreen,
  Section,
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
  // features without a visual would leave half a row empty, so they share one card grid
  const detailed = all.filter((f) => visuals[f.id] || f.photo);
  const cards = all.filter((f) => !visuals[f.id] && !f.photo);
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

      <Container className="space-y-20 py-16 sm:space-y-24 sm:py-24">
        {detailed.map((feature, i) => (
          <FeatureDetail
            key={feature.id}
            feature={feature}
            visual={visuals[feature.id]}
            reverse={i % 2 === 1}
          />
        ))}
      </Container>

      {cards.length > 0 && (
        <Section className="bg-card/50 border-y">
          <SectionHeading
            eyebrow="Wkrótce"
            title="Nad tym pracujemy"
            description="Każda nowa funkcja trafia do abonamentu bez dopłat."
          />
          <motion.div
            {...revealGroup}
            className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {cards.map((f) => (
              <motion.article
                key={f.id}
                id={f.id}
                variants={revealItem}
                data-spotlight
                data-atelier-hover
                className="bg-background scroll-mt-24 rounded-xl border p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 items-center justify-center rounded-lg">
                    <f.icon className="size-5" />
                  </span>
                  <Badge variant="warning">Wkrótce</Badge>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{f.title}</h2>
                <p className="text-muted-foreground mt-2 leading-relaxed">
                  {f.description}
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <CheckIcon className="text-primary mt-0.5 size-4 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </Section>
      )}

      <CtaSection />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Funkcje", path: "/funkcje" }])}
      />
    </>
  );
}
