import { CheckCheck, MessageSquareText } from "lucide-react";
import { cn } from "@/lib/utils";

export function SmsMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Przykładowe automatyczne przypomnienie SMS o wizycie"
      className={cn("bg-card space-y-3 rounded-xl border p-4 text-left shadow-xl select-none", className)}
    >
      <div aria-hidden className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-full">
            <MessageSquareText className="size-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Studio Bella</p>
            <p className="text-muted-foreground text-[11px]">SMS · dzień przed wizytą</p>
          </div>
        </div>
        <p className="bg-muted rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-[13px] leading-snug">
          Dzień dobry! Przypominamy o wizycie jutro, <span className="font-semibold">15.10 o 10:00</span> —
          Koloryzacja u Anny. Do zobaczenia w Studio Bella!
        </p>
        <p className="text-muted-foreground flex items-center justify-end gap-1 text-[11px]">
          <CheckCheck className="size-3.5 text-emerald-600 dark:text-emerald-400" /> Wysłano automatycznie
        </p>
      </div>
    </figure>
  );
}
