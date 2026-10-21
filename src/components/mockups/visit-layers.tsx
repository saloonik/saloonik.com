"use client";

import Image from "next/image";
import { motion, type TargetAndTransition } from "motion/react";
import {
  CalendarIcon,
  CalendarPlusIcon,
  CameraIcon,
  ChartColumnIcon,
  CircleCheckIcon,
  ClipboardListIcon,
  ClockIcon,
  EyeIcon,
  FileTextIcon,
  ImagesIcon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  MessageSquareTextIcon,
  PhoneIcon,
  PrinterIcon,
  ReceiptIcon,
  ShoppingBagIcon,
  StarIcon,
  TriangleAlertIcon,
  UploadIcon,
  UserIcon,
} from "@/components/ui/icons";
import type { IndustryVisit, VisitLayer } from "@/content/industries";
import { formatTime } from "@/lib/calendar-demo";
import { formatPln } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => !w.endsWith("."))
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

export const pill =
  "inline-flex w-fit shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium";
export const emerald =
  "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
export const amber =
  "bg-amber-500/10 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
export const caps =
  "text-muted-foreground text-[10px] font-semibold tracking-wider uppercase";
export const tint = (cssVar: string, pct = 14) =>
  `color-mix(in oklab, var(${cssVar}) ${pct}%, transparent)`;

const box = "bg-card overflow-hidden rounded-xl border text-left shadow-2xl";

export function StatusPills({
  status,
  paid,
}: {
  status: "planned" | "completed";
  paid: boolean;
}) {
  return (
    <span className="flex flex-wrap gap-1.5">
      <span
        className={cn(
          pill,
          status === "completed" ? emerald : "bg-muted text-muted-foreground",
        )}
      >
        {status === "completed" ? "Zakończona" : "Niezakończona"}
      </span>
      <span className={cn(pill, paid ? emerald : amber)}>
        {paid ? "Opłacona" : "Nieopłacona"}
      </span>
    </span>
  );
}

// Driven by the layer's "hidden" → "shown" variants, so it plays after the layer lands.
const flip = (from: TargetAndTransition, to: TargetAndTransition) => ({
  variants: {
    hidden: from,
    shown: { ...to, transition: { delay: 4.8 } },
  },
});

// Both states share one grid cell, so the swap doesn't move anything.
function Swap({ from, to }: { from: React.ReactNode; to: React.ReactNode }) {
  return (
    <span className="grid *:col-start-1 *:row-start-1">
      <motion.span {...flip({ opacity: 1 }, { opacity: 0 })}>
        {from}
      </motion.span>
      <motion.span
        {...flip({ opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1 })}
      >
        {to}
      </motion.span>
    </span>
  );
}

export function VisitLayerView({ visit }: { visit: IndustryVisit }) {
  const { layer } = visit;
  switch (layer.kind) {
    case "photos":
    case "card":
    case "cardMissing":
    case "rating":
      return <RecordDialog visit={visit} layer={layer} />;
    case "preview":
      return <CustomerPreview visit={visit} {...layer} />;
    case "employee":
      return <EmployeeVisits visit={visit} {...layer} />;
    case "wrapup":
      return <WrapUp visit={visit} {...layer} />;
    case "slots":
      return <FreeSlots visit={visit} {...layer} />;
    case "week":
      return <WeekSummary visit={visit} {...layer} />;
    default:
      return <CustomerRecord visit={visit} layer={layer} />;
  }
}

// --- "Dokumentacja wizyty" dialog (visit-record) -------------------------------

type RecordLayer = Extract<
  VisitLayer,
  { kind: "photos" | "card" | "cardMissing" | "rating" }
>;

function RecordDialog({
  visit,
  layer,
}: {
  visit: IndustryVisit;
  layer: RecordLayer;
}) {
  const hasCards = layer.kind === "card" || layer.kind === "cardMissing";
  const tabs = [
    hasCards && { label: "Karty zabiegowe", icon: ClipboardListIcon },
    { label: "Zdjęcia", icon: ImagesIcon },
    layer.kind === "rating" && { label: "Oceny", icon: StarIcon },
  ].filter((t) => !!t);
  const active = hasCards
    ? "Karty zabiegowe"
    : layer.kind === "rating"
      ? "Oceny"
      : "Zdjęcia";

  return (
    <div className={box}>
      <div className="border-b px-4 pt-4">
        <p className="text-sm font-semibold tracking-tight">
          Dokumentacja wizyty
        </p>
        <p className="text-muted-foreground mt-0.5 truncate text-[11px]">
          {visit.customer}, {visit.date}, {formatTime(visit.start)},{" "}
          {visit.services.join(", ")}
        </p>
        <div className="mt-3 -mb-px flex gap-4">
          {tabs.map(({ label, icon: Icon }) => (
            <span
              key={label}
              className={cn(
                "flex items-center gap-1.5 border-b-2 pb-2 text-xs font-medium",
                label === active
                  ? "border-primary"
                  : "text-muted-foreground border-transparent",
              )}
            >
              {label === "Karty zabiegowe" && layer.kind === "cardMissing" ? (
                <TriangleAlertIcon className="size-3.5 text-amber-600" />
              ) : (
                <Icon className="size-3.5" />
              )}
              {label}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <p className={caps}>{active}</p>
        {layer.kind === "card" && (
          <CardEntry name={layer.name} sent={layer.sent} />
        )}
        {layer.kind === "cardMissing" && <MissingCard name={layer.name} />}
        {layer.kind === "photos" && (
          <>
            <p className="text-xs font-medium">{visit.services[0]}</p>
            <div className="grid grid-cols-2 gap-2">
              <Photo
                src={layer.image}
                label="Przed"
                className={layer.after ? "brightness-90 grayscale" : undefined}
              />
              {layer.after ? (
                <Photo src={layer.image} label="Po" />
              ) : (
                <span className="text-muted-foreground flex aspect-[4/5] flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed text-[11px]">
                  <CameraIcon className="size-4" />
                  Dodaj „po”
                </span>
              )}
            </div>
          </>
        )}
        {layer.kind === "rating" && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <Stars value={layer.stars} />
              <span className="text-muted-foreground font-mono text-[11px]">
                {layer.date}
              </span>
            </div>
            <p className="text-[13px] leading-snug">{layer.comment}</p>
            <p className="text-muted-foreground text-[11px]">
              {visit.customer} · {visit.services.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Photo({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-lg border">
      <Image
        src={src}
        alt=""
        fill
        sizes="(min-width: 1024px) 180px, 40vw"
        className={cn("object-cover", className)}
      />
      <span className="bg-background/90 absolute bottom-1.5 left-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium">
        {label}
      </span>
    </div>
  );
}

const square = "flex size-8 shrink-0 items-center justify-center rounded-lg";

// The client fills the card online and the entry turns green.
function CardEntry({ name, sent }: { name: string; sent: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border px-3 py-3">
      <Swap
        from={
          <span className={cn(square, amber)}>
            <ClockIcon className="size-4" />
          </span>
        }
        to={
          <span className={cn(square, emerald)}>
            <FileTextIcon className="size-4" />
          </span>
        }
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs leading-snug font-medium">{name}</p>
        <p className="text-muted-foreground text-[11px]">Wysłana {sent}</p>
      </div>
      <Swap from={<CardBadge sent />} to={<CardBadge />} />
    </div>
  );
}

function CardBadge({ sent }: { sent?: boolean }) {
  return sent ? (
    <span className={cn(pill, amber)}>
      <ClockIcon className="size-3" /> Wysłana
    </span>
  ) : (
    <span className={cn(pill, emerald)}>
      <CircleCheckIcon className="size-3" /> Wypełniona
    </span>
  );
}

function MissingCard({ name }: { name: string }) {
  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-3 dark:bg-amber-500/15">
      <p className="flex items-center gap-2 text-xs font-medium text-amber-800 dark:text-amber-300">
        <TriangleAlertIcon className="size-4 shrink-0" /> Brak wypełnionej karty
      </p>
      <p className="text-muted-foreground mt-1 pl-6 text-[11px]">
        Usługa wymaga karty: {name}.
      </p>
      <div className="mt-2.5 flex flex-wrap gap-1.5 pl-6">
        {(
          [
            [MailIcon, "Wyślij kartę"],
            [UploadIcon, "Dodaj skan"],
            [PrinterIcon, "Wydrukuj pustą kartę"],
          ] as const
        ).map(([Icon, label]) => (
          <span
            key={label}
            className="bg-background inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium"
          >
            <Icon className="size-3" /> {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stars({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          className={cn(
            "size-3.5",
            i <= Math.round(value)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/40",
          )}
        />
      ))}
    </span>
  );
}

// --- Calendar's quick preview (calendar-reservation-preview) --------------------

function CustomerPreview({
  visit,
  visits,
  last,
  paid,
}: {
  visit: IndustryVisit;
  visits: number;
  last: string;
  paid: number;
}) {
  const total = visits + 1;
  return (
    <div className={box}>
      <div
        className="flex items-start justify-between gap-2 border-l-4 px-4 py-3"
        style={{
          borderLeftColor: `var(${visit.employeeColor})`,
          backgroundColor: tint(visit.employeeColor, 12),
        }}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{visit.customer}</p>
          <p className="text-muted-foreground flex items-center gap-1 text-[11px]">
            <PhoneIcon className="size-3" /> {visit.phone} · {total}{" "}
            {total < 5 ? "wizyty" : "wizyt"}
          </p>
        </div>
        <EyeIcon className="size-4 shrink-0" />
      </div>
      <dl className="grid grid-cols-3 gap-2 px-4 py-3 text-center">
        {(
          [
            ["Zakończone", String(visits)],
            ["Ostatnio", last],
            ["Zapłacono", formatPln(paid)],
          ] as const
        ).map(([label, value]) => (
          <div key={label}>
            <dt className={caps}>{label}</dt>
            <dd className="mt-0.5 text-[13px] font-semibold whitespace-nowrap tabular-nums">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// --- Employee's visit list (employee-visits-sheet) ------------------------------

function EmployeeVisits({
  visit,
  role,
  visits,
}: {
  visit: IndustryVisit;
  role: string;
  visits: Extract<VisitLayer, { kind: "employee" }>["visits"];
}) {
  return (
    <div className={cn(box, "space-y-3 p-4")}>
      <div className="flex items-center gap-3">
        <span
          className="flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white"
          style={{ backgroundColor: `var(${visit.employeeColor})` }}
        >
          {initials(visit.employee)}
        </span>
        <div>
          <p className="text-sm font-semibold">{visit.employee}</p>
          <p className="text-muted-foreground text-[11px]">{role}</p>
        </div>
      </div>
      <p className="border-t pt-3 text-xs font-medium">Lista wizyt</p>
      <ul className="space-y-1.5">
        {visits.map((v) => (
          <li
            key={v.time}
            className="rounded-md border-l-[3px] px-2.5 py-2"
            style={{
              borderLeftColor: `var(${v.color})`,
              backgroundColor: tint(v.color, 12),
            }}
          >
            <p className="text-muted-foreground text-[10px]">
              {visit.date} · {v.time}
            </p>
            <p className="truncate text-xs font-semibold">{v.service}</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <span className="text-muted-foreground truncate text-[11px]">
                {v.customer}
              </span>
              <StatusPills status={v.status} paid={v.paid} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- "Rozlicz wizytę" (visit-wrap-up-dialog) -------------------------------------

function WrapUp({
  visit,
  product,
  next,
}: {
  visit: IndustryVisit;
  product: [name: string, price: number];
  next: string;
}) {
  const button = (label: string) => (
    <span className="bg-background shrink-0 rounded-md border px-2 py-1 text-[10px] font-medium">
      {label}
    </span>
  );
  const detail = "text-muted-foreground block truncate text-[11px]";

  return (
    <div className={box}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <span className="bg-muted text-muted-foreground flex size-11 shrink-0 items-center justify-center rounded-full">
          <ReceiptIcon className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-base font-semibold">Rozlicz wizytę</p>
          <p className="truncate text-[11px] font-medium">
            {visit.customer} — {visit.services.join(", ")}
          </p>
          <p className="text-muted-foreground text-[11px]">
            {visit.date}, {formatTime(visit.start)} · {visit.employee}
          </p>
        </div>
      </div>
      <ul className="divide-y border-t">
        <li className="flex items-center gap-3 px-4 py-3">
          <span className={cn(square, emerald)}>
            <ShoppingBagIcon className="size-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">Produkty dla klientki</p>
            <p className={detail}>
              {product[0]} · {formatPln(product[1])}
            </p>
          </div>
          {button("Zmień")}
        </li>
        {/* The rebook suggestion gets accepted: "Umów kolejną" → booked. */}
        <li className="flex items-center gap-3 px-4 py-3">
          <Swap
            from={
              <span className={cn(square, "bg-muted")}>
                <CalendarPlusIcon className="text-muted-foreground size-4" />
              </span>
            }
            to={
              <span className={cn(square, emerald)}>
                <CalendarPlusIcon className="size-4" />
              </span>
            }
          />
          <div className="min-w-0 flex-1">
            <Swap
              from={
                <span className="text-xs font-medium">Następna wizyta</span>
              }
              to={
                <span className="text-xs font-medium">
                  Następna wizyta umówiona
                </span>
              }
            />
            <Swap
              from={<span className={detail}>Proponowany termin: {next}</span>}
              to={<span className={detail}>{next}</span>}
            />
          </div>
          <Swap from={button("Umów kolejną")} to={null} />
        </li>
      </ul>
      <div className="bg-muted/40 flex justify-end px-4 py-3">
        <span className="bg-background rounded-md border px-3 py-1.5 text-[11px] font-medium">
          Zamknij
        </span>
      </div>
    </div>
  );
}

// --- Dashboard widgets (panel główny) --------------------------------------------

function Widget({
  color,
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(box, "border-t-4")} style={{ borderTopColor: color }}>
      <div className="flex items-center gap-3 px-4 pt-4 pb-3">
        <span
          className={square}
          style={{
            backgroundColor: `color-mix(in oklab, ${color} 15%, transparent)`,
            color,
          }}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-muted-foreground truncate text-[11px]">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}

function FreeSlots({
  visit,
  slots,
}: {
  visit: IndustryVisit;
  slots: [time: string, day: string, free: string][];
}) {
  return (
    <Widget
      color="#34d399"
      icon={CalendarIcon}
      title="Najbliższe wolne terminy"
      subtitle="Kliknij termin, aby zapisać klienta"
    >
      <ul className="space-y-1.5">
        {slots.map(([time, day, free], i) => (
          <li
            key={time + day}
            className={cn(
              "flex items-center gap-3 border-l-[3px] border-emerald-400 px-3 py-1.5",
              i === 0 && "bg-primary/5",
            )}
          >
            <span className="w-20 shrink-0">
              <span className="block text-[11px] tabular-nums">{time}</span>
              <span className="text-muted-foreground block text-[10px]">
                {day}
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[11px] font-medium">
                {visit.employee}
              </span>
              <span className="text-muted-foreground block text-[10px]">
                Wolne przez {free}
              </span>
            </span>
            <CalendarPlusIcon className="text-muted-foreground size-3.5 shrink-0" />
          </li>
        ))}
      </ul>
    </Widget>
  );
}

function WeekSummary({
  visit,
  range,
  visits,
  top,
}: {
  visit: IndustryVisit;
  range: string;
  visits: number;
  top: [service: string, count: number][];
}) {
  const bars = ["--viz-5", "--viz-2", "--viz-1"];
  return (
    <Widget
      color="#fb7185"
      icon={ChartColumnIcon}
      title="Podsumowanie tygodnia"
      subtitle={range}
    >
      <div
        className="border-l-[3px] px-3 py-1"
        style={{ borderLeftColor: `var(${visit.employeeColor})` }}
      >
        <p className="text-2xl font-semibold tabular-nums">{visits}</p>
        <p className="text-muted-foreground text-[11px]">
          wizyt w tym tygodniu
        </p>
      </div>
      <p className={cn(caps, "mt-3 mb-1.5")}>Najpopularniejsze usługi</p>
      <ul className="space-y-1">
        {top.map(([service, count], i) => (
          <li
            key={service}
            className="flex items-center justify-between gap-2 border-l-[3px] px-3 py-1 text-[12px]"
            style={{ borderLeftColor: `var(${bars[i % bars.length]})` }}
          >
            <span className="truncate">{service}</span>
            <span className="text-muted-foreground text-[11px] tabular-nums">
              {count}×
            </span>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

// --- Customer record (customer-record-dialog) ------------------------------------

type RecordTabLayer = Extract<
  VisitLayer,
  { kind: "history" | "opinion" | "cards" | "profile" }
>;

const recordTabs = [
  { kind: "profile", label: "Dane klienta", icon: UserIcon },
  { kind: "history", label: "Wizyty", icon: CalendarIcon },
  { kind: "cards", label: "Karty zabiegowe", icon: ClipboardListIcon },
  { kind: "photos", label: "Zdjęcia", icon: ImagesIcon },
  { kind: "opinion", label: "Opinia klienta", icon: StarIcon },
] as const;

function CustomerRecord({
  visit,
  layer,
}: {
  visit: IndustryVisit;
  layer: RecordTabLayer;
}) {
  return (
    <div className={box}>
      <div className="flex items-center gap-3 border-b px-4 py-3">
        <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
          {initials(visit.customer)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{visit.customer}</p>
          <p className="text-muted-foreground text-[11px]">{visit.phone}</p>
        </div>
        <span className="bg-primary text-primary-foreground flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium">
          <CalendarIcon className="size-3" /> Nowa wizyta
        </span>
      </div>
      <div className="flex gap-1 overflow-hidden border-b px-3 py-2">
        {recordTabs.map(({ kind, label, icon: Icon }) =>
          kind === layer.kind ? (
            <span
              key={kind}
              className="bg-accent text-accent-foreground inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium"
            >
              <Icon className="size-3" />
              {label}
            </span>
          ) : (
            <span
              key={kind}
              className="text-muted-foreground inline-flex shrink-0 items-center rounded-md p-1.5"
            >
              <Icon className="size-3.5" />
            </span>
          ),
        )}
      </div>
      <div className="p-4">
        {layer.kind === "history" && <History {...layer} />}
        {layer.kind === "opinion" && <Opinion {...layer} />}
        {layer.kind === "cards" && <Cards {...layer} />}
        {layer.kind === "profile" && <Profile visit={visit} {...layer} />}
      </div>
    </div>
  );
}

function History({ visits }: Extract<VisitLayer, { kind: "history" }>) {
  const upcoming = visits.filter((v) => v.status === "planned").length;
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">Historia wizyt</p>
      <p className="text-muted-foreground text-[11px]">
        <span className="text-foreground font-semibold">{upcoming}</span>{" "}
        nadchodzących{" "}
        <span className="text-foreground ml-2 font-semibold">
          {visits.length - upcoming}
        </span>{" "}
        minionych
      </p>
      <ol className="space-y-1.5">
        {visits.map((v) => (
          <li
            key={v.date}
            className="rounded-md border-l-[3px] px-2.5 py-1.5"
            style={{
              borderLeftColor: `var(${v.color})`,
              backgroundColor: tint(v.color, 12),
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold">{v.date}</p>
              <span className="text-muted-foreground text-[11px] tabular-nums">
                {formatPln(v.price)}
              </span>
            </div>
            <p className="text-muted-foreground truncate text-[11px]">
              {v.time} · {v.service}
            </p>
            <div className="mt-1">
              <StatusPills status={v.status} paid={v.paid} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Opinion({
  average,
  ratings,
}: Extract<VisitLayer, { kind: "opinion" }>) {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold">Opinia klienta</p>
        <p className="text-muted-foreground flex items-center gap-1 text-[11px]">
          <LockIcon className="size-3" /> Oceny wystawiają pracownicy po
          wizycie. Klient ich nie widzi.
        </p>
      </div>
      <div className="bg-muted/40 flex items-center gap-3 rounded-xl px-3 py-2.5">
        <span className="font-mono text-2xl font-semibold tracking-tight">
          {average.toLocaleString("pl-PL", { minimumFractionDigits: 1 })}
        </span>
        <span className="space-y-0.5">
          <Stars value={average} />
          <span className="text-muted-foreground block text-[10px]">
            {ratings.length} oceny pracowników
          </span>
        </span>
      </div>
      <ul className="divide-y">
        {ratings.map((r) => (
          <li key={r.date} className="flex gap-2.5 py-2.5 first:pt-0">
            <span className="bg-muted text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold">
              {initials(r.author)}
            </span>
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-medium">{r.author}</span>
                <span className="text-muted-foreground text-[10px]">
                  {r.date}
                </span>
              </div>
              <Stars value={r.stars} />
              <p className="text-[12px] leading-snug">{r.comment}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cards({ pending, completed }: Extract<VisitLayer, { kind: "cards" }>) {
  const group = (title: string, items: [string, string][], sent: boolean) => (
    <section>
      <p className="mb-1 text-xs font-medium">
        {title}{" "}
        <span className="text-muted-foreground font-normal">
          {items.length}
        </span>
      </p>
      <ul className="divide-y rounded-xl border px-3">
        {items.map(([name, date]) => (
          <li key={name} className="flex items-center gap-2.5 py-2.5">
            <span className={cn(square, sent ? amber : emerald)}>
              {sent ? (
                <ClockIcon className="size-4" />
              ) : (
                <FileTextIcon className="size-4" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{name}</p>
              <p className="text-muted-foreground text-[10px]">
                {sent ? `Wysłana ${date}` : `Wizyta ${date}`}
              </p>
            </div>
            <CardBadge sent={sent} />
          </li>
        ))}
      </ul>
    </section>
  );
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold">Karty zabiegowe</p>
        <p className="text-muted-foreground text-[11px]">
          {pending.length + completed.length} karty, {pending.length} do
          wypełnienia
        </p>
      </div>
      {group("Czekają na wypełnienie", pending, true)}
      {group("Wypełnione", completed, false)}
    </div>
  );
}

function Profile({
  visit,
  email,
  address,
}: {
  visit: IndustryVisit;
  email: string;
  address: string;
}) {
  const field = (
    Icon: React.ComponentType<{ className?: string }>,
    label: string,
    value: React.ReactNode,
    toggle = false,
  ) => (
    <div className="flex items-start gap-2.5 py-1.5">
      <span className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-muted-foreground size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className={caps}>{label}</p>
        <p className="text-[13px]">{value}</p>
      </div>
      {toggle && (
        <span className="bg-primary mt-1 flex h-4 w-7 items-center justify-end rounded-full px-0.5">
          <span className="size-3 rounded-full bg-white" />
        </span>
      )}
    </div>
  );
  return (
    <div className="divide-y *:py-2.5 [&>*:first-child]:pt-0">
      <section>
        <p className={caps}>Kontakt</p>
        {field(PhoneIcon, "Telefon", visit.phone)}
        {field(MailIcon, "E-mail", email)}
      </section>
      <section>
        <p className={caps}>Przypomnienia o wizytach</p>
        {field(MessageSquareTextIcon, "SMS", "Włączone", true)}
      </section>
      <section>
        <p className={caps}>Adres</p>
        {field(MapPinIcon, "Adres", address)}
      </section>
    </div>
  );
}
