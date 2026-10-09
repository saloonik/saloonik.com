import { Mail, MessageSquareText } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import {
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { HeroBackground } from "@/components/sections/hero-background";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt",
  description:
    "Skontaktuj się z zespołem Saloonik — pytania o program, wdrożenie w Twojej firmie, ofertę dla sieci lokali i pomoc techniczną.",
  path: "/kontakt",
});

const channels = [
  {
    icon: Mail,
    title: "Napisz do nas",
    text: "Pytania o program, ofertę dla sieci lokali i współpracę.",
    href: `mailto:${siteConfig.contactEmail}`,
    cta: siteConfig.contactEmail,
  },
  {
    icon: MessageSquareText,
    title: "Masz już konto?",
    text: "Skorzystaj z formularza „Zgłoś uwagę” w aplikacji — trafia prosto do naszego zespołu.",
    href: siteConfig.loginUrl,
    cta: "Zaloguj się",
  },
];

export default function ContactPage() {
  return (
    <div className="relative isolate overflow-hidden">
      <HeroBackground />
      <Section className={heroScreen}>
        <SectionHeading
          as="h1"
          eyebrow="Kontakt"
          title="Porozmawiajmy o Twojej firmie"
          description="Napisz, w czym możemy pomóc — odpowiemy najszybciej, jak to możliwe."
        />
        <div className="mx-auto mt-14 grid max-w-3xl gap-6 md:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="bg-card group flex flex-col rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-11 items-center justify-center rounded-xl">
                <c.icon className="size-5" />
              </span>
              <h2 className="mt-5 text-lg font-semibold">{c.title}</h2>
              <p className="text-muted-foreground mt-2 flex-1 text-sm leading-relaxed">
                {c.text}
              </p>
              <span className="text-primary mt-5 text-sm font-medium break-all group-hover:underline">
                {c.cta}
              </span>
            </a>
          ))}
        </div>
      </Section>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Kontakt", path: "/kontakt" }])}
      />
    </div>
  );
}
