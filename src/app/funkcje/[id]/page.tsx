import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  Container,
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { featureVisuals } from "@/components/mockups/feature-visuals";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FeatureDetail } from "@/components/sections/feature-detail";
import { HeroBackground } from "@/components/sections/hero-background";
import { features } from "@/content/features";
import { industries } from "@/content/industries";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

const getFeaturePage = (id: string) =>
  features.find((f) => f.id === id && f.page);

export const dynamicParams = false;

export function generateStaticParams() {
  return features.filter((f) => f.page).map((f) => ({ id: f.id }));
}

export async function generateMetadata({ params }: Props) {
  const feature = getFeaturePage((await params).id);
  if (!feature?.page) return {};
  return buildMetadata({
    title: feature.page.metaTitle,
    description: feature.page.metaDescription,
    path: `/funkcje/${feature.id}`,
  });
}

export default async function FeaturePage({ params }: Props) {
  const feature = getFeaturePage((await params).id);
  if (!feature?.page) notFound();
  const { page } = feature;
  const usedBy = industries.filter((i) => i.featureIds.includes(feature.id));

  return (
    <>
      <section className={cn(heroScreen, "relative isolate overflow-hidden")}>
        <HeroBackground />
        <Container className="max-w-3xl">
          <nav
            aria-label="Okruszki"
            className="text-muted-foreground mb-6 text-sm"
          >
            <Link href="/" className="hover:text-foreground">
              Saloonik
            </Link>
            <span className="mx-2">/</span>
            <Link href="/funkcje" className="hover:text-foreground">
              Funkcje
            </Link>
            <span className="mx-2">/</span>
            <span>{feature.title}</span>
          </nav>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {page.h1}
          </h1>
          <div className="text-muted-foreground mt-6 space-y-4 text-lg leading-relaxed text-pretty">
            {page.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-24">
        <FeatureDetail feature={feature} visual={featureVisuals[feature.id]} />
      </Container>

      <FaqSection
        items={page.faq}
        title={`${feature.title} — pytania i odpowiedzi`}
        className="bg-card/50 border-y"
      />

      {usedBy.length > 0 && (
        <Section>
          <SectionHeading
            eyebrow="Branże"
            title={`${feature.title} w Twojej branży`}
          />
          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {usedBy.map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/dla/${i.slug}`}
                  className="hover:bg-accent hover:text-accent-foreground inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors"
                >
                  {i.h1}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaSection />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Funkcje", path: "/funkcje" },
          { name: feature.title, path: `/funkcje/${feature.id}` },
        ])}
      />
    </>
  );
}
