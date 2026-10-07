"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  CalendarDays,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  Hand,
  Info,
  LayoutDashboard,
  Scissors,
  Settings,
  Store,
  UserCog,
  Users,
} from "lucide-react";
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

const ROW = 48;
const GRID = { from: 9 * 60, to: 18 * 60 };
const OPEN = { from: 9 * 60, to: 17 * 60 };
const SNAP = 15;
const RESIZE_STEP = 5;
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

const sidebarIcons = [
  LayoutDashboard,
  UserCog,
  Users,
  CalendarDays,
  Scissors,
  Store,
  ChartColumn,
  Settings,
];

const toY = (minute: number) => ((minute - GRID.from) / 60) * ROW;
const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);

type Drag = DemoVisit & { mode: "move" | "resize" };

export function CalendarMockup({
  className,
  captionClassName,
}: {
  className?: string;
  captionClassName?: string;
}) {
  const [visits, setVisits] = useState(initialVisits);
  const [drag, setDrag] = useState<Drag | null>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  function update(before: DemoVisit, after: DemoVisit) {
    const replace = (v: DemoVisit) =>
      setVisits((vs) => vs.map((x) => (x.id === v.id ? v : x)));
    replace(after);
    toast.success(UPDATED_MESSAGE, {
      action: { label: "Cofnij", onClick: () => replace(before) },
    });
  }

  function commit(before: DemoVisit, after: Drag) {
    if (after.mode === "resize") {
      if (after.duration === before.duration) return;
      if (hasConflict(visits, after, before.employee, before.start))
        toast.warning(EMPLOYEE_CONFLICT_MESSAGE);
      else update(before, after);
      return;
    }
    const drop = resolveDrop(visits, before, after.employee, after.start, OPEN);
    if (drop.ok) update(before, after);
    else if (drop.reason === "closed") toast.info(CLOSED_HOURS_MESSAGE);
    else if (drop.reason === "conflict")
      toast.warning(EMPLOYEE_CONFLICT_MESSAGE);
  }

  function startDrag(
    e: React.PointerEvent,
    visit: DemoVisit,
    mode: Drag["mode"],
  ) {
    if (e.button !== 0 || !layerRef.current) return;
    e.preventDefault();
    e.stopPropagation();
    const rect = layerRef.current.getBoundingClientRect();
    const { clientX: x0, clientY: y0 } = e;
    let current: Drag | null = null;

    const onMove = (ev: PointerEvent) => {
      const dy = ev.clientY - y0;
      if (!current && Math.hypot(ev.clientX - x0, dy) < 4) return;
      const deltaMin = (dy / ROW) * 60;
      current =
        mode === "move"
          ? {
              ...visit,
              mode,
              employee: clamp(
                Math.floor(
                  ((ev.clientX - rect.left) / rect.width) * staff.length,
                ),
                0,
                staff.length - 1,
              ),
              start: clamp(
                visit.start + Math.round(deltaMin / SNAP) * SNAP,
                GRID.from,
                GRID.to - visit.duration,
              ),
            }
          : {
              ...visit,
              mode,
              duration: clamp(
                visit.duration +
                  Math.round(deltaMin / RESIZE_STEP) * RESIZE_STEP,
                RESIZE_STEP,
                GRID.to - visit.start,
              ),
            };
      setDrag(current);
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      setDrag(null);
      if (current) commit(visit, current);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  const shown = visits.map((v) => (drag?.id === v.id ? drag : v));

  return (
    <div className={className}>
      <div className="relative">
        <AppWindow
          label="Kalendarz wizyt Saloonik: widok dnia z osobną kolumną dla każdego pracownika"
          className={cn(drag && "cursor-grabbing")}
        >
          <div className="flex text-left">
            <div className="bg-card hidden w-14 shrink-0 flex-col items-center gap-1 border-r py-3 sm:flex">
              {sidebarIcons.map((Icon, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex size-9 items-center justify-center rounded-lg",
                    i === 3
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className="flex size-7 items-center justify-center rounded-md border">
                  <ChevronLeft className="size-3.5" />
                </span>
                <span className="flex size-7 items-center justify-center rounded-md border">
                  <ChevronRight className="size-3.5" />
                </span>
                <span className="ml-1 text-sm font-semibold">
                  Wtorek, 14 października
                </span>
                <span className="text-muted-foreground ml-auto hidden items-center gap-1.5 text-[11px] md:flex">
                  <Hand className="size-3.5" /> Przeciągnij wizytę albo jej
                  dolną krawędź
                </span>
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

                  <div ref={layerRef} className="absolute inset-0">
                    {shown.map((v) => {
                      const dragging = drag?.id === v.id;
                      const conflict =
                        dragging && hasConflict(visits, v, v.employee, v.start);
                      return (
                        <Tile
                          key={v.id}
                          visit={v}
                          color={staff[v.employee].color}
                          dragging={dragging}
                          conflict={conflict}
                          onMoveStart={(e) => startDrag(e, v, "move")}
                          onResizeStart={(e) => startDrag(e, v, "resize")}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppWindow>

        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-xl [contain:paint] [&_[data-sonner-toast]]:pointer-events-auto">
          <Toaster
            position="bottom-right"
            closeButton
            offset={12}
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
        <Info className="mt-px size-3.5 shrink-0" />
        Widok poglądowy na przykładowych danych. W systemie kalendarz jest
        zaawansowany i bardziej rozbudowany.
      </p>
    </div>
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
  conflict,
  onMoveStart,
  onResizeStart,
}: {
  visit: DemoVisit;
  color: string;
  dragging: boolean;
  conflict: boolean;
  onMoveStart: (e: React.PointerEvent) => void;
  onResizeStart: (e: React.PointerEvent) => void;
}) {
  const height = (visit.duration / 60) * ROW;
  const compact = height < 40;
  const time = `${formatTime(visit.start)} – ${formatTime(visit.start + visit.duration)}`;

  return (
    <motion.div
      layout="position"
      transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.8 }}
      onPointerDown={onMoveStart}
      className="group/tile @container/tile absolute cursor-grab touch-none select-none active:cursor-grabbing"
      style={{
        top: toY(visit.start),
        height,
        left: `calc(${(visit.employee * 100) / staff.length}% + 3px)`,
        width: `calc(${100 / staff.length}% - 6px)`,
        zIndex: dragging ? 50 : 10,
      }}
    >
      <motion.div
        animate={{
          scale: dragging ? 1.04 : 1,
          boxShadow: dragging
            ? "0 12px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)"
            : "0 1px 3px rgba(0,0,0,0.06)",
        }}
        className={cn(
          "bg-card relative h-full overflow-hidden rounded-md border border-l-[3px] border-transparent",
          conflict && "ring-destructive ring-2",
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
      {conflict && (
        <span className="bg-destructive absolute -top-5 left-0 z-30 rounded px-1.5 py-0.5 text-[10px] leading-none font-semibold whitespace-nowrap text-white shadow-sm">
          Pracownik ma wtedy wizytę
        </span>
      )}
      <div
        aria-hidden
        onPointerDown={onResizeStart}
        className={cn(
          "absolute inset-x-0 -bottom-0.5 z-20 flex h-2 cursor-ns-resize touch-none justify-center opacity-0 transition-opacity group-hover/tile:opacity-100",
          dragging && "opacity-100",
        )}
      >
        <span className="bg-foreground/40 mt-0.5 h-1 w-6 rounded-full" />
      </div>
    </motion.div>
  );
}
