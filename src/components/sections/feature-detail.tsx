import Link from "next/link";
import * as motion from "motion/react-client";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import type { Feature } from "@/content/features";
import { Photo, revealGroup, revealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function FeatureDetail({
  feature,
  visual,
  reverse,
  moreLink,
}: {
  feature: Feature;
  visual?: React.ReactNode;
  reverse?: boolean;
  moreLink?: boolean;
}) {
  const Icon = feature.icon;
  return (
    <article
      id={feature.id}
      className="grid scroll-mt-24 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <motion.div
        {...revealGroup}
        data-atelier-hover
        className={cn(reverse && "lg:order-2")}
      >
        <motion.h2
          variants={revealItem}
          className="flex flex-wrap items-center gap-3 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-11 shrink-0 items-center justify-center rounded-xl">
            <Icon className="size-5" />
          </span>
          {feature.title}
          {feature.soon && <Badge variant="warning">Wkrótce</Badge>}
        </motion.h2>
        <motion.p
          variants={revealItem}
          className="text-muted-foreground mt-4 text-lg leading-relaxed"
        >
          {feature.description}
        </motion.p>
        <ul className="mt-6 space-y-3">
          {feature.points.map((p) => (
            <motion.li key={p} variants={revealItem} className="flex gap-3">
              <CheckIcon className="text-primary mt-0.5 size-5 shrink-0" />
              <span>{p}</span>
            </motion.li>
          ))}
        </ul>
        {moreLink && feature.page && (
          <Link
            href={`/funkcje/${feature.id}`}
            className="text-primary mt-6 inline-flex items-center gap-1.5 font-medium hover:underline"
          >
            Więcej: {feature.title.toLowerCase()}{" "}
            <ArrowRightIcon className="size-4" />
          </Link>
        )}
      </motion.div>
      {visual ? (
        <div className={cn(reverse && "lg:order-1")}>{visual}</div>
      ) : (
        feature.photo && (
          <div className={cn("relative", reverse && "lg:order-1")}>
            <Photo
              src={feature.photo.src}
              alt={feature.photo.alt}
              className="aspect-[16/11] shadow-xl"
            />
            {feature.photo.caption && (
              <div
                className={cn(
                  "absolute -bottom-5 max-w-[85%]",
                  reverse ? "-right-3 sm:-right-5" : "-left-3 sm:-left-5",
                )}
              >
                <p className="bg-card motion-safe:animate-float flex items-center gap-3 rounded-xl border p-3 pr-4 text-sm font-medium shadow-xl">
                  <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg">
                    <Icon className="size-4" />
                  </span>
                  {feature.photo.caption}
                </p>
              </div>
            )}
          </div>
        )
      )}
    </article>
  );
}
