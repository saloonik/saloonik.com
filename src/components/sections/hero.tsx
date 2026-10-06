import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { Container } from "@/components/layout/section";
import { CalendarMockup } from "@/components/mockups/calendar-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";
import { siteConfig } from "@/config/site";
import { HeroBackground } from "./hero-background";

export const trustPoints = ["7 dni za darmo", "Bez karty płatniczej", "Pełna wersja od pierwszego dnia"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <HeroBackground />
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <div className="max-w-2xl">
          <Badge className="mb-6 px-3 py-1 text-[13px]">Dla salonów, gabinetów i studiów</Badge>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl">
            Program do umawiania wizyt, <GradientText>który porządkuje Twój dzień</GradientText>
          </h1>
          <p className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl">
            Kalendarz wizyt całego zespołu, karta klienta z historią zabiegów i automatyczne przypomnienia SMS — w każdej
            branży, w której pracujesz z klientem na wizyty. Saloonik ogarnia grafik, a Ty zajmujesz się klientami.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <a href={siteConfig.registerUrl}>
                Wypróbuj {siteConfig.trialDays} dni za darmo <ArrowRight className="size-5" />
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

        <div className="relative">
          <CalendarMockup />
          <SmsMockup className="absolute -bottom-12 left-4 hidden w-72 lg:block" />
        </div>
      </Container>
    </section>
  );
}
