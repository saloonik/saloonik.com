import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Feature } from "@/content/features";
import { cn } from "@/lib/utils";

export function FeatureDetail({
  feature,
  visual,
  reverse,
}: {
  feature: Feature;
  visual?: React.ReactNode;
  reverse?: boolean;
}) {
  const Icon = feature.icon;
  return (
    <article
      id={feature.id}
      className="grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className={cn(reverse && "lg:order-2")}>
        <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-11 items-center justify-center rounded-xl">
          <Icon className="size-5" />
        </span>
        <h2 className="mt-5 flex flex-wrap items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          {feature.title}
          {feature.soon && <Badge variant="warning">Wkrótce</Badge>}
        </h2>
        <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
          {feature.description}
        </p>
        <ul className="mt-6 space-y-3">
          {feature.points.map((p) => (
            <li key={p} className="flex gap-3">
              <Check className="text-primary mt-0.5 size-5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      {visual ? (
        <div className={cn(reverse && "lg:order-1")}>{visual}</div>
      ) : (
        <div
          aria-hidden
          className={cn(
            "from-primary/10 to-accent/40 hidden aspect-[4/3] items-center justify-center rounded-2xl border bg-linear-to-br lg:flex",
            reverse && "lg:order-1",
          )}
        >
          <Icon className="text-primary/40 size-24" strokeWidth={1.25} />
        </div>
      )}
    </article>
  );
}
