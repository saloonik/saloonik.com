import { cn } from "@/lib/utils";

export function AppWindow({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={cn(
        "bg-card relative overflow-hidden rounded-xl border shadow-2xl select-none",
        className,
      )}
    >
      <div
        aria-hidden
        className="bg-muted/60 flex items-center gap-2 border-b px-4 py-2.5"
      >
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="bg-background text-muted-foreground mx-auto rounded-md border px-3 py-0.5 font-mono text-[11px]">
          system.saloonik.com
        </span>
        <span className="w-10" />
      </div>
      <div aria-hidden>{children}</div>
    </figure>
  );
}

export const wash = (cssVar: string) => ({
  backgroundColor: `color-mix(in oklab, var(${cssVar}) 14%, transparent)`,
  borderColor: `var(${cssVar})`,
});
