import { cn } from "@/lib/utils";

const blobs = [
  "bg-primary/12 dark:bg-primary/10 size-[480px] -top-[12%] -left-[8%] motion-safe:animate-drift-a",
  "bg-primary/8 size-[420px] top-[30%] -right-[6%] motion-safe:animate-drift-b",
  "bg-primary/10 dark:bg-primary/6 size-[620px] top-[45%] left-[30%] motion-safe:animate-drift-a [animation-duration:20s]",
];

const marks: {
  kind: "thread" | "pin" | "cross";
  className: string;
  rotate: number;
  delay: number;
}[] = [
  {
    kind: "thread",
    className: "top-[16%] left-[6%] w-20",
    rotate: -18,
    delay: 0,
  },
  { kind: "pin", className: "top-[20%] right-[12%] w-7", rotate: 6, delay: 1 },
  {
    kind: "cross",
    className: "top-[8%] right-[38%] w-5",
    rotate: -12,
    delay: 1.8,
  },
  {
    kind: "thread",
    className: "top-[52%] left-[3%] w-16",
    rotate: 10,
    delay: 2.5,
  },
  {
    kind: "pin",
    className: "bottom-[30%] right-[4%] w-6",
    rotate: 12,
    delay: 0.5,
  },
  {
    kind: "cross",
    className: "bottom-[12%] left-[40%] w-5",
    rotate: 15,
    delay: 0.8,
  },
];

function Mark({ kind }: { kind: "thread" | "pin" | "cross" }) {
  if (kind === "thread")
    return (
      <svg viewBox="0 0 64 20" fill="none" className="w-full">
        <path
          d="M2 10 Q 12 2, 22 10 T 42 10 T 62 10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="1 6"
        />
      </svg>
    );
  if (kind === "pin")
    return (
      <svg viewBox="0 0 24 24" fill="none" className="w-full">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full">
      <path
        d="M6 6 L18 18 M18 6 L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeroBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "from-primary/5 via-background to-background dark:from-primary/10 pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-linear-to-br",
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {blobs.map((b) => (
        <div key={b} className={cn("absolute rounded-full blur-3xl", b)} />
      ))}
      {marks.map((m, i) => (
        <div
          key={i}
          className={cn(
            "text-primary/15 dark:text-primary/20 motion-safe:animate-bob absolute hidden md:block",
            m.className,
          )}
          style={{
            ["--r" as string]: `${m.rotate}deg`,
            animationDelay: `${m.delay}s`,
            transform: `rotate(${m.rotate}deg)`,
          }}
        >
          <Mark kind={m.kind} />
        </div>
      ))}
    </div>
  );
}
