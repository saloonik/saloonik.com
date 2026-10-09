import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import {
  Container,
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { CalendarMockup } from "@/components/mockups/calendar-mockup";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";
import { HeroBackground } from "@/components/sections/hero-background";
import { trustPoints } from "@/components/sections/hero";
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
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
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
                  <ArrowRight className="size-5" />
                </a>
              </Button>
              <Button asChild size="xl" variant="outline">
                <Link href="/cennik">Zobacz cennik</Link>
              </Button>
            </div>
            <ul className="text-muted-foreground mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {trustPoints.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check className="text-primary size-4" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <CalendarMockup />
        </Container>
      </section>

      <Section className="bg-card/50 border-y">
        <SectionHeading
          eyebrow="Znasz to?"
          title="Codzienne wyzwania — i jak rozwiązuje je Saloonik"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {industry.pains.map((pain) => (
            <div
              key={pain.problem}
              className="bg-background flex flex-col rounded-xl border p-6"
            >
              <p className="text-muted-foreground flex items-start gap-2 text-sm font-medium">
                <X className="text-destructive mt-0.5 size-4 shrink-0" />{" "}
                {pain.problem}
              </p>
              <p className="mt-4 flex items-start gap-2 leading-relaxed">
                <Check className="text-primary mt-1 size-4 shrink-0" />{" "}
                {pain.solution}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Najważniejsze funkcje"
              title="Funkcje, które docenisz na co dzień"
            />
            <div className="mt-10 space-y-6">
              {industry.featureIds.map((id) => {
                const f = getFeature(id);
                if (!f) return null;
                return (
                  <div key={id} className="flex gap-4">
                    <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                      <f.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="text-muted-foreground mt-1 leading-relaxed">
                        {f.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/funkcje"
              className="text-primary mt-8 inline-flex items-center gap-1.5 font-medium hover:underline"
            >
              Wszystkie funkcje <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="bg-card h-fit rounded-xl border p-6 shadow-sm">
            <Badge className="mb-3">Gotowy szablon</Badge>
            <h3 className="text-lg font-semibold">
              Usługi gotowe od pierwszego dnia
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Wybierz branżę „{industry.name}” przy rejestracji, a Saloonik doda
              przykładowe usługi. Czasy i ceny zmienisz w każdej chwili.
            </p>
            <table className="mt-5 w-full text-sm">
              <thead className="sr-only">
                <tr>
                  <th scope="col">Usługa</th>
                  <th scope="col">Czas</th>
                  <th scope="col">Cena</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {industry.services.map((s) => (
                  <tr key={s.name}>
                    <td className="py-2.5 pr-2">
                      <span
                        className="mr-2 inline-block size-2 rounded-full align-middle"
                        style={{ backgroundColor: industry.color }}
                      />
                      {s.name}
                    </td>
                    <td className="text-muted-foreground py-2.5 text-right font-mono">
                      {s.duration} min
                    </td>
                    <td className="py-2.5 pl-4 text-right font-mono">
                      {formatPln(s.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          title="Saloonik sprawdza się także w"
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
          softwareJsonLd(),
          breadcrumbJsonLd([
            { name: industry.name, path: `/dla/${industry.slug}` },
          ]),
        ]}
      />
    </>
  );
}
