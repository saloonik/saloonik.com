import { CalendarDays, Home, MoreHorizontal, Users } from "lucide-react";
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
    time: "12:30",
    client: "Ola D.",
    service: "Paznokcie żelowe",
    color: "--viz-2",
  },
  { time: "14:00", client: "Julia P.", service: "Balayage", color: "--viz-1" },
  { time: "15:00", client: "Adam W.", service: "Strzyżenie", color: "--viz-3" },
];

export function PhoneMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Aplikacja mobilna Saloonik — plan dnia na telefonie"
      className={cn(
        "bg-foreground mx-auto w-60 rounded-[2.5rem] p-2.5 shadow-2xl select-none dark:bg-zinc-700",
        className,
      )}
    >
      <div
        aria-hidden
        className="bg-background flex h-[440px] flex-col overflow-hidden rounded-[2rem]"
      >
        <div className="mx-auto mt-2 h-5 w-20 rounded-full bg-black" />
        <div className="flex-1 space-y-3 px-4 pt-4 text-left">
          <p className="text-primary text-[10px] font-bold tracking-wide uppercase">
            Dzisiaj
          </p>
          <p className="text-lg font-semibold">Wtorek, 14.10</p>
          {visits.map((v) => (
            <div
              key={v.time}
              className="rounded-lg border-l-[3px] px-3 py-2"
              style={wash(v.color)}
            >
              <p className="text-muted-foreground font-mono text-[10px]">
                {v.time}
              </p>
              <p className="text-xs font-semibold">{v.client}</p>
              <p className="text-muted-foreground text-[11px]">{v.service}</p>
            </div>
          ))}
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
              <Icon className="size-5" />
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
