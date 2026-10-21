"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import {
  BanknoteIcon,
  CalendarIcon,
  CarIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  ClockIcon,
  ImagesIcon,
  MessageSquareTextIcon,
  PencilIcon,
  PhoneIcon,
  StarIcon,
  TrashIcon,
  TriangleAlertIcon,
} from "@/components/ui/icons";
import type { Industry, IndustryVisit, VisitLayer } from "@/content/industries";
import { formatDuration, formatTime } from "@/lib/calendar-demo";
import { formatPln } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { AppWindow } from "./app-window";
import {
  caps,
  emerald,
  initials,
  StatusPills,
  tint,
  VisitLayerView,
} from "./visit-layers";

// Summaries of the sheet's "Dokumentacja wizyty" links, worded as in visit-record.
function recordLinks(layer: VisitLayer) {
  return {
    cards:
      layer.kind === "card"
        ? { summary: "1 karta" }
        : layer.kind === "cardMissing"
          ? { summary: `Brak wypełnionej karty: ${layer.name}`, warning: true }
          : undefined,
    photos:
      layer.kind === "photos"
        ? layer.after
          ? "2 zdjęcia"
          : "1 zdjęcie, brak „po”"
        : "Brak zdjęć",
    ratings:
      layer.kind === "rating" ? `Opinia klienta: ${layer.stars}/5` : undefined,
  };
}

// Mirrors the app's reservation sheet (reservation-view). On top sits one more view
// of the app, a different one for each industry (see VisitLayer).
export function VisitMockup({
  industry,
  visit,
  className,
}: {
  industry: Industry;
  visit: IndustryVisit;
  className?: string;
}) {
  const services = visit.services.map((name) => {
    const s = industry.services.find((s) => s.name === name);
    if (!s) throw new Error(`Brak usługi „${name}”`);
    return s;
  });
  const duration = services.reduce((sum, s) => sum + s.duration, 0);
  const total =
    services.reduce((sum, s) => sum + s.price, 0) +
    (visit.products ?? []).reduce((sum, [, price]) => sum + price, 0);
  const links = recordLinks(visit.layer);

  // One sequence: the sheet scrolls to its end (notes, visit record), then the layer
  // on top pops in. Reduced motion shows the end state without movement.
  const viewport = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const inView = useInView(viewport, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  useEffect(() => {
    if (viewport.current && sheet.current)
      setDistance(sheet.current.offsetHeight - viewport.current.clientHeight);
  }, []);
  const play = inView && !reduce;

  return (
    <div className={cn("relative", className)}>
      <AppWindow
        label={`Wizyta „${visit.services.join(", ")}” w systemie Saloonik: termin, pracownik, usługi, płatność, wiadomości SMS do klienta i dokumentacja wizyty`}
        path="/dashboard/reservations"
        className="text-left lg:ml-auto lg:w-[80%]"
      >
        <div ref={viewport} className="h-[30rem] overflow-hidden lg:h-[34rem]">
          <motion.div
            ref={sheet}
            className="p-5"
            animate={{ y: play ? -distance : 0 }}
            transition={{ delay: 0.8, duration: 2.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white"
                style={{ backgroundColor: `var(${visit.employeeColor})` }}
              >
                {initials(visit.customer)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-base font-bold">{visit.customer}</p>
                <p className="text-muted-foreground text-xs">{visit.phone}</p>
              </div>
            </div>
            <div className="mt-3">
              <StatusPills status={visit.status} paid={!!visit.paid} />
            </div>
            <div className="mt-3 flex gap-1.5">
              <span className="bg-primary text-primary-foreground flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md text-xs font-medium">
                <PencilIcon className="size-3.5" /> Edytuj
              </span>
              <span className="bg-background flex size-8 items-center justify-center rounded-md border">
                <PhoneIcon className="size-3.5" />
              </span>
              <span className="bg-destructive flex size-8 items-center justify-center rounded-md text-white">
                <TrashIcon className="size-3.5" />
              </span>
            </div>

            <div className="mt-4 divide-y border-t *:py-3.5">
              <Section title="Termin">
                <Field icon={CalendarIcon} label="Data" value={visit.date} />
                <Field
                  icon={ClockIcon}
                  label="Godzina"
                  value={`${formatTime(visit.start)} – ${formatTime(visit.start + duration)} · ${formatDuration(duration)}`}
                />
                {visit.atCustomer && (
                  <Field
                    icon={CarIcon}
                    label="Miejsce"
                    value="Dojazd do klienta"
                  />
                )}
              </Section>

              <Section title="Pracownik">
                <p className="flex items-center gap-2.5 py-1 text-[13px]">
                  <span
                    className="flex size-7 items-center justify-center rounded-lg text-[10px] font-bold"
                    style={{
                      backgroundColor: tint(visit.employeeColor),
                      color: `var(${visit.employeeColor})`,
                    }}
                  >
                    {initials(visit.employee)}
                  </span>
                  {visit.employee}
                </p>
              </Section>

              <Section title="Usługi">
                <div className="divide-y">
                  {services.map((s) => (
                    <Line
                      key={s.name}
                      dot={industry.color}
                      name={s.name}
                      price={s.price}
                    />
                  ))}
                </div>
              </Section>

              {visit.products && (
                <Section title="Produkty">
                  <div className="divide-y">
                    {visit.products.map(([name, price]) => (
                      <Line key={name} name={name} price={price} />
                    ))}
                  </div>
                </Section>
              )}

              <Section title="Płatność">
                <Field
                  icon={BanknoteIcon}
                  label={visit.paid ? "Zapłacono" : "Do zapłaty"}
                  value={formatPln(total)}
                />
              </Section>

              <Section title="Wiadomości do klienta">
                <ul className="divide-y">
                  {visit.messages.map(([title, status]) => (
                    <li
                      key={title}
                      className="flex items-center gap-2.5 py-1.5"
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-lg",
                          emerald,
                        )}
                      >
                        <MessageSquareTextIcon className="size-3.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px]">
                          {title}{" "}
                          <span className="text-muted-foreground">(SMS)</span>
                        </span>
                        <span className="block truncate text-[11px] text-emerald-700 dark:text-emerald-400">
                          {status}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Dokumentacja wizyty">
                {links.cards && (
                  <RecordLink
                    icon={
                      links.cards.warning
                        ? TriangleAlertIcon
                        : ClipboardListIcon
                    }
                    label="Karty zabiegowe"
                    summary={links.cards.summary}
                    warning={links.cards.warning}
                  />
                )}
                <RecordLink
                  icon={ImagesIcon}
                  label="Zdjęcia"
                  summary={links.photos}
                />
                {links.ratings && (
                  <RecordLink
                    icon={StarIcon}
                    label="Oceny"
                    summary={links.ratings}
                  />
                )}
              </Section>

              {visit.notes && (
                <Section title="Notatki">
                  <p className="py-1 text-[13px] leading-snug">{visit.notes}</p>
                </Section>
              )}
            </div>
          </motion.div>
        </div>
      </AppWindow>

      <motion.div
        aria-hidden
        initial="hidden"
        animate={inView || reduce ? "shown" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 16, scale: 0.97 },
          shown: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: reduce ? 0 : 3.6, duration: 0.4 },
          },
        }}
        className="relative z-10 mx-4 -mt-6 select-none lg:absolute lg:top-16 lg:-left-8 lg:mx-0 lg:mt-0 lg:w-[58%]"
      >
        <VisitLayerView visit={visit} />
      </motion.div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className={caps}>{title}</p>
      {children}
    </div>
  );
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 py-1">
      <span className="bg-muted flex size-7 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-muted-foreground size-3.5" />
      </span>
      <div className="min-w-0">
        <p className={caps}>{label}</p>
        <p className="truncate text-[13px]">{value}</p>
      </div>
    </div>
  );
}

function Line({
  name,
  price,
  dot,
}: {
  name: string;
  price: number;
  dot?: string;
}) {
  return (
    <p className="flex items-center justify-between gap-2 py-1.5 text-[13px]">
      <span className="flex min-w-0 items-center gap-2">
        {dot && (
          <span
            className="size-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: dot }}
          />
        )}
        <span className="truncate">{name}</span>
      </span>
      <span className="text-muted-foreground shrink-0 tabular-nums">
        {formatPln(price)}
      </span>
    </p>
  );
}

function RecordLink({
  icon: Icon,
  label,
  summary,
  warning,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  summary: string;
  warning?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 py-1.5">
      <Icon
        className={cn(
          "size-4 shrink-0",
          warning ? "text-amber-600" : "text-muted-foreground",
        )}
      />
      <div className="min-w-0 flex-1">
        <p className="text-[13px]">{label}</p>
        <p
          className={cn(
            "truncate text-[11px]",
            warning
              ? "text-amber-700 dark:text-amber-400"
              : "text-muted-foreground",
          )}
        >
          {summary}
        </p>
      </div>
      <ChevronRightIcon className="text-muted-foreground size-4" />
    </div>
  );
}
