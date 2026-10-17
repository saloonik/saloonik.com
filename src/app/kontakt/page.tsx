import {
  BuildingIcon,
  MailIcon,
  MessageSquareTextIcon,
} from "@/components/ui/icons";
import { JsonLd } from "@/components/json-ld";
import {
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { ContactForm } from "@/components/sections/contact-form";
import { HeroBackground } from "@/components/sections/hero-background";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kontakt — pytania, oferta dla sieci i pomoc",
  description:
    "Skontaktuj się z zespołem Saloonik — pytania o program, wdrożenie w Twojej firmie, ofertę dla sieci lokali i pomoc techniczną.",
  path: "/kontakt",
});

export default function ContactPage() {
  const { company, contactEmail } = siteConfig;
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
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="bg-card rounded-2xl border p-5 shadow-sm sm:p-8">
            <ContactForm
              email={contactEmail}
              privacyUrl={siteConfig.privacyUrl}
              legalName={company.legalName}
            />
          </div>

          <aside className="flex flex-col gap-4">
            <Card icon={MailIcon} title="Wolisz e-mail?">
              <a
                href={`mailto:${contactEmail}`}
                className="text-primary font-medium break-all hover:underline"
              >
                {contactEmail}
              </a>
            </Card>
            <Card icon={MessageSquareTextIcon} title="Masz już konto?">
              <p>
                Skorzystaj z formularza „Zgłoś uwagę” w aplikacji — trafia
                prosto do naszego zespołu.
              </p>
              <a
                href={siteConfig.loginUrl}
                className="text-primary mt-2 inline-block font-medium hover:underline"
              >
                Zaloguj się
              </a>
            </Card>
            <Card icon={BuildingIcon} title="Dane firmy">
              <address className="not-italic">
                {company.legalName}
                <br />
                {company.street}, {company.postalCode} {company.city}
              </address>
              <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 font-mono text-xs">
                <dt className="text-muted-foreground font-sans">NIP</dt>
                <dd>{company.nip}</dd>
                <dt className="text-muted-foreground font-sans">KRS</dt>
                <dd>{company.krs}</dd>
                <dt className="text-muted-foreground font-sans">REGON</dt>
                <dd>{company.regon}</dd>
              </dl>
            </Card>
          </aside>
        </div>
      </Section>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Kontakt", path: "/kontakt" }])}
      />
    </div>
  );
}

function Card({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof MailIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card/80 flex gap-4 rounded-xl border p-5">
      <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
        <Icon className="size-5" />
      </span>
      <div className="min-w-0 text-sm leading-relaxed">
        <h2 className="mb-1 text-base font-semibold">{title}</h2>
        {children}
      </div>
    </section>
  );
}
