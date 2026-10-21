import {
  BellRingIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  CheckIcon,
  CreditCardIcon,
} from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Container,
  heroScreen,
  Section,
  SectionHeading,
} from "@/components/layout/section";
import { AudienceLink } from "@/components/layout/audience";
import { HeroBackground } from "@/components/sections/hero-background";
import { ClientAuth } from "@/components/sections/client-auth";
import { SalonSearch } from "@/components/sections/salon-search";
import { ClientAppMockup } from "@/components/mockups/client-app-mockup";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Dla klientów — Twoje wizyty w jednym miejscu",
  description:
    "Konto klienta Saloonik: nadchodzące i minione wizyty, umawianie online, zadatki i przypomnienia w salonach, które korzystają z Saloonika.",
  path: "/dla-klientow",
});

const rise = (i: number) =>
  ({
    "data-rise": "",
    style: { "--i": i },
  }) as React.HTMLAttributes<HTMLElement>;

const points = [
  "Wizyty ze wszystkich salonów",
  "Zadatek opłacisz online",
  "Przypomnienie przed wizytą",
];

const benefits = [
  {
    icon: CalendarCheckIcon,
    title: "Wszystkie wizyty w jednym miejscu",
    text: "Nadchodzące i minione wizyty z godziną, adresem i usługą, także z kilku różnych salonów.",
  },
  {
    icon: CalendarPlusIcon,
    title: "Umawianie bez dzwonienia",
    text: "Wybierasz usługę, osobę i wolny termin, a wizyta od razu trafia do kalendarza salonu.",
  },
  {
    icon: CreditCardIcon,
    title: "Zadatki online",
    text: "Gdy salon pobiera zadatek, opłacisz go przy rezerwacji, a potwierdzenie zobaczysz przy wizycie.",
  },
  {
    icon: BellRingIcon,
    title: "Przypomnienia",
    text: "Dostaniesz przypomnienie przed wizytą, a gdy coś Ci wypadnie, przełożysz ją z telefonu.",
  },
];

export default function ClientsPage() {
  return (
    <>
      <section className={cn(heroScreen, "relative isolate overflow-hidden")}>
        <HeroBackground />
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:gap-16">
          <div className="max-w-2xl">
            <div {...rise(0)}>
              <Badge className="mb-6 px-3 py-1 text-[13px]">
                Dla klientów salonów i gabinetów
              </Badge>
            </div>
            <h1
              {...rise(1)}
              className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
            >
              Twoje wizyty w jednym miejscu
            </h1>
            <p
              {...rise(2)}
              className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl"
            >
              Załóż konto i miej pod ręką każdą wizytę u fryzjera, kosmetyczki
              czy fizjoterapeuty, który pracuje na Saloonik. Umówisz się,
              opłacisz zadatek i sprawdzisz godzinę bez szukania SMS-ów.
            </p>
            <ul
              {...rise(3)}
              className="text-muted-foreground mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm"
            >
              {points.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <CheckIcon className="text-primary size-4" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div {...rise(2)}>
            <ClientAuth />
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <ClientAppMockup className="motion-safe:rotate-2 lg:order-last" />
          <div>
            <SectionHeading
              align="left"
              title="Salon po Twojej stronie ekranu"
              description="Te same wizyty, które salon widzi w swoim kalendarzu, Ty widzisz na swoim koncie."
            />
            <ul className="mt-10 space-y-7">
              {benefits.map((b) => (
                <li key={b.title} className="flex gap-4">
                  <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                    <b.icon className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{b.title}</span>
                    <span className="text-muted-foreground mt-1 block leading-relaxed">
                      {b.text}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section className="bg-card/50 border-y">
        <SectionHeading
          title="Znajdź salon i umów się od ręki"
          description="Pracujemy nad wyszukiwarką usług. Wpiszesz, czego szukasz i gdzie, a zobaczysz wolne terminy w salonach w okolicy."
        />
        <SalonSearch />
      </Section>

      <Container className="py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Prowadzisz salon lub gabinet?
            </h2>
            <p className="text-muted-foreground mt-1.5">
              Saloonik to też program do umawiania wizyt dla Twojej firmy.
            </p>
          </div>
          <Button asChild variant="outline" size="xl">
            <AudienceLink audience="salon" href="/">
              Zobacz Saloonika dla firm
            </AudienceLink>
          </Button>
        </div>
      </Container>
    </>
  );
}
