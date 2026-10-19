"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  BatteryIcon,
  BellRingIcon,
  CalendarIcon,
  CheckCheckIcon,
  CheckIcon,
  EllipsisIcon,
  HomeIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  WifiIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { wash } from "./app-window";
import { BeforeAfter } from "./before-after";

const visits = [
  {
    time: "10:00",
    client: "Natalia W.",
    service: "Koloryzacja",
    color: "--viz-1",
  },
  {
    time: "11:30",
    client: "Ola D.",
    service: "Paznokcie żelowe",
    color: "--viz-2",
  },
  { time: "13:00", client: "Julia P.", service: "Balayage", color: "--viz-1" },
  { time: "14:15", client: "Adam W.", service: "Strzyżenie", color: "--viz-3" },
  {
    time: "15:00",
    client: "Kasia M.",
    service: "Manicure hybrydowy",
    color: "--viz-2",
  },
  {
    time: "16:00",
    client: "Piotr N.",
    service: "Strzyżenie i broda",
    color: "--viz-3",
  },
  {
    time: "17:00",
    client: "Ewa K.",
    service: "Strzyżenie damskie",
    color: "--viz-1",
  },
  { time: "18:00", client: "Marta S.", service: "Pedicure", color: "--viz-2" },
];

const SHOWN = 4;
const STEP_MS = 1800;
// idle → first visit finishes → it leaves while a new booking arrives → it lands at the bottom
const phases = ["idle", "done", "notify"] as const;
// the phone tours its screens: visits list, start of day, client card
const screens = [
  { id: "visits", tab: 1 },
  { id: "today", tab: 0 },
  { id: "client", tab: 2 },
] as const;
const TICKS_PER_SCREEN = 4;
const tabs = [HomeIcon, CalendarIcon, UsersIcon, EllipsisIcon];

const at = (i: number) => visits[i % visits.length];

// value that slides out upward while the next one slides in from below
function Roll({
  value,
  className,
}: {
  value: string | number;
  className?: string;
}) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function PhoneMockup({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), STEP_MS);
    return () => clearInterval(id);
  }, [inView, reduced]);

  const start = Math.floor(tick / phases.length);
  const phase = phases[tick % phases.length];
  const incoming = at(start + SHOWN);
  const doneCount = (start % visits.length) + (phase === "idle" ? 0 : 1);
  const screen = screens[Math.floor(tick / TICKS_PER_SCREEN) % screens.length];

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 15 });

  return (
    <div ref={ref} className={cn("relative mx-auto w-fit", className)}>
      <Floater
        show={inView}
        delay={0.5}
        className="top-20 -left-28 hidden w-48 sm:block xl:-left-44"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
          <CheckCheckIcon className="size-4" />
        </span>
        <span>
          <span className="block text-xs font-semibold">SMS wysłany</span>
          <span className="text-muted-foreground block text-[11px]">
            Przypomnienie na jutro
          </span>
        </span>
      </Floater>
      <Floater
        show={inView}
        delay={0.9}
        className="-right-28 bottom-24 hidden w-44 [animation-delay:-3s] sm:block xl:-right-44"
      >
        <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-8 shrink-0 items-center justify-center rounded-lg">
          <TrendingUpIcon className="size-4" />
        </span>
        <span>
          <span className="block text-xs font-semibold">
            Obłożenie <Roll value={`${78 + (start % 5)}%`} />
          </span>
          <span className="text-muted-foreground block text-[11px]">
            Ten tydzień
          </span>
        </span>
      </Floater>

      <motion.figure
        initial={reduced ? false : { opacity: 0, y: 48, rotate: -6 }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
                // short buzz, like a phone receiving a push
                rotate:
                  phase === "notify" && !reduced ? [0, -3, 3, -2, 2, 0] : 0,
              }
            : undefined
        }
        transition={{
          default: { type: "spring", stiffness: 110, damping: 16 },
          rotate:
            phase === "notify"
              ? { duration: 0.45, ease: "easeInOut" }
              : { type: "spring", stiffness: 110, damping: 16 },
        }}
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          tiltY.set(((e.clientX - r.left) / r.width - 0.5) * 16);
          tiltX.set(((e.clientY - r.top) / r.height - 0.5) * -16);
        }}
        onPointerLeave={() => {
          tiltX.set(0);
          tiltY.set(0);
        }}
        role="img"
        aria-label="Aplikacja mobilna Saloonik — plan dnia, start dnia i karta klientki na telefonie"
        className="bg-foreground w-60 rounded-[2.5rem] p-2.5 shadow-2xl select-none dark:bg-zinc-700"
      >
        <div
          aria-hidden
          className="bg-background relative flex h-[440px] flex-col overflow-hidden rounded-[2rem]"
        >
          <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center px-5 text-[10px] font-semibold">
            <Roll value={at(start).time} className="tabular-nums" />
            <span className="h-5 w-20 rounded-full bg-black" />
            <span className="flex justify-end gap-1">
              <WifiIcon className="size-3" />
              <BatteryIcon className="size-3" />
            </span>
          </div>

          <AnimatePresence>
            {phase === "notify" && (
              <motion.div
                key={start}
                initial={{ y: -64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -64, opacity: 0 }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="bg-card absolute inset-x-2.5 top-9 z-10 flex gap-2.5 rounded-2xl border p-2.5 shadow-lg"
              >
                <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-lg">
                  <BellRingIcon className="size-3.5" />
                </span>
                <span className="min-w-0 text-left">
                  <span className="block text-[11px] font-semibold">
                    Nowa wizyta w kalendarzu
                  </span>
                  <span className="text-muted-foreground block truncate text-[10px]">
                    {incoming.client}, {incoming.time}, {incoming.service}
                  </span>
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.div
                key={screen.id}
                initial={{ x: "100%", opacity: 0.4 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-35%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 30 }}
                className="absolute inset-0 px-4 pt-4 text-left"
              >
                {screen.id === "visits" && (
                  <VisitsScreen
                    start={start}
                    phase={phase}
                    doneCount={doneCount}
                  />
                )}
                {screen.id === "today" && <TodayScreen start={start} />}
                {screen.id === "client" && <ClientScreen />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="bg-card relative grid grid-cols-4 border-t py-2">
            {tabs.map((Icon, i) => (
              <span
                key={i}
                className={cn(
                  "relative flex justify-center transition-colors duration-300",
                  i === screen.tab ? "text-primary" : "text-muted-foreground",
                )}
              >
                {i === screen.tab && (
                  <motion.span
                    layoutId="phone-tab"
                    className="bg-primary/10 dark:bg-primary/20 absolute inset-x-3 -inset-y-1 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <AnimatePresence>
                  {i === screen.tab && (
                    <motion.span
                      key={screen.id}
                      initial={{ scale: 0.2, opacity: 0.6 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="bg-primary absolute top-1/2 left-1/2 -mt-3 -ml-3 size-6 rounded-full"
                    />
                  )}
                </AnimatePresence>
                <span className="relative">
                  <Icon className="size-5" />
                  {i === 1 && (
                    <AnimatePresence>
                      {phase === "notify" && (
                        <motion.span
                          key={start}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 18,
                          }}
                          className="bg-destructive ring-card absolute -top-1 -right-1 size-2.5 rounded-full ring-2"
                        />
                      )}
                    </AnimatePresence>
                  )}
                </span>
              </span>
            ))}
          </div>
        </div>
      </motion.figure>
    </div>
  );
}

function Floater({
  show,
  delay,
  className,
  children,
}: {
  show: boolean;
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      className={cn("absolute z-10", className)}
    >
      <div
        aria-hidden
        className="bg-card motion-safe:animate-float flex items-center gap-2.5 rounded-xl border p-2.5 text-left shadow-xl"
      >
        {children}
      </div>
    </motion.div>
  );
}

function VisitsScreen({
  start,
  phase,
  doneCount,
}: {
  start: number;
  phase: (typeof phases)[number];
  doneCount: number;
}) {
  const first = phase === "notify" ? start + 1 : start;
  const shown = Array.from(
    { length: start + SHOWN - first },
    (_, i) => first + i,
  );
  return (
    <>
      <p className="text-muted-foreground text-[11px] font-medium">
        Wtorek, 14.10
      </p>
      <p className="text-lg font-semibold">Najbliższe wizyty</p>
      <div className="text-muted-foreground mt-2 flex items-center gap-2 text-[10px]">
        <span className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
          <motion.span
            className="bg-primary block h-full rounded-full"
            animate={{ width: `${(doneCount / visits.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </span>
        <span className="flex tabular-nums">
          <Roll value={doneCount} />/{visits.length}
        </span>
      </div>
      <ul className="mt-3 space-y-3">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((n, i) => {
            const v = at(n);
            const done = i === 0 && phase === "done";
            return (
              <motion.li
                key={n}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{ opacity: done ? 0.55 : 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative rounded-lg border-l-[3px] px-3 py-2"
                style={wash(v.color)}
              >
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                  className="ring-primary pointer-events-none absolute inset-0 rounded-lg ring-2"
                />
                <p className="text-muted-foreground font-mono text-[10px]">
                  {v.time}
                </p>
                <p className="text-xs font-semibold">{v.client}</p>
                <p className="text-muted-foreground text-[11px]">{v.service}</p>
                {done && (
                  <motion.span
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 3, opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-primary absolute top-1/2 right-3 size-5 -translate-y-1/2 rounded-full"
                  />
                )}
                <AnimatePresence>
                  {done && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="bg-primary text-primary-foreground absolute top-1/2 right-3 flex size-5 -translate-y-1/2 items-center justify-center rounded-full"
                    >
                      <CheckIcon className="size-3" stroke={2.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </>
  );
}

const RING = 2 * Math.PI * 30;

function TodayScreen({ start }: { start: number }) {
  return (
    <>
      <p className="text-muted-foreground text-[11px] font-medium">
        Start dnia
      </p>
      <p className="text-lg font-semibold">Dzień dobry, Anno</p>
      <div className="bg-card mt-3 flex items-center gap-3 rounded-xl border p-3">
        <svg viewBox="0 0 72 72" className="size-16 shrink-0 -rotate-90">
          <circle
            cx="36"
            cy="36"
            r="30"
            className="stroke-muted"
            strokeWidth="7"
            fill="none"
          />
          <motion.circle
            cx="36"
            cy="36"
            r="30"
            className="stroke-primary"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={RING}
            initial={{ strokeDashoffset: RING }}
            animate={{ strokeDashoffset: RING * (1 - 0.82) }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </svg>
        <div>
          <p className="text-2xl font-semibold tabular-nums">82%</p>
          <p className="text-muted-foreground text-[11px]">obłożenia dziś</p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="bg-card rounded-xl border p-2.5">
          <p className="text-muted-foreground text-[10px]">Wizyty</p>
          <p className="text-base font-semibold tabular-nums">
            <Roll value={12 + (start % 3)} />
          </p>
        </div>
        <div className="bg-card rounded-xl border p-2.5">
          <p className="text-muted-foreground text-[10px]">Przychód</p>
          <p className="text-base font-semibold tabular-nums">2 340 zł</p>
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold">Wolne terminy</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {["13:30", "15:45", "17:00"].map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5 + i * 0.12,
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            className="border-primary/30 text-primary rounded-full border px-2.5 py-1 font-mono text-[10px] font-semibold"
          >
            {t}
          </motion.span>
        ))}
      </div>
    </>
  );
}

function ClientScreen() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 items-center justify-center rounded-full text-xs font-semibold">
          NW
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">Natalia Wiśniewska</p>
          <p className="text-muted-foreground text-[10px]">
            Stała klientka, 14 wizyt
          </p>
        </div>
      </div>
      <div className="mt-2 flex gap-0.5 text-amber-500">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3 + i * 0.08,
              type: "spring",
              stiffness: 500,
              damping: 15,
            }}
          >
            <StarIcon className="size-3.5 fill-current" />
          </motion.span>
        ))}
      </div>
      <p className="mt-3 text-xs font-semibold">Koloryzacja, 30.09</p>
      <BeforeAfter className="mt-1.5 aspect-[4/3] rounded-xl" />
      <p className="text-muted-foreground mt-2 text-[10px] italic">
        Notatka: 7.1 + 8.1 (1:1), oksydant 6%
      </p>
    </>
  );
}
