import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Przychód", value: "48 320 zł", delta: "+12%" },
  { label: "Wizyty", value: "412", delta: "+8%" },
  { label: "Nowi klienci", value: "38", delta: "+5" },
  { label: "Obłożenie", value: "82%", delta: "+4 pp" },
];

// Przychód tygodniowy — jedna seria, jeden odcień (primary), bez legendy.
const weeks = [62, 70, 58, 74, 81, 77, 69, 85, 88, 79, 92, 96];

export function StatsMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Statystyki firmy: przychód, liczba wizyt, nowi klienci i obłożenie z trendem z 12 tygodni"
      className={cn("bg-card rounded-xl border p-5 text-left shadow-xl select-none", className)}
    >
      <div aria-hidden className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-lg border p-3">
              <p className="text-muted-foreground text-[11px]">{k.label}</p>
              <p className="mt-0.5 font-mono text-lg font-semibold">{k.value}</p>
              <p className="flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400">
                <TrendingUp className="size-3" /> {k.delta} vs poprz. miesiąc
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold">Przychód — ostatnie 12 tygodni</p>
          <div className="flex h-28 items-end gap-0.5 border-b">
            {weeks.map((v, i) => (
              <div
                key={i}
                className={cn("flex-1 rounded-t-[4px]", i === weeks.length - 1 ? "bg-primary" : "bg-primary/35")}
                style={{ height: `${v}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
