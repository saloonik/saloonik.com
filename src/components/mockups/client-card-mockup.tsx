import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Images,
  Phone,
  Star,
  Upload,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Odwzorowanie kartoteki klienta z system.saloonik.com (pre-prod, 0.2.0-beta.6):
// features/customers/components/customer-record-dialog.tsx (zakładki),
// features/treatment-cards/components/customer-treatment-cards-section.tsx (statusy kart),
// features/customer-photos (pary Przed/Po, PhotoKindBadge).

const tabs = [
  { label: "Dane klienta", icon: UserRound },
  { label: "Wizyty", icon: CalendarDays },
  { label: "Karty zabiegowe", icon: FileText },
  { label: "Zdjęcia", icon: Images },
  { label: "Opinia klienta", icon: Star },
];

type CardEntry = { name: string; status: "sent" | "completed"; date: string };

const cards: CardEntry[] = [
  { name: "Wywiad przed koloryzacją", status: "completed", date: "30.09" },
  { name: "Zgoda na zabieg keratynowy", status: "sent", date: "14.10" },
];

/** Badge statusu karty — 1:1 z CustomerCardStatusBadge w systemie. */
function CardStatusBadge({ status }: { status: CardEntry["status"] }) {
  const sent = status === "sent";
  const Icon = sent ? Clock : CheckCircle2;
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
    <div className={cn("space-y-2", className)}>
      {cards.map((card) => (
        <div key={card.name} className="flex items-center gap-2.5 rounded-lg border px-3 py-2.5">
          <FileText className="text-muted-foreground size-4 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{card.name}</p>
            <p className="text-muted-foreground text-[10px]">
              {card.status === "sent" ? "Wysłana mailem" : "Skan dodany"} {card.date}
            </p>
          </div>
          <CardStatusBadge status={card.status} />
          {card.status === "sent" ? (
            <span className="hidden items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium sm:inline-flex">
              <Upload className="size-3" /> Dodaj skan
            </span>
          ) : (
            <span className="text-muted-foreground hidden gap-1.5 sm:flex">
              <ExternalLink className="size-3.5" />
              <Download className="size-3.5" />
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Para zdjęć przed/po jednej usługi wizyty — układ jak PhotoGroupView w systemie. */
export function PhotoPairPanel({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <div>
        <p className="text-xs font-semibold">Koloryzacja</p>
        <p className="text-muted-foreground text-[10px] whitespace-nowrap">wtorek, 30.09 · Anna</p>
      </div>
      <div className="bg-border grid grid-cols-2 gap-0.5 overflow-hidden rounded-lg border">
        <div className="relative aspect-[3/4] bg-linear-to-b from-stone-300 via-amber-200/70 to-stone-400 dark:from-stone-600 dark:via-amber-900/60 dark:to-stone-800">
          <span className="bg-foreground/85 text-background absolute bottom-1 left-1 rounded-full px-1.5 py-0.5 text-[11px] font-medium shadow-sm">
            Przed
          </span>
        </div>
        <div className="relative aspect-[3/4] bg-linear-to-b from-rose-300 via-[#b0527f] to-[#5e2147] dark:from-rose-900 dark:via-[#7a2f58] dark:to-[#3b1530]">
          <span className="bg-primary text-primary-foreground absolute right-1 bottom-1 rounded-full px-1.5 py-0.5 text-[11px] font-medium shadow-sm">
            Po
          </span>
        </div>
      </div>
      <p className="text-muted-foreground text-[10px] italic">Notatka: 7.1 + 8.1 (1:1), oksydant 6%</p>
    </div>
  );
}

export function ClientCardMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Kartoteka klienta: zakładki z wizytami, kartami zabiegowymi, zdjęciami przed i po oraz opinią"
      className={cn("bg-card rounded-xl border p-5 text-left shadow-xl select-none", className)}
    >
      <div aria-hidden className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full text-sm font-semibold dark:bg-primary/20">
            NW
          </span>
          <div className="min-w-0">
            <p className="truncate font-semibold">Natalia Wiśniewska</p>
            <p className="text-muted-foreground flex items-center gap-1 font-mono text-xs">
              <Phone className="size-3" /> 600 123 456
            </p>
          </div>
        </div>

        <div className="flex gap-1 overflow-hidden border-b pb-2">
          {tabs.map((tab, i) => (
            <span
              key={tab.label}
              className={cn(
                "inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium",
                i === 2 || i === 3 ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                i === 0 && "hidden sm:inline-flex",
              )}
            >
              <tab.icon className="size-3" />
              {tab.label}
            </span>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-muted-foreground mb-2 text-[11px] font-semibold tracking-wider uppercase">
              Karty zabiegowe
            </p>
            <TreatmentCardsPanel />
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-[11px] font-semibold tracking-wider uppercase">Zdjęcia</p>
            <PhotoPairPanel />
          </div>
        </div>
      </div>
    </figure>
  );
}

/** Osobne mockupy na /funkcje. */
export function TreatmentCardsMockup({ className }: { className?: string }) {
  return (
    <figure
      role="img"
      aria-label="Karty zabiegowe klienta ze statusami Wysłana i Wypełniona oraz ostrzeżeniem o brakującej karcie"
      className={cn("bg-card space-y-4 rounded-xl border p-5 text-left shadow-xl select-none", className)}
    >
      <div aria-hidden className="space-y-4">
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2.5 text-xs dark:bg-amber-500/15">
          <p className="font-semibold text-amber-800 dark:text-amber-300">Brak wypełnionej karty</p>
          <p className="text-muted-foreground mt-0.5">Usługa „Keratynowe prostowanie” wymaga karty zabiegowej.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Wyślij kartę", "Dodaj skan", "Wydrukuj pustą kartę"].map((a) => (
              <span key={a} className="bg-background rounded-md border px-2 py-1 text-[10px] font-medium">
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
      className={cn("bg-card rounded-xl border p-5 text-left shadow-xl select-none", className)}
    >
      <div aria-hidden>
        <PhotoPairPanel className="mx-auto max-w-xs" />
      </div>
    </figure>
  );
}
