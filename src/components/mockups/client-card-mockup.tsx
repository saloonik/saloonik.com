import {
  CalendarIcon,
  CircleCheckIcon,
  ClockIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileTextIcon,
  ImagesIcon,
  PhoneIcon,
  StarIcon,
  UploadIcon,
  UserIcon,
} from "@/components/ui/icons";
import { formatPln } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "./before-after";

const tabs = [
  { label: "Dane klienta", icon: UserIcon },
  { label: "Wizyty", icon: CalendarIcon },
  { label: "Karty zabiegowe", icon: FileTextIcon },
  { label: "Zdjęcia", icon: ImagesIcon },
  { label: "Opinia klienta", icon: StarIcon },
];

// Mirrors the "Wizyty" tab of the customer record in the app (customer-visits-timeline).
type Visit = {
  date: string;
  time: string;
  duration: string;
  services: string;
  employee: string;
  price: number;
  status: "planned" | "completed" | "cancelled";
  paid: boolean;
  color: string;
};

const visits: Visit[] = [
  {
    date: "11 listopada 2025",
    time: "10:00 – 10:45",
    duration: "45min",
    services: "Strzyżenie damskie",
    employee: "Julia Kamińska",
    price: 120,
    status: "planned",
    paid: false,
    color: "--viz-2",
  },
  {
    date: "30 września 2025",
    time: "09:00 – 11:00",
    duration: "2h",
    services: "Koloryzacja",
    employee: "Anna Nowak",
    price: 320,
    status: "completed",
    paid: true,
    color: "--viz-1",
  },
  {
    date: "2 września 2025",
    time: "16:00 – 17:00",
    duration: "1h",
    services: "Regeneracja włosów",
    employee: "Ola Zielińska",
    price: 150,
    status: "cancelled",
    paid: false,
    color: "--viz-3",
  },

];

const pill =
  "inline-flex w-fit shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium";

const statusPill: Record<Visit["status"], [string, string]> = {
  planned: ["Nie odbyta", "bg-muted text-muted-foreground"],
  completed: ["Odbyta", "bg-chart-2/10 text-chart-2 dark:bg-chart-2/20"],
  cancelled: [
    "Odwołana",
    "bg-destructive/10 text-destructive dark:bg-destructive/20",
  ],
};

function VisitTile({ visit }: { visit: Visit }) {
  const [statusLabel, statusClass] = statusPill[visit.status];
  return (
    <div
      className="min-w-0 flex-1 rounded-md border-l-[3px] px-3 py-2"
      style={{
        borderLeftColor: `var(${visit.color})`,
        backgroundColor: `color-mix(in oklab, var(${visit.color}) 15%, transparent)`,
      }}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-sm font-semibold">{visit.date}</p>
        <span className="text-muted-foreground shrink-0 text-xs font-semibold tabular-nums">
          {formatPln(visit.price)}
        </span>
      </div>
      <p className="text-muted-foreground truncate text-xs">
        {visit.time} · {visit.duration}
      </p>
      <p className="text-muted-foreground truncate text-xs">
        {visit.services} · {visit.employee}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        <span className={cn(pill, statusClass)}>{statusLabel}</span>
        <span
          className={cn(
            pill,
            visit.paid
              ? "bg-chart-2/10 text-chart-2 dark:bg-chart-2/20"
              : "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
          )}
        >
          {visit.paid ? "Opłacona" : "Nieopłacona"}
        </span>
      </div>
    </div>
  );
}

function TimelineDot({ color }: { color: string }) {
  return (
    <span className="bg-card relative z-10 flex size-4 shrink-0 items-center justify-center rounded-full">
      <span
        className="size-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}

function VisitsTimeline() {
  const upcoming = visits.filter((v) => v.status === "planned");
  const past = visits.filter((v) => v.status !== "planned");
  const row = (v: Visit) => (
    <li key={v.date} className="flex items-start gap-2.5">
      <span className="mt-3.5 flex w-4 justify-center">
        <TimelineDot color={`var(${v.color})`} />
      </span>
      <VisitTile visit={v} />
    </li>
  );
  return (
    <div>
      <p className="text-muted-foreground mb-3 flex gap-3 text-xs">
        <span>
          <span className="text-foreground font-semibold">
            {upcoming.length}
          </span>{" "}
          nadchodząca
        </span>
        <span>
          <span className="text-foreground font-semibold">{past.length}</span>{" "}
          wcześniejsze
        </span>
      </p>
      <ol className="relative space-y-2">
        <span className="bg-border absolute top-2 bottom-2 left-2 w-px -translate-x-1/2" />
        {upcoming.map(row)}
        <li className="flex items-center gap-2.5">
          <span className="flex w-4 justify-center">
            <TimelineDot color="var(--primary)" />
          </span>
          <span className="text-primary text-xs font-semibold">Dziś</span>
        </li>
        {past.map(row)}
      </ol>
    </div>
  );
}

type CardEntry = { name: string; status: "sent" | "completed"; date: string };

const cards: CardEntry[] = [
  { name: "Wywiad przed koloryzacją", status: "completed", date: "30.09" },
  { name: "Zgoda na zabieg keratynowy", status: "sent", date: "14.10" },
];

function CardStatusBadge({ status }: { status: CardEntry["status"] }) {
  const sent = status === "sent";
  const Icon = sent ? ClockIcon : CircleCheckIcon;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
        sent
          ? "bg-amber-500/10 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400"
          : "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400",
      )}
    >
      <Icon className="size-3" />
      {sent ? "Wysłana" : "Wypełniona"}
    </span>
  );
}

export function TreatmentCardsPanel({ className }: { className?: string }) {
  return (
    <div className={cn("@container space-y-2", className)}>
      {cards.map((card) => (
        <div
          key={card.name}
          className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5"
        >
          <FileTextIcon className="text-muted-foreground size-4 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{card.name}</p>
            <p className="text-muted-foreground text-[10px]">
              {card.status === "sent" ? "Wysłana mailem" : "Skan dodany"}{" "}
              {card.date}
            </p>
          </div>
          <CardStatusBadge status={card.status} />
          {card.status === "sent" ? (
            <span className="hidden items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium @sm:inline-flex">
              <UploadIcon className="size-3" /> Dodaj skan
            </span>
          ) : (
            <span className="text-muted-foreground hidden gap-1.5 @sm:flex">
              <ExternalLinkIcon className="size-3.5" />
              <DownloadIcon className="size-3.5" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function PhotoPairPanel({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <p className="text-xs font-semibold">Koloryzacja</p>
        <p className="text-muted-foreground text-[10px] whitespace-nowrap">
          wtorek, 30.09 · Anna
        </p>
      </div>
      <BeforeAfter className="aspect-[3/4] rounded-lg border" />
      <p className="text-muted-foreground text-[10px] italic">
        Notatka: 7.1 + 8.1 (1:1), oksydant 6%
      </p>
    </div>
  );
}

export function ClientCardMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Kartoteka klienta: historia wizyt z datą, usługą, pracownikiem, ceną oraz statusem wizyty i płatności"
      className={cn(
        "bg-card @container rounded-xl border p-5 text-left shadow-xl select-none",
        className,
      )}
    >
      <div aria-hidden className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 items-center justify-center rounded-full text-sm font-semibold">
            NW
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">Natalia Wiśniewska</p>
            <p className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
              <PhoneIcon className="size-3" /> 600 123 456
            </p>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden border-b pb-2">
          {tabs.map((tab, i) => (
            <span
              key={tab.label}
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium",
                i === 1
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
                i === 0 && "hidden @md:inline-flex",
              )}
            >
              <tab.icon className="size-3" />
              {tab.label}
            </span>
          ))}
        </div>

        <VisitsTimeline />
      </div>
    </figure>
  );
}

export function TreatmentCardsMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Karty zabiegowe klienta ze statusami Wysłana i Wypełniona oraz ostrzeżeniem o brakującej karcie"
      className={cn(
        "bg-card space-y-4 rounded-xl border p-5 text-left shadow-xl select-none",
        className,
      )}
    >
      <div aria-hidden className="space-y-4">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs dark:bg-amber-500/15">
          <p className="font-semibold text-amber-800 dark:text-amber-300">
            Brak wypełnionej karty
          </p>
          <p className="text-muted-foreground mt-0.5">
            Usługa „Keratynowe prostowanie” wymaga karty zabiegowej.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Wyślij kartę", "Dodaj skan", "Wydrukuj pustą kartę"].map((a) => (
              <span
                key={a}
                className="bg-background rounded-md border px-2 py-1 text-[10px] font-medium"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
        <TreatmentCardsPanel />
      </div>
    </figure>
  );
}

export function PhotosMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Zdjęcia przed i po zabiegu przypisane do usługi wizyty"
      className={cn(
        "bg-card rounded-xl border p-5 text-left shadow-xl select-none",
        className,
      )}
    >
      <div aria-hidden>
        <PhotoPairPanel className="mx-auto max-w-xs" />
      </div>
    </figure>
  );
}
