import { cn } from "@/lib/utils";

export function GradientText({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "from-primary to-primary motion-safe:animate-gradient bg-linear-to-r via-rose-400 bg-size-[200%_auto] bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  );
}
