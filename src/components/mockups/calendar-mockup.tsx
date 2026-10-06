import {
  CalendarDays,
  ChartColumn,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Scissors,
  Settings,
  Store,
  Undo2,
  UserCog,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AppWindow, wash } from "./app-window";

const ROW = 52; // px na godzinę
const START = 9;
const hours = [9, 10, 11, 12, 13, 14, 15, 16];

type Visit = { start: number; duration: number; client: string; service: string; dragging?: boolean };

const staff: { name: string; color: string; visits: Visit[] }[] = [
  {
    name: "Anna",
    color: "--viz-1",
    visits: [
      { start: 9, duration: 2, client: "Natalia W.", service: "Koloryzacja" },
      { start: 11.5, duration: 1, client: "Ewa K.", service: "Strzyżenie damskie" },
      { start: 14, duration: 2.5, client: "Julia P.", service: "Balayage" },
    ],
  },
  {
    name: "Kasia",
    color: "--viz-2",
    visits: [
      { start: 9.5, duration: 1.25, client: "Marta S.", service: "Manicure hybrydowy" },
      { start: 11, duration: 1.5, client: "Ola D.", service: "Paznokcie żelowe", dragging: true },
      { start: 14.5, duration: 1, client: "Zofia L.", service: "Pedicure" },
    ],
  },
  {
    name: "Marek",
    color: "--viz-3",
    visits: [
      { start: 9, duration: 0.75, client: "Piotr N.", service: "Skin fade" },
      { start: 10, duration: 1.25, client: "Tomasz R.", service: "Strzyżenie i broda" },
      { start: 13, duration: 0.5, client: "Kuba M.", service: "Trymowanie brody" },
      { start: 15, duration: 0.75, client: "Adam W.", service: "Strzyżenie klasyczne" },
    ],
  },
];

const fmt = (h: number) => `${Math.floor(h)}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;

const sidebarIcons = [LayoutDashboard, UserCog, Users, CalendarDays, Scissors, Store, ChartColumn, Settings];

export function CalendarMockup({ className }: { className?: string }) {
  return (
    <AppWindow
      label="Kalendarz wizyt Saloonik: widok dnia z osobną kolumną dla każdego pracownika"
      className={className}
    >
      <div className="flex text-left">
        {/* Sidebar jak w aplikacji */}
        <div className="bg-card hidden w-14 shrink-0 flex-col items-center gap-1 border-r py-3 sm:flex">
          {sidebarIcons.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg",
                i === 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="flex items-center gap-2 border-b px-4 py-3">
            <span className="flex size-7 items-center justify-center rounded-md border">
              <ChevronLeft className="size-3.5" />
            </span>
            <span className="flex size-7 items-center justify-center rounded-md border">
              <ChevronRight className="size-3.5" />
            </span>
            <span className="ml-1 text-sm font-semibold">Wtorek, 14 października</span>
            <span className="bg-muted ml-auto hidden rounded-lg p-0.5 text-[11px] font-medium sm:flex">
              <span className="bg-card rounded-md px-2.5 py-1 shadow-xs">Dzień</span>
              <span className="text-muted-foreground px-2.5 py-1">Tydzień</span>
              <span className="text-muted-foreground px-2.5 py-1">Miesiąc</span>
            </span>
          </div>

          {/* Nagłówki pracowników */}
          <div className="grid grid-cols-[44px_repeat(3,minmax(0,1fr))] border-b">
            <span />
            {staff.map((s) => (
              <div key={s.name} className="flex items-center gap-2 border-l px-3 py-2 text-xs font-medium">
                <span className="size-2 rounded-full" style={{ backgroundColor: `var(${s.color})` }} />
                {s.name}
              </div>
            ))}
          </div>

          {/* Siatka */}
          <div className="relative grid grid-cols-[44px_repeat(3,minmax(0,1fr))]" style={{ height: ROW * hours.length }}>
            <div>
              {hours.map((h) => (
                <div key={h} className="text-muted-foreground pr-2 text-right font-mono text-[10px]" style={{ height: ROW }}>
                  {h}:00
                </div>
              ))}
            </div>
            {staff.map((s) => (
              <div key={s.name} className="relative border-l">
                {hours.map((h) => (
                  <div key={h} className="border-b border-dashed" style={{ height: ROW }} />
                ))}
                {/* Przerwa — zakreskowana jak godziny zamknięcia w systemie */}
                {s.name === "Anna" && (
                  <div
                    className="absolute inset-x-0 opacity-60"
                    style={{
                      top: (12.5 - START) * ROW,
                      height: ROW,
                      backgroundImage:
                        "repeating-linear-gradient(135deg, var(--border) 0 1px, transparent 1px 8px)",
                    }}
                  />
                )}
                {s.visits.map((v) => (
                  <div
                    key={v.client}
                    className={cn(
                      "absolute inset-x-1 overflow-hidden rounded-md border-l-[3px] px-2 py-1",
                      v.dragging && "z-10 shadow-xl ring-2 ring-viz-2 motion-safe:-rotate-1",
                    )}
                    style={{ top: (v.start - START) * ROW + 2, height: v.duration * ROW - 4, ...wash(s.color) }}
                  >
                    <p className="text-foreground truncate text-[11px] font-semibold">{v.client}</p>
                    <p className="text-muted-foreground truncate text-[10px]">{v.service}</p>
                    {v.duration >= 1 && (
                      <p className="text-muted-foreground font-mono text-[10px]">
                        {fmt(v.start)}–{fmt(v.start + v.duration)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Toast „Cofnij” po przeniesieniu wizyty */}
      <div className="bg-foreground text-background absolute right-4 bottom-4 hidden items-center gap-3 rounded-lg px-3 py-2 text-xs shadow-lg sm:flex">
        Wizyta przeniesiona.
        <span className="inline-flex items-center gap-1 font-semibold">
          <Undo2 className="size-3.5" /> Cofnij
        </span>
      </div>
    </AppWindow>
  );
}
