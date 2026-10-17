import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Section, SectionHeading } from "@/components/layout/section";
import { ClientCardMockup } from "@/components/mockups/client-card-mockup";
import { WarehouseMockup } from "@/components/mockups/warehouse-mockup";
import { StatsMockup } from "@/components/mockups/stats-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";
import { getFeature, type Feature } from "@/content/features";
import * as motion from "motion/react-client";
import { revealGroup, revealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type Tile = {
  id: string;
  wide?: boolean;
  full?: boolean;
  /** Fills the row on two-column tablets, where it would otherwise sit alone. */
  mdWide?: boolean;
  points?: boolean;
  bullets?: string[];
  bulletCount?: number;
  visual?: React.ReactNode;
  // split text and visual side by side from lg instead of xl
  splitLg?: boolean;
};

const tiles: Tile[] = [
  {
    id: "klienci",
    wide: true,
    bullets: [
      "Historia wizyt ze statusem wizyty i płatności",
      "Karty zabiegowe wysyłane klientom mailem przed wizytą",
      "Zdjęcia przed i po dla każdej usługi wizyty",
      "Opinie klientów o pracownikach po wizycie",
    ],
    splitLg: true,
    visual: <ClientCardMockup visitLimit={2} className="shadow-lg" />,
  },
  { id: "przypomnienia", visual: <SmsMockup className="shadow-md" /> },
  { id: "zespol", points: true },
  {
    id: "statystyki",
    wide: true,
    bulletCount: 4,
    visual: <StatsMockup className="shadow-lg" />,
  },
  { id: "uslugi" },
  { id: "oddzialy" },
  { id: "panel", mdWide: true },
  {
    id: "magazyn",
    wide: true,
    full: true,
    splitLg: true,
    bulletCount: 4,
    visual: <WarehouseMockup className="shadow-lg" />,
  },
];

export function FeaturesBento() {
  return (
    <Section id="funkcje" aria-labelledby="funkcje-heading">
      <SectionHeading
        eyebrow="Funkcje"
        title={
          <span id="funkcje-heading">
            Wszystko, czego potrzebuje Twoja firma — w jednym programie
          </span>
        }
        description="Bez dokupowania modułów. Każda funkcja jest dostępna od pierwszego dnia okresu próbnego."
      />
      <motion.div
        {...revealGroup}
        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {tiles.map((tile) => {
          const feature = getFeature(tile.id);
          return feature ? (
            <FeatureTile key={tile.id} feature={feature} {...tile} />
          ) : null;
        })}
      </motion.div>
      <div className="mt-10 text-center">
        <Link
          href="/funkcje"
          className="text-primary inline-flex items-center gap-1.5 font-medium hover:underline"
        >
          Zobacz wszystkie funkcje <ArrowRightIcon className="size-4" />
        </Link>
      </div>
    </Section>
  );
}

function FeatureTile({
  feature,
  wide,
  full,
  mdWide,
  points,
  bullets,
  bulletCount,
  visual,
  splitLg,
}: { feature: Feature } & Tile) {
  const Icon = feature.icon;
  if (!visual && !points && feature.photo)
    return <PhotoTile feature={feature} mdWide={mdWide} />;
  return (
    <motion.article
      variants={revealItem}
      data-atelier-hover
      data-spotlight
      className={cn(
        "bg-card group flex min-w-0 flex-col gap-4 rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md",
        wide && "md:col-span-2",
        wide &&
          (splitLg
            ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-8"
            : "xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:items-start xl:gap-8"),
        full && "lg:col-span-3",
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 items-center justify-center rounded-lg">
          <Icon className="size-5" />
        </span>
        <h3 className="text-lg font-semibold">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.summary}
        </p>
        {(wide || points) && (
          <ul className="text-muted-foreground mt-1 space-y-1.5 text-sm">
            {(
              bullets ?? feature.points.slice(0, bulletCount ?? (wide ? 3 : 4))
            ).map((p) => (
              <li key={p} className="flex gap-2">
                <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />{" "}
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      {visual && (
        <div
          className={cn(
            "mt-2",
            wide ? (splitLg ? "lg:mt-0" : "xl:mt-0") : "mt-auto pt-2",
          )}
        >
          {visual}
        </div>
      )}
    </motion.article>
  );
}

// Photo fills the tile and the copy sits on it, so the picture costs no extra height.
function PhotoTile({
  feature,
  mdWide,
}: {
  feature: Feature;
  mdWide?: boolean;
}) {
  const Icon = feature.icon;
  return (
    <motion.article
      variants={revealItem}
      data-atelier-hover
      className={cn(
        "group relative isolate flex min-h-72 overflow-hidden rounded-xl border shadow-sm",
        mdWide && "md:col-span-2 lg:col-span-1",
      )}
    >
      <Image
        src={feature.photo!.src}
        alt={feature.photo!.alt}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
        className="-z-10 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
      />
      <span className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/5" />
      <Link
        href={`/funkcje#${feature.id}`}
        className="focus-visible:ring-ring/50 mt-auto flex w-full flex-col gap-2 p-6 text-white outline-none focus-visible:ring-[3px]"
      >
        <span className="mb-1 flex size-10 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/25 backdrop-blur">
          <Icon className="size-5" />
        </span>
        <h3 className="text-lg font-semibold">{feature.title}</h3>
        <p className="leading-relaxed text-white/80">{feature.summary}</p>
        <span className="flex items-center gap-1.5 text-sm font-medium opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 max-md:opacity-100">
          Zobacz, jak to działa <ArrowRightIcon className="size-4" />
        </span>
      </Link>
    </motion.article>
  );
}
