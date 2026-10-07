import { TrendingUp } from "lucide-react";
import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Przychód", value: "48 320 zł", delta: "+12%" },
  { label: "Wizyty", value: "412", delta: "+8%" },
  { label: "Nowi klienci", value: "38", delta: "+5" },
  { label: "Obłożenie", value: "82%", delta: "+4 pp" },
];

const weeks = [62, 70, 58, 74, 81, 77, 69, 85, 88, 79, 92, 96];

export function StatsMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Statystyki firmy: przychód, liczba wizyt, nowi klienci i obłożenie z trendem z 12 tygodni"
      className={cn(
        "bg-card rounded-xl border p-4 text-left shadow-xl select-none",
        className,
      )}
    >
      <div aria-hidden className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-lg border px-3 py-2">
              <p className="text-muted-foreground text-[11px]">{k.label}</p>
              <p className="flex items-baseline justify-between gap-2">
                <span className="font-mono text-base font-semibold whitespace-nowrap">
                  {k.value}
                </span>
                <span className="flex items-center gap-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                  <TrendingUp className="size-3" /> {k.delta}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 flex justify-between text-xs">
            <span className="font-semibold">
              Przychód — ostatnie 12 tygodni
            </span>
            <span className="text-muted-foreground">vs poprz. miesiąc</span>
          </p>
          <div className="flex h-16 items-end gap-0.5 border-b">
            {weeks.map((v, i) => (
              <motion.div
                key={i}
                className={cn(
                  "flex-1 rounded-t-[3px]",
                  i === weeks.length - 1 ? "bg-primary" : "bg-primary/35",
                )}
                initial={{ height: "0%" }}
                whileInView={{ height: `${v}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </figure>
  );
}
