"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { toast } from "sonner";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  InfoIcon,
} from "@/components/ui/icons";
import {
  formatDuration,
  formatTime,
  hasConflict,
  occupancy,
  resolveDrop,
  type DemoVisit,
} from "@/lib/calendar-demo";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { AppWindow } from "./app-window";
import { AppSidebar, LiveCaption } from "./demo";

const ROW = 48;
const GRID = { from: 9 * 60, to: 18 * 60 };
const OPEN = { from: 9 * 60, to: 17 * 60 };
const NOW = 12 * 60 + 20;
const hours = Array.from(
  { length: (GRID.to - GRID.from) / 60 + 1 },
  (_, i) => GRID.from / 60 + i,
);

const CLOSED_HOURS_MESSAGE = "Salon jest wtedy zamknięty.";
const EMPLOYEE_CONFLICT_MESSAGE = "Pracownik ma wtedy inną wizytę.";
const UPDATED_MESSAGE = "Wizyta została zaktualizowana.";

const staff = [
  {
    name: "Anna Nowak",
    initials: "AN",
    role: "Fryzjerka",
    color: "--viz-1",
    absences: [{ from: 750, to: 810 }],
  },
  {
    name: "Kasia Lis",
    initials: "KL",
    role: "Stylistka paznokci",
    color: "--viz-2",
    absences: [],
  },
  {
    name: "Marek Wójcik",
    initials: "MW",
    role: "Barber",
    color: "--viz-3",
    absences: [],
  },
];

const initialVisits: DemoVisit[] = [
  {
    id: "1",
    employee: 0,
    start: 540,
    duration: 120,
    client: "Natalia W.",
    service: "Koloryzacja",
    price: 320,
  },
  {
    id: "2",
    employee: 0,
    start: 675,
    duration: 60,
    client: "Ewa K.",
    service: "Strzyżenie damskie",
    price: 120,
  },
  {
    id: "3",
    employee: 0,
    start: 840,
    duration: 150,
    client: "Julia P.",
    service: "Balayage",
    price: 450,
  },
  {
    id: "4",
    employee: 1,
    start: 570,
    duration: 75,
    client: "Marta S.",
    service: "Manicure hybrydowy",
    price: 130,
  },
  {
    id: "5",
    employee: 1,
    start: 660,
    duration: 90,
    client: "Ola D.",
    service: "Paznokcie żelowe",
    price: 180,
  },
  {
    id: "6",
    employee: 1,
    start: 870,
    duration: 60,
    client: "Zofia L.",
    service: "Pedicure",
    price: 140,
  },
  {
    id: "7",
    employee: 2,
    start: 540,
    duration: 45,
    client: "Piotr N.",
    service: "Skin fade",
    price: 90,
  },
  {
    id: "8",
    employee: 2,
    start: 600,
    duration: 75,
    client: "Tomasz R.",
    service: "Strzyżenie i broda",
    price: 140,
  },
  {
    id: "9",
    employee: 2,
    start: 780,
    duration: 30,
    client: "Kuba M.",
    service: "Trymowanie brody",
    price: 60,
  },
  {
    id: "10",
    employee: 2,
    start: 900,
    duration: 45,
    client: "Adam W.",
    service: "Strzyżenie klasyczne",
    price: 80,
  },
];

const HATCH =
  "repeating-linear-gradient(135deg, transparent, transparent 6px, color-mix(in oklab, var(--muted-foreground) 25%, transparent) 6px, color-mix(in oklab, var(--muted-foreground) 25%, transparent) 7px)";

const toY = (minute: number) => ((minute - GRID.from) / 60) * ROW;

const ADDED_MESSAGE = "Wizyta została dodana.";
const GLIDE = { duration: 1, ease: [0.45, 0, 0.2, 1] } as const;
const SETTLE = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
} as const;
const COL_WIDTH = `${100 / staff.length}%`;

type Drag = DemoVisit & { mode: "move" | "resize" };
type Cursor = { col: number; y: number; down: boolean; visible: boolean };
type Wait = (ms: number) => Promise<void>;

const hiddenCursor: Cursor = {
  col: 1,
  y: toY(GRID.to),
  down: false,
  visible: false,
};

const newVisit: DemoVisit = {
  id: "11",
  employee: 1,
  start: 765,
  duration: 60,
  client: "Karolina B.",
  service: "Manicure klasyczny",
  price: 110,
};

// The calendar plays a scripted demo on its own; there is nothing to grab.
export function CalendarMockup({
  className,
  captionClassName,
}: {
  className?: string;
  captionClassName?: string;
}) {
  const [visits, setVisits] = useState(initialVisits);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [cursor, setCursor] = useState(hiddenCursor);
  const [caption, setCaption] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const ctrl = new AbortController();
    const wait: Wait = (ms) =>
      new Promise((resolve, reject) => {
        const t = setTimeout(resolve, ms);
        ctrl.signal.addEventListener(
          "abort",
          () => {
            clearTimeout(t);
            reject(ctrl.signal.reason);
          },
          { once: true },
        );
      });
    async function play(wait: Wait) {
      let vs = initialVisits;
      const point = async (col: number, y: number, ms = 1100) => {
        setCursor((c) => ({ ...c, col, y, visible: true }));
        await wait(ms);
      };
      const press = async (down: boolean) => {
        setCursor((c) => ({ ...c, down }));
        await wait(220);
      };

      async function move(id: string, employee: number, start: number) {
        const v = vs.find((x) => x.id === id)!;
        const after = { ...v, employee, start };
        await point(v.employee, toY(v.start) + 14);
        await press(true);
        setDrag({ ...v, mode: "move" });
        await wait(200);
        setDrag({ ...after, mode: "move" });
        await point(employee, toY(start) + 14, 1150);
        const drop = resolveDrop(vs, v, employee, start, OPEN);
        if (drop.ok) {
          vs = vs.map((x) => (x.id === id ? after : x));
          setVisits(vs);
        }
        setDrag(null);
        await press(false);
        if (drop.ok) toast.success(UPDATED_MESSAGE);
        else if (drop.reason === "closed") toast.info(CLOSED_HOURS_MESSAGE);
        else toast.warning(EMPLOYEE_CONFLICT_MESSAGE);
        await wait(1800);
      }

      async function resize(id: string, duration: number) {
        const v = vs.find((x) => x.id === id)!;
        const after = { ...v, duration };
        await point(v.employee, toY(v.start + v.duration) - 3);
        await press(true);
        setDrag({ ...v, mode: "resize" });
        await wait(200);
        setDrag({ ...after, mode: "resize" });
        await point(v.employee, toY(v.start + duration) - 3, 1150);
        vs = vs.map((x) => (x.id === id ? after : x));
        setVisits(vs);
        setDrag(null);
        await press(false);
        toast.success(UPDATED_MESSAGE);
        await wait(1800);
      }

      async function add(visit: DemoVisit) {
        await point(visit.employee, toY(visit.start) + 14);
        await press(true);
        await press(false);
        vs = [...vs, visit];
        setFresh(visit.id);
        setVisits(vs);
        toast.success(ADDED_MESSAGE);
        await wait(2000);
      }

      await wait(1000);
      setCaption("Przenoszenie wizyty do innego pracownika");
      await move("2", 2, 690);
      setCaption("Wydłużanie wizyty o kwadrans");
      await resize("7", 60);
      setCaption("Kalendarz pilnuje, by wizyty się nie nakładały");
      await move("6", 0, 870);
      setCaption("Dodawanie wizyty w wolnym terminie");
      await add(newVisit);
      setCaption("Wizyty poza godzinami otwarcia są blokowane");
      await move("10", 2, 1035);
      setCursor((c) => ({ ...c, visible: false }));
      setCaption(null);
      await wait(2600);
      setFading(true);
      await wait(500);
      setVisits(initialVisits);
      setFresh(null);
      setFading(false);
    }

    (async () => {
      for (;;) await play(wait);
    })().catch(() => {});
    return () => {
      ctrl.abort();
      setVisits(initialVisits);
      setDrag(null);
      setCursor(hiddenCursor);
      setCaption(null);
      setFresh(null);
      setFading(false);
    };
  }, [inView, reduceMotion]);

  const shown = visits.map((v) => (drag?.id === v.id ? drag : v));

  return (
    <div ref={rootRef} className={className}>
      <div className="relative">
        <AppWindow label="Kalendarz wizyt Saloonik: widok dnia z osobną kolumną dla każdego pracownika">
          <div className="flex text-left">
            <AppSidebar active={CalendarIcon} />

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className="flex size-7 items-center justify-center rounded-md border">
                  <ChevronLeftIcon className="size-3.5" />
                </span>
                <span className="flex size-7 items-center justify-center rounded-md border">
                  <ChevronRightIcon className="size-3.5" />
                </span>
                <span className="ml-1 text-sm font-semibold">
                  Wtorek, 14 października
                </span>
                <LiveCaption caption={caption} className="ml-auto" />
              </div>

              <div className="flex border-b">
                <div className="relative w-12 shrink-0 border-r">
                  <HourLabel className="bottom-0 translate-y-1/2">
                    {formatTime(GRID.from)}
                  </HourLabel>
                </div>
                {staff.map((s, i) => {
                  const rate = occupancy(shown, i, OPEN, s.absences);
                  return (
                    <div
                      key={s.name}
                      className="relative flex min-w-0 flex-1 items-center justify-center gap-2 border-r px-2 py-2.5 last:border-r-0"
                    >
                      <span
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: `var(${s.color})` }}
                      >
                        {s.initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium">{s.name}</p>
                        <p className="flex items-baseline gap-1.5">
                          <span className="text-muted-foreground hidden truncate text-[10px] lg:inline">
                            {s.role}
                          </span>
                          <span className="text-muted-foreground font-mono text-[10px] tabular-nums">
                            {Math.round(rate * 100)}%
                          </span>
                        </p>
                      </div>
                      <span className="bg-muted absolute inset-x-0 bottom-0 h-0.75">
                        <motion.span
                          className="bg-primary block h-full"
                          animate={{ width: `${Math.min(rate * 100, 100)}%` }}
                          initial={false}
                        />
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex pb-3">
                <div
                  className="relative w-12 shrink-0 border-r"
                  style={{ height: toY(GRID.to) }}
                >
                  {hours.slice(1).map((h) => (
                    <HourLabel
                      key={h}
                      className="-translate-y-1/2"
                      style={{ top: toY(h * 60) }}
                    >
                      {formatTime(h * 60)}
                    </HourLabel>
                  ))}
                  <span
                    className="bg-primary text-primary-foreground absolute right-1.5 z-20 -translate-y-1/2 rounded-md px-1 py-0.5 text-[10px] leading-none font-semibold"
                    style={{ top: toY(NOW) }}
                  >
                    {formatTime(NOW)}
                  </span>
                </div>

                <div
                  className="relative flex-1"
                  style={{ height: toY(GRID.to) }}
                >
                  <div className="absolute inset-0 flex">
                    {staff.map((s) => (
                      <div
                        key={s.name}
                        className="relative flex-1 border-r last:border-r-0"
                      >
                        {hours.slice(0, -1).map((h) => (
                          <div
                            key={h}
                            className="border-b"
                            style={{ height: ROW }}
                          >
                            <div className="border-border/60 h-1/2 border-b border-dashed" />
                          </div>
                        ))}
                        {s.absences.map((a) => (
                          <Hatched
                            key={a.from}
                            top={toY(a.from)}
                            height={toY(a.to) - toY(a.from)}
                            label="Przerwa"
                          />
                        ))}
                      </div>
                    ))}
                  </div>

                  <Hatched
                    top={toY(OPEN.to)}
                    height={toY(GRID.to) - toY(OPEN.to)}
                    label="Zamknięte"
                  />

                  <div
                    className="pointer-events-none absolute inset-x-0 z-20 flex -translate-y-1/2 items-center"
                    style={{ top: toY(NOW) }}
                  >
                    <span className="bg-primary ring-background size-2 shrink-0 rounded-full ring-2" />
                    <div className="bg-primary ml-1 h-px flex-1" />
                  </div>

                  <motion.div
                    className="absolute inset-0"
                    animate={{ opacity: fading ? 0 : 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {shown.map((v) => {
                      const dragging = drag?.id === v.id;
                      const warning = !dragging
                        ? null
                        : v.start >= OPEN.to
                          ? "Salon jest wtedy zamknięty"
                          : hasConflict(visits, v, v.employee, v.start)
                            ? "Pracownik ma wtedy wizytę"
                            : null;
                      return (
                        <Tile
                          key={v.id}
                          visit={v}
                          color={staff[v.employee].color}
                          dragging={dragging}
                          fresh={fresh === v.id}
                          warning={warning}
                        />
                      );
                    })}
                    <DemoCursor cursor={cursor} />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </AppWindow>

        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-xl [contain:paint]">
          <Toaster
            position="bottom-right"
            offset={12}
            duration={2600}
            className="origin-bottom-right scale-80"
          />
        </div>
      </div>
      <p
        className={cn(
          "text-muted-foreground mt-3 flex items-start gap-1.5 px-1 text-xs text-pretty",
          captionClassName,
        )}
      >
        <InfoIcon className="mt-px size-3.5 shrink-0" />
        Widok poglądowy na przykładowych danych. W systemie kalendarz jest
        zaawansowany i bardziej rozbudowany.
      </p>
    </div>
  );
}

function DemoCursor({ cursor }: { cursor: Cursor }) {
  return (
    <motion.div
      className="pointer-events-none absolute top-0 left-0 z-60 h-5"
      style={{ width: COL_WIDTH }}
      initial={false}
      animate={{
        x: `${cursor.col * 100 + 50}%`,
        y: cursor.y,
        opacity: cursor.visible ? 1 : 0,
      }}
      transition={{ ...GLIDE, opacity: { duration: 0.3 } }}
    >
      <AnimatePresence>
        {cursor.down && (
          <motion.span
            className="border-primary absolute -top-3 -left-3 size-6 rounded-full border-2"
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      <motion.svg
        viewBox="0 0 20 20"
        className="size-5 drop-shadow-md"
        animate={{ scale: cursor.down ? 0.82 : 1 }}
        style={{ originX: 0, originY: 0 }}
      >
        <path
          d="M2 1.5 L2 16.5 L6.2 12.6 L9 18.5 L11.6 17.3 L8.9 11.5 L14.6 11.5 Z"
          className="fill-foreground stroke-background"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

function HourLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground bg-secondary absolute right-1.5 rounded-md px-1 py-0.5 text-[10px] leading-none",
        className,
      )}
      {...props}
    />
  );
}

function Hatched({
  top,
  height,
  label,
}: {
  top: number;
  height: number;
  label: string;
}) {
  return (
    <div
      className="bg-muted/40 pointer-events-none absolute inset-x-0 overflow-hidden"
      style={{ top, height, backgroundImage: HATCH }}
    >
      <span className="text-muted-foreground bg-background/70 absolute top-1 left-1/2 -translate-x-1/2 rounded px-1 py-0.5 text-[10px] font-semibold whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

function Tile({
  visit,
  color,
  dragging,
  fresh,
  warning,
}: {
  visit: DemoVisit;
  color: string;
  dragging: boolean;
  fresh: boolean;
  warning: string | null;
}) {
  const height = (visit.duration / 60) * ROW;
  const compact = height < 40;
  const time = `${formatTime(visit.start)} – ${formatTime(visit.start + visit.duration)}`;
  const pos = { x: `${visit.employee * 100}%`, y: toY(visit.start), height };

  return (
    <motion.div
      className="@container/tile absolute top-0 left-0 px-[3px] will-change-transform"
      initial={fresh ? { ...pos, opacity: 0, scale: 0.6 } : false}
      animate={{ ...pos, opacity: 1, scale: 1 }}
      transition={dragging ? GLIDE : SETTLE}
      style={{ width: COL_WIDTH, zIndex: dragging ? 50 : 10 }}
    >
      <motion.div
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        animate={{
          scale: dragging ? 1.05 : 1,
          rotate: dragging ? -1 : 0,
          boxShadow: dragging
            ? "0 12px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)"
            : "0 1px 3px rgba(0,0,0,0.06)",
        }}
        className={cn(
          "bg-card relative h-full overflow-hidden rounded-md border border-l-[3px] border-transparent",
          warning && "ring-destructive ring-2",
          fresh && "ring-primary ring-2 motion-safe:animate-pulse",
        )}
        style={{ borderLeftColor: `var(${color})` }}
      >
        <div
          className="flex h-full flex-col gap-0.5 overflow-hidden px-1.5 py-1"
          style={{
            backgroundColor: `color-mix(in oklab, var(${color}) 15%, transparent)`,
          }}
        >
          {compact ? (
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="text-muted-foreground shrink-0 text-[10px] leading-none font-semibold">
                {formatTime(visit.start)}
              </span>
              <span className="text-foreground truncate text-xs leading-none font-semibold">
                {visit.client}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground text-[10px] leading-none font-semibold whitespace-nowrap">
                  {time}
                </span>
                <span className="text-muted-foreground ml-auto hidden text-[10px] leading-none @[130px]/tile:block">
                  {formatDuration(visit.duration)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <p className="text-foreground min-w-0 truncate text-xs leading-tight font-semibold sm:text-sm">
                  {visit.client}
                </p>
                <span className="text-muted-foreground hidden shrink-0 text-xs leading-tight font-semibold xl:inline">
                  {visit.price} zł
                </span>
              </div>
              <p className="text-muted-foreground flex items-center gap-1 text-[11px] leading-tight sm:text-xs">
                <span
                  className="size-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: `var(${color})` }}
                />
                <span className="truncate">{visit.service}</span>
              </p>
            </>
          )}
        </div>
      </motion.div>
      {warning && (
        <span className="bg-destructive absolute -top-5 left-[3px] z-30 rounded px-1.5 py-0.5 text-[10px] leading-none font-semibold whitespace-nowrap text-white shadow-sm">
          {warning}
        </span>
      )}
      {dragging && (
        <span className="absolute inset-x-0 -bottom-0.5 z-20 flex h-2 justify-center">
          <span className="bg-foreground/40 mt-0.5 h-1 w-6 rounded-full" />
        </span>
      )}
    </motion.div>
  );
}
