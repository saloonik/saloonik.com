"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo as BrandLogo } from "@saloonik/icons/web";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { HeroBackground } from "@/components/sections/hero-background";
import { wash } from "@/components/mockups/app-window";
import {
  AUDIENCE_KEY,
  AudienceLink,
  CLIENT_PATH,
  readAudience,
  rememberAudience,
} from "./audience";
import { ThemeToggle } from "./theme";

const GATE_ID = "audience-gate";
const BOTS = /bot|crawl|spider|slurp|lighthouse/i;

// Runs while the HTML is parsed: returning clients leave before first paint,
// first-time visitors get the gate without the landing flashing underneath.
// Crawlers never see it, so "/" stays the indexed salon landing.
const gateScript = `(function(){try{if(${BOTS}.test(navigator.userAgent))return;var a=localStorage.getItem("${AUDIENCE_KEY}");if(a==="klient"){document.documentElement.style.visibility="hidden";location.replace("${CLIENT_PATH}"+location.search);return}if(a!=="salon"){var d=document.getElementById("${GATE_ID}");if(d&&!d.open)d.showModal()}}catch(e){}})()`;

// [column (day), row (hour), rows spanned, --viz color, service]
const slots: [number, number, number, number, string][] = [
  [1, 1, 2, 1, "Koloryzacja"],
  [5, 1, 2, 5, "Brwi i rzęsy"],
  [3, 3, 2, 2, "Manicure hybrydowy"],
  [7, 1, 1, 2, "Pedicure"],
  [4, 3, 2, 4, "Masaż"],
  [2, 5, 2, 1, "Keratyna"],
  [6, 4, 2, 5, "Makijaż"],
  [3, 1, 1, 3, "Strzyżenie"],
  [7, 3, 2, 4, "Fizjoterapia"],
  [1, 4, 1, 3, "Broda"],
  [4, 6, 2, 1, "Balayage"],
  [2, 2, 1, 2, "Manicure"],
  [6, 2, 1, 1, "Tonowanie"],
  [5, 4, 1, 3, "Fade"],
  [1, 6, 2, 2, "Paznokcie żelowe"],
  [3, 6, 1, 4, "Masaż"],
  [7, 6, 2, 1, "Koloryzacja"],
  [5, 6, 1, 3, "Strzyżenie"],
  [6, 7, 1, 2, "Manicure"],
  [2, 8, 1, 5, "Laminacja"],
  [3, 8, 1, 3, "Strzyżenie"],
  [5, 8, 1, 4, "Drenaż"],
];
const DAYS = 7;
const HOURS = 8;
const TICK_MS = 650;
// ticks the full board stays up before the week starts over
const HOLD = 6;

/** A week of the salon calendar, tilted like a board on a desk, booking itself up. */
function BookingBoard() {
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setTick((t) => (t + 1) % (slots.length + HOLD)),
      TICK_MS,
    );
    return () => clearInterval(id);
  }, [reduced]);

  const shown = reduced ? slots.length : Math.min(tick, slots.length);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden perspective-[1600px]"
    >
      <HeroBackground />
      <div className="motion-safe:animate-drift-b absolute top-1/2 left-1/2 [animation-duration:24s]">
        <div
          className="grid w-275 gap-2 opacity-70 sm:opacity-90 dark:opacity-60"
          style={{
            gridTemplateColumns: `repeat(${DAYS}, 1fr)`,
            gridTemplateRows: `repeat(${HOURS}, 76px)`,
            transform:
              "translate(-50%, -50%) rotateX(52deg) rotateZ(-32deg) scale(1.25)",
          }}
        >
          {Array.from({ length: DAYS * HOURS }, (_, i) => (
            <div
              key={i}
              className="border-primary/10 bg-card/40 rounded-lg border"
              style={{
                gridColumn: (i % DAYS) + 1,
                gridRow: Math.floor(i / DAYS) + 1,
              }}
            />
          ))}
          <AnimatePresence>
            {slots.slice(0, shown).map(([col, row, span, viz, service], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -40, scale: 1.12 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="bg-card relative overflow-hidden rounded-lg border-l-4 px-3 py-2 shadow-md"
                style={{
                  gridColumn: col,
                  gridRow: `${row} / span ${span}`,
                }}
              >
                <span
                  className="absolute inset-0"
                  style={wash(`--viz-${viz}`)}
                />
                <span className="text-muted-foreground relative block text-xs tabular-nums">
                  {8 + row}:00
                </span>
                <span className="relative block truncate text-sm font-semibold">
                  {service}
                </span>
                {/* the newest booking flashes, like it just came in */}
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.4, delay: 0.3 }}
                  className="ring-primary absolute inset-0 rounded-lg ring-2"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* calm the middle so the question stays legible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,var(--background)_30%,transparent_80%)] sm:bg-[radial-gradient(ellipse_48%_55%_at_50%_50%,var(--background)_30%,transparent_85%)]" />
    </div>
  );
}

const team = ["Anna", "Ola", "Piotr"];
const hours = [9, 10, 11, 12];
// [team member, first hour row, rows spanned, --viz color, service]
const teamVisits: [number, number, number, number, string][] = [
  [0, 1, 2, 1, "Koloryzacja"],
  [0, 4, 1, 3, "Grzywka"],
  [1, 1, 1, 2, "Manicure"],
  [1, 3, 2, 2, "Pedicure"],
  [2, 2, 1, 3, "Fade"],
  [2, 4, 1, 1, "Broda"],
];

/** A tiny team day view: hours down the side, one column per person. */
function SalonArt() {
  return (
    <div
      aria-hidden
      className="bg-background/70 grid h-32 grid-cols-[auto_repeat(3,minmax(0,1fr))] grid-rows-[auto_repeat(4,minmax(0,1fr))] gap-x-1.5 gap-y-1 overflow-hidden rounded-xl border p-2.5"
    >
      {team.map((name, i) => (
        <span
          key={name}
          className="text-muted-foreground truncate text-[11px] font-medium"
          style={{ gridColumn: i + 2, gridRow: 1 }}
        >
          {name}
        </span>
      ))}
      {hours.map((h, i) => (
        <span
          key={h}
          className="text-muted-foreground border-t pt-0.5 pr-1 text-[10px] leading-none tabular-nums"
          style={{ gridColumn: 1, gridRow: i + 2 }}
        >
          {h}:00
        </span>
      ))}
      {teamVisits.map(([member, row, span, viz, service]) => (
        <span
          key={service}
          className="flex min-h-0 items-start truncate rounded-md border-l-2 px-1.5 py-0.5 text-[10px] leading-tight font-semibold"
          style={{
            ...wash(`--viz-${viz}`),
            gridColumn: member + 2,
            gridRow: `${row + 1} / span ${span}`,
          }}
        >
          {service}
        </span>
      ))}
    </div>
  );
}

function ClientArt() {
  return (
    <div
      aria-hidden
      className="bg-background/70 flex h-32 items-center gap-3 rounded-xl border p-3"
    >
      <span className="bg-primary text-primary-foreground flex w-14 shrink-0 flex-col items-center rounded-lg py-2 leading-none">
        <span className="text-[11px]">sob</span>
        <span className="mt-1 text-2xl font-semibold tabular-nums">25</span>
        <span className="mt-1 text-[11px] tabular-nums">10:00</span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">
          Koloryzacja
        </span>
        <span className="text-muted-foreground block truncate text-xs">
          Studio Bella, ul. Długa 12
        </span>
        <Badge variant="success" className="mt-2 text-[11px]">
          <CheckIcon className="size-3" /> Zadatek opłacony
        </Badge>
      </span>
    </div>
  );
}

const choiceClass =
  "group bg-card/85 hover:border-primary/50 focus-visible:ring-ring/50 flex flex-col gap-5 rounded-2xl border p-5 text-left shadow-lg backdrop-blur-md transition-[translate,border-color,box-shadow] duration-300 outline-none hover:-translate-y-1 hover:shadow-xl focus-visible:ring-[3px] sm:p-6";

function ChoiceBody({
  art,
  badge,
  title,
  description,
}: {
  art: React.ReactNode;
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <>
      {art}
      <span className="flex items-end justify-between gap-4">
        <span>
          <Badge className="mb-2.5">{badge}</Badge>
          <span className="block text-xl font-semibold tracking-tight">
            {title}
          </span>
          <span className="text-muted-foreground mt-1.5 block leading-relaxed text-pretty">
            {description}
          </span>
        </span>
        <span className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRightIcon className="size-5" />
        </span>
      </span>
    </>
  );
}

const rise = (i: number) =>
  ({
    "data-rise": "",
    style: { "--i": i },
  }) as React.HTMLAttributes<HTMLElement>;

/** First-visit question on "/": salon owner or client. Remembered in localStorage. */
export function AudienceGate() {
  const ref = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  // the inline script covers hard loads; this covers client-side navigation to "/"
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || BOTS.test(navigator.userAgent)) return;
    const a = readAudience();
    if (a === "klient") router.replace(CLIENT_PATH);
    else if (!a && !dialog.open) dialog.showModal();
  }, [router]);

  return (
    <>
      <dialog
        id={GATE_ID}
        ref={ref}
        aria-labelledby={`${GATE_ID}-title`}
        suppressHydrationWarning
        // closing fades out; opening is instant so the landing never peeks through
        className="bg-background text-foreground m-0 size-full max-h-none max-w-none overflow-y-auto border-0 p-0 transition-[opacity,display,overlay] transition-discrete duration-500 not-open:opacity-0 backdrop:bg-transparent"
      >
        <div className="relative isolate flex min-h-full flex-col px-4 py-5 sm:px-8">
          <BookingBoard />
          <div className="flex items-center justify-between">
            <BrandLogo className="block h-6 w-auto dark:hidden" />
            <BrandLogo theme="dark" className="hidden h-6 w-auto dark:block" />
            <ThemeToggle />
          </div>

          <div className="mx-auto my-auto w-full max-w-4xl py-12 text-center">
            <h2
              {...rise(0)}
              id={`${GATE_ID}-title`}
              // focus starts on the question, so neither answer looks preselected
              tabIndex={-1}
              autoFocus
              className="text-4xl font-semibold tracking-tight text-balance outline-none sm:text-6xl"
            >
              Jak korzystasz z Saloonika?
            </h2>
            <p
              {...rise(1)}
              className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg text-pretty"
            >
              Pokażemy Ci stronę dopasowaną do Ciebie. Zmienisz to w każdej
              chwili w stopce strony.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
              <button
                {...rise(2)}
                type="button"
                className={choiceClass}
                onClick={() => {
                  rememberAudience("salon");
                  ref.current?.close();
                }}
              >
                <ChoiceBody
                  art={<SalonArt />}
                  badge="Dla biznesu"
                  title="Prowadzę salon lub gabinet"
                  description="Kalendarz zespołu, baza klientów i przypomnienia SMS dla Twojej firmy."
                />
              </button>
              <AudienceLink
                {...rise(3)}
                audience="klient"
                href={CLIENT_PATH}
                className={choiceClass}
              >
                <ChoiceBody
                  art={<ClientArt />}
                  badge="Dla klientów"
                  title="Umawiam się na wizyty"
                  description="Twoje wizyty, zapisy online i zadatki w jednym miejscu."
                />
              </AudienceLink>
            </div>
          </div>
        </div>
      </dialog>
      <script
        // text/plain on the client: React must not re-run it, it already ran during parsing
        type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: gateScript }}
      />
    </>
  );
}
