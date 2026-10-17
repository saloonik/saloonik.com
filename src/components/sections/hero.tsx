import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { Container, heroScreen } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { HeroBackground } from "./hero-background";
import { HeroVisual } from "./hero-visual";

// Entrance runs in CSS ([data-rise] in globals.css), so the headline is
// visible on first paint even before (or without) JavaScript.
const rise = (i: number) =>
  ({
    "data-rise": "",
    style: { "--i": i },
  }) as React.HTMLAttributes<HTMLElement>;

export const trustPoints = [
  "7 dni za darmo",
  "Bez karty płatniczej",
  "Pełna wersja od pierwszego dnia",
];

export function Hero() {
  return (
    <section className={cn(heroScreen, "relative isolate overflow-hidden")}>
      <HeroBackground />
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
        <div className="max-w-2xl">
          <div {...rise(0)}>
            <Badge className="mb-6 px-3 py-1 text-[13px]">
              Dla salonów, gabinetów i studiów
            </Badge>
          </div>
          <h1
            {...rise(1)}
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
          >
            Program do umawiania wizyt,{" "}
            <GradientText>który porządkuje Twój dzień</GradientText>
          </h1>
          <p
            {...rise(2)}
            className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl"
          >
            Kalendarz wizyt całego zespołu, karta klienta z historią zabiegów i
            automatyczne przypomnienia SMS — w każdej branży, w której pracujesz
            z klientem na wizyty. Saloonik ogarnia grafik, a Ty zajmujesz się
            klientami.
          </p>
          <div {...rise(3)} className="mt-8 flex flex-col gap-3 sm:flex-row">
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
          <ul
            {...rise(4)}
            className="text-muted-foreground mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
            {trustPoints.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <CheckIcon className="text-primary size-4" /> {p}
              </li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}
