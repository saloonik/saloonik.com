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
  BellRing,
  CalendarDays,
  Check,
  Home,
  MoreHorizontal,
  Users,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { wash } from "./app-window";

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
  const ref = useRef<HTMLElement>(null);
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
  const first = phase === "notify" ? start + 1 : start;
  const shown = Array.from(
    { length: start + SHOWN - first },
    (_, i) => first + i,
  );
  const incoming = at(start + SHOWN);
  const doneCount = (start % visits.length) + (phase === "idle" ? 0 : 1);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rotateX = useSpring(tiltX, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(tiltY, { stiffness: 150, damping: 15 });

  return (
    <motion.figure
      ref={ref}
      initial={reduced ? false : { opacity: 0, y: 48, rotate: -6 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
              // short buzz, like a phone receiving a push
              rotate: phase === "notify" && !reduced ? [0, -3, 3, -2, 2, 0] : 0,
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
      aria-label="Aplikacja mobilna Saloonik — plan dnia na telefonie"
      className={cn(
        "bg-foreground mx-auto w-60 rounded-[2.5rem] p-2.5 shadow-2xl select-none dark:bg-zinc-700",
        className,
      )}
    >
      <div
        aria-hidden
        className="bg-background relative flex h-[440px] flex-col overflow-hidden rounded-[2rem]"
      >
        <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-center px-5 text-[10px] font-semibold">
          <Roll value={at(start).time} className="tabular-nums" />
          <span className="h-5 w-20 rounded-full bg-black" />
          <span className="flex justify-end gap-1">
            <Wifi className="size-3" />
            <BatteryFull className="size-3" />
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
                <BellRing className="size-3.5" />
              </span>
              <span className="min-w-0 text-left">
                <span className="block text-[11px] font-semibold">
                  Nowa rezerwacja online
                </span>
                <span className="text-muted-foreground block truncate text-[10px]">
                  {incoming.client}, {incoming.time}, {incoming.service}
                </span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 px-4 pt-4 text-left">
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
                    <p className="text-muted-foreground text-[11px]">
                      {v.service}
                    </p>
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
                          <Check className="size-3" strokeWidth={3} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
        <div className="bg-card grid grid-cols-4 border-t py-2">
          {[Home, CalendarDays, Users, MoreHorizontal].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex justify-center",
                i === 1 ? "text-primary" : "text-muted-foreground",
              )}
            >
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
  );
}
