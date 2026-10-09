import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import * as motion from "motion/react-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/gradient-text";
import { Container, heroScreen } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import { CalendarMockup } from "@/components/mockups/calendar-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";
import { siteConfig } from "@/config/site";
import { HeroBackground } from "./hero-background";

const stagger = { show: { transition: { staggerChildren: 0.08 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export const trustPoints = [
  "7 dni za darmo",
  "Bez karty płatniczej",
  "Pełna wersja od pierwszego dnia",
];

export function Hero() {
  return (
    <section className={cn(heroScreen, "relative isolate overflow-hidden")}>
      <HeroBackground />
      <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        <motion.div
          className="max-w-2xl"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <Badge className="mb-6 px-3 py-1 text-[13px]">
              Dla salonów, gabinetów i studiów
            </Badge>
          </motion.div>
          <motion.h1
            variants={item}
            className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl xl:text-6xl"
          >
            Program do umawiania wizyt,{" "}
            <GradientText>który porządkuje Twój dzień</GradientText>
          </motion.h1>
          <motion.p
            variants={item}
            className="text-muted-foreground mt-6 text-lg leading-relaxed text-pretty sm:text-xl"
          >
            Kalendarz wizyt całego zespołu, karta klienta z historią zabiegów i
            automatyczne przypomnienia SMS — w każdej branży, w której pracujesz
            z klientem na wizyty. Saloonik ogarnia grafik, a Ty zajmujesz się
            klientami.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="xl">
              <a href={siteConfig.registerUrl}>
                Wypróbuj {siteConfig.trialDays} dni za darmo{" "}
                <ArrowRight className="size-5" />
              </a>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/cennik">Zobacz cennik</Link>
            </Button>
          </motion.div>
          <motion.ul
            variants={item}
            className="text-muted-foreground mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm"
          >
            {trustPoints.map((p) => (
              <li key={p} className="flex items-center gap-1.5">
                <Check className="text-primary size-4" /> {p}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative min-w-0"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <CalendarMockup captionClassName="lg:pl-80" />
          <SmsMockup className="absolute -bottom-5 left-4 z-30 hidden w-72 lg:block" />
        </motion.div>
      </Container>
    </section>
  );
}
