import { cn } from "@/lib/utils";

// Odpowiednik powered-text.tsx z systemu (z dodanym keyframe `gradient` w globals.css).
export function GradientText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "from-primary to-primary bg-linear-to-r via-rose-400 bg-size-[200%_auto] bg-clip-text text-transparent motion-safe:animate-gradient",
        className,
      )}
      {...props}
    />
  );
}
