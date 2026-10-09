import { cn } from "@/lib/utils";

// Full viewport minus the 65px sticky header, content centered.
export const heroScreen =
  "flex min-h-[calc(100svh-65px)] flex-col justify-center py-8 sm:py-8 [@media(max-height:820px)]:py-3";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

export function Section({
  className,
  children,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("py-20 sm:py-28", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-primary mb-3 text-xs font-bold tracking-wide uppercase">
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          "font-semibold tracking-tight text-balance",
          Tag === "h1"
            ? "text-4xl sm:text-5xl lg:text-6xl"
            : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
