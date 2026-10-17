import * as motion from "motion/react-client";
import { CheckCheckIcon, MessageSquareTextIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const inView = {
  initial: "typing",
  whileInView: "sent",
  viewport: { once: true, amount: 0.6 },
} as const;

// Typing dots first, then the message; both share one grid cell so nothing jumps.
export function SmsMockup({ className }: { className?: string }) {
  return (
    <motion.figure
      {...inView}
      role="img"
      aria-label="Przykładowe automatyczne przypomnienie SMS o wizycie"
      className={cn(
        "bg-card space-y-3 rounded-xl border p-4 text-left shadow-xl select-none",
        className,
      )}
    >
      <div aria-hidden className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
            <MessageSquareTextIcon className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Studio Bella</p>
            <p className="text-muted-foreground text-[11px]">
              SMS · dzień przed wizytą
            </p>
          </div>
        </div>
        <div className="grid">
          <motion.p
            variants={{
              typing: { opacity: 0, y: 8, scale: 0.96 },
              sent: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  delay: 1.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                },
              },
            }}
            className="bg-muted col-start-1 row-start-1 origin-top-left rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13px] leading-snug"
          >
            Dzień dobry! Przypominamy o wizycie jutro,{" "}
            <span className="font-semibold">15.10 o 10:00</span> — Koloryzacja u
            Anny. Do zobaczenia w Studio Bella!
          </motion.p>
          <motion.span
            variants={{
              typing: { opacity: 1 },
              sent: { opacity: 0, transition: { delay: 1 } },
            }}
            className="bg-muted col-start-1 row-start-1 flex h-9 w-16 items-center justify-center gap-1 self-start rounded-2xl rounded-tl-sm"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="bg-muted-foreground/60 size-1.5 rounded-full motion-safe:animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </motion.span>
        </div>
        <motion.p
          variants={{
            typing: { opacity: 0 },
            sent: { opacity: 1, transition: { delay: 1.6 } },
          }}
          className="text-muted-foreground flex items-center justify-end gap-1 text-[11px]"
        >
          <CheckCheckIcon
            className="size-3.5 text-emerald-600 dark:text-emerald-400"
            animate="play"
          />{" "}
          Wysłano automatycznie
        </motion.p>
      </div>
    </motion.figure>
  );
}
