import Image from "next/image";
import { cn } from "@/lib/utils";

// "Before" is the same photo desaturated; the split sweeps on its own (CSS --split).
export function BeforeAfter({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "motion-safe:animate-sweep relative overflow-hidden",
        className,
      )}
    >
      <Image
        src="/images/koloryzacja.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 240px, 50vw"
        className="object-cover brightness-90 grayscale"
      />
      <Image
        src="/images/koloryzacja.jpg"
        alt=""
        fill
        sizes="(min-width: 1024px) 240px, 50vw"
        className="object-cover"
        style={{ clipPath: "inset(0 0 0 var(--split))" }}
      />
      <span
        className="absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow"
        style={{ left: "var(--split)" }}
      />
      <span className="bg-foreground/85 text-background absolute bottom-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium">
        Przed
      </span>
      <span className="bg-primary text-primary-foreground absolute right-1.5 bottom-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium">
        Po
      </span>
    </div>
  );
}
