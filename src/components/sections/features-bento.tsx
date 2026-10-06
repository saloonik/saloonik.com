import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";
import { ClientCardMockup } from "@/components/mockups/client-card-mockup";
import { StatsMockup } from "@/components/mockups/stats-mockup";
import { SmsMockup } from "@/components/mockups/sms-mockup";
import { getFeature, type Feature } from "@/content/features";
import { cn } from "@/lib/utils";

type Tile = { id: string; wide?: boolean; points?: boolean; bullets?: string[]; visual?: React.ReactNode };

const tiles: Tile[] = [
  {
    id: "klienci",
    wide: true,
    bullets: [
      "Karty zabiegowe wysyłane klientom mailem i skany wypełnionych kart",
      "Zdjęcia przed i po dla każdej usługi wizyty",
      "Historia wizyt i opinie klientów",
    ],
    visual: <ClientCardMockup className="shadow-lg" />,
  },
  { id: "przypomnienia", visual: <SmsMockup className="shadow-md" /> },
  { id: "zespol", points: true },
  { id: "statystyki", wide: true, visual: <StatsMockup className="shadow-lg" /> },
  { id: "uslugi" },
  { id: "oddzialy" },
  { id: "panel" },
];

export function FeaturesBento() {
  return (
    <Section id="funkcje" aria-labelledby="funkcje-heading">
      <SectionHeading
        eyebrow="Funkcje"
        title={<span id="funkcje-heading">Wszystko, czego potrzebuje Twoja firma — w jednym programie</span>}
        description="Bez dokupowania modułów. Każda funkcja jest dostępna od pierwszego dnia okresu próbnego."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => {
          const feature = getFeature(tile.id);
          return feature ? <FeatureTile key={tile.id} feature={feature} {...tile} /> : null;
        })}
      </div>
      <div className="mt-10 text-center">
        <Link href="/funkcje" className="text-primary inline-flex items-center gap-1.5 font-medium hover:underline">
          Zobacz wszystkie funkcje <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}

function FeatureTile({ feature, wide, points, bullets, visual }: { feature: Feature } & Tile) {
  const Icon = feature.icon;
  return (
    <article
      className={cn(
        "bg-card group flex flex-col gap-4 rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md",
        wide && "md:col-span-2 lg:grid lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-8",
      )}
    >
      <div className="flex flex-col gap-3">
        <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg dark:bg-primary/20">
          <Icon className="size-5 motion-safe:transition-transform motion-safe:group-hover:scale-110" />
        </span>
        <h3 className="text-lg font-semibold">{feature.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{feature.summary}</p>
        {(wide || points) && (
          <ul className="text-muted-foreground mt-1 space-y-1.5 text-sm">
            {(bullets ?? feature.points.slice(0, wide ? 3 : 4)).map((p) => (
              <li key={p} className="flex gap-2">
                <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" /> {p}
              </li>
            ))}
          </ul>
        )}
      </div>
      {visual && <div className={cn("mt-2", wide ? "lg:mt-0" : "mt-auto pt-2")}>{visual}</div>}
    </article>
  );
}
