import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckIcon, XIcon } from "@/components/ui/icons";
import * as motion from "motion/react-client";
import { JsonLd } from "@/components/json-ld";
import {
  Container,
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { VisitMockup } from "@/components/mockups/visit-mockup";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroBackground } from "@/components/sections/hero-background";
import { trustPoints } from "@/components/sections/hero";
import { Photo, revealGroup, revealItem } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { getFeature } from "@/content/features";
import { getIndustry, industries } from "@/content/industries";
import { formatPln } from "@/lib/pricing";
import { breadcrumbJsonLd, buildMetadata, softwareJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ branza: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ branza: i.slug }));
}

export async function generateMetadata({ params }: Props) {
  const industry = getIndustry((await params).branza);
  if (!industry) return {};
  return buildMetadata({
    title: industry.metaTitle,
    description: industry.metaDescription,
    path: `/dla/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const industry = getIndustry((await params).branza);
  if (!industry) notFound();

  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <>
      <section className={cn(heroScreen, "relative isolate overflow-hidden")}>
        <HeroBackground />
        <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <nav
              aria-label="Okruszki"
              className="text-muted-foreground mb-6 text-sm"
            >
              <Link href="/" className="hover:text-foreground">
                Saloonik
              </Link>
              <span className="mx-2">/</span>
              <span>{industry.name}</span>
            </nav>
            <p className="text-primary mb-3 text-xs font-bold tracking-wide uppercase">
              {industry.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {industry.h1}
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty">
              {industry.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <a href={siteConfig.registerUrl}>
                  Wypróbuj {siteConfig.trialDays} dni za darmo{" "}
                  <ArrowRightIcon className="size-5" />
                </a>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/cennik">Zobacz cennik</Link>
              </Button>
            </div>
            <ul className="text-muted-foreground mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {trustPoints.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckIcon className="text-primary size-4" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <VisitMockup industry={industry} visit={industry.visit} />
        </Container>
      </section>

      <Section className="bg-card/50 border-y">
        <SectionHeading
          eyebrow="Znasz to?"
          title="Codzienne wyzwania — i jak rozwiązuje je Saloonik"
        />
        <motion.div
          {...revealGroup}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {industry.pains.map((pain) => (
            <motion.div
              key={pain.problem}
              variants={revealItem}
              data-spotlight
              className="bg-background flex flex-col rounded-xl border p-6"
            >
              <p className="text-muted-foreground flex items-start gap-2 text-sm font-medium">
                <XIcon className="text-destructive mt-0.5 size-4 shrink-0" />{" "}
                {pain.problem}
              </p>
              <p className="mt-4 flex items-start gap-2 leading-relaxed">
                <CheckIcon className="text-primary mt-1 size-4 shrink-0" />{" "}
                {pain.solution}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Najważniejsze funkcje"
              title="Funkcje, które docenisz na co dzień"
            />
            <motion.div {...revealGroup} className="mt-10 space-y-6">
              {industry.featureIds.map((id) => {
                const f = getFeature(id);
                if (!f) return null;
                return (
                  <motion.div
                    key={id}
                    variants={revealItem}
                    data-atelier-hover
                    className="flex gap-4"
                  >
                    <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <f.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">
                        {f.page ? (
                          <Link
                            href={`/funkcje/${f.id}`}
                            className="hover:text-primary hover:underline"
                          >
                            {f.title}
                          </Link>
                        ) : (
                          f.title
                        )}
                      </h3>
                      <p className="text-muted-foreground mt-1 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            <Link
              href="/funkcje"
              className="text-primary mt-8 inline-flex items-center gap-1.5 font-medium hover:underline"
            >
              Wszystkie funkcje <ArrowRightIcon className="size-4" />
            </Link>
          </div>

          <div className="bg-card h-fit overflow-hidden rounded-2xl border shadow-sm lg:sticky lg:top-24">
            {industry.photo && (
              <div className="relative">
                <Photo
                  {...industry.photo}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-[16/9] rounded-none"
                />
                <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                <p className="absolute bottom-4 left-6 text-xl font-semibold text-white">
                  {industry.name}
                </p>
              </div>
            )}
            <div className="p-6">
              <Badge className="mb-3">Gotowy szablon</Badge>
              <h3 className="text-lg font-semibold">
                Usługi gotowe od pierwszego dnia
              </h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Wybierz branżę „{industry.name}” przy rejestracji, a Saloonik
                doda przykładowe usługi. Czasy i ceny zmienisz w każdej chwili.
              </p>
              <table className="mt-5 w-full text-sm">
                <thead className="sr-only">
                  <tr>
                    <th scope="col">Usługa</th>
                    <th scope="col">Czas</th>
                    <th scope="col">Cena</th>
                  </tr>
                </thead>
                <motion.tbody {...revealGroup} className="divide-y">
                  {industry.services.map((s) => (
                    <motion.tr key={s.name} variants={revealItem}>
                      <td className="py-2.5 pr-2">
                        <span
                          className="mr-2 inline-block size-2 rounded-full align-middle"
                          style={{ backgroundColor: industry.color }}
                        />
                        {s.name}
                      </td>
                      <td className="text-muted-foreground py-2.5 text-right font-mono whitespace-nowrap">
                        {s.duration} min
                      </td>
                      <td className="py-2.5 pl-3 text-right font-mono whitespace-nowrap sm:pl-4">
                        {formatPln(s.price)}
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      <FaqSection
        items={industry.faq}
        title={`${industry.h1} — pytania i odpowiedzi`}
        className="bg-card/50 border-y"
      />

      <Section>
        <SectionHeading
          eyebrow="Inne branże"
          title="Inne branże, w których działa Saloonik"
        />
        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/dla/${o.slug}`}
                className="hover:bg-accent hover:text-accent-foreground inline-flex rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              >
                {o.h1}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaSection title={`${industry.h1}, który działa od pierwszego dnia`} />
      <JsonLd
        data={[
          softwareJsonLd(industry),
          breadcrumbJsonLd([
            { name: industry.name, path: `/dla/${industry.slug}` },
          ]),
        ]}
      />
    </>
  );
}
