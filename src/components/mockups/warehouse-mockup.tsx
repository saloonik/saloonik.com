import * as motion from "motion/react-client";
import { CheckIcon, TriangleAlertIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const products = [
  { name: "Farba 6.0", stock: "12 szt.", fill: 0.8 },
  { name: "Maska 500 ml", stock: "200 ml", fill: 0.4 },
  { name: "Szampon regenerujący", stock: "3 szt.", fill: 0.15, low: true },
  { name: "Olejek arganowy", stock: "8 szt.", fill: 0.6 },
];

const ease = [0.22, 1, 0.36, 1] as const;

// Stock bars fill in, the low item flags itself, then a sale lands at the bottom.
export function WarehouseMockup({ className }: { className?: string }) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ show: { transition: { staggerChildren: 0.12 } } }}
      role="img"
      aria-label="Magazyn: stany produktów z ostrzeżeniem o kończącym się szamponie i zapisana sprzedaż"
      className={cn(
        "bg-card rounded-xl border p-4 text-left shadow-xl select-none",
        className,
      )}
    >
      <div aria-hidden className="space-y-3">
        <p className="flex items-baseline justify-between text-xs">
          <span className="font-semibold">Stany w oddziale Kraków</span>
          <span className="text-muted-foreground">Na sprzedaż</span>
        </p>
        <ul className="space-y-2.5">
          {products.map((p) => (
            <motion.li
              key={p.name}
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
              }}
              className="space-y-1"
            >
              <p className="flex items-center justify-between gap-2 text-xs">
                <span className="flex min-w-0 items-center gap-1.5 font-medium">
                  <span className="truncate">{p.name}</span>
                  {p.low && (
                    <motion.span
                      variants={{
                        hidden: { opacity: 0, scale: 0.6 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          transition: {
                            delay: 0.9,
                            type: "spring",
                            stiffness: 400,
                            damping: 18,
                          },
                        },
                      }}
                      className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400"
                    >
                      <TriangleAlertIcon className="size-3" /> Kończy się
                    </motion.span>
                  )}
                </span>
                <span className="text-muted-foreground shrink-0 font-mono text-[11px]">
                  {p.stock}
                </span>
              </p>
              <span className="bg-muted block h-1.5 overflow-hidden rounded-full">
                <motion.span
                  variants={{
                    hidden: { scaleX: 0 },
                    show: {
                      scaleX: p.fill,
                      transition: { duration: 0.9, ease, delay: 0.2 },
                    },
                  }}
                  className={cn(
                    "block h-full origin-left rounded-full",
                    p.low ? "bg-amber-500" : "bg-primary/70",
                  )}
                />
              </span>
            </motion.li>
          ))}
        </ul>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 1.2,
                type: "spring",
                stiffness: 260,
                damping: 22,
              },
            },
          }}
          className="bg-muted/60 flex items-center gap-2 rounded-lg px-3 py-2 text-[11px]"
        >
          <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
            <CheckIcon className="size-3" />
          </span>
          <span className="min-w-0 flex-1 truncate">
            Sprzedaż przy wizycie: Olejek arganowy ×1
          </span>
          <span className="font-mono font-semibold">89 zł</span>
        </motion.p>
      </div>
    </motion.figure>
  );
}
