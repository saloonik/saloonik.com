"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BanknoteIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DashboardIcon,
  EyeOffIcon,
  GridIcon,
  GripVerticalIcon,
  ListIcon,
  SunsetIcon,
  UndoIcon,
  type AtelierIconComponent,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  AppSidebar,
  Btn,
  DemoDialog,
  DemoStage,
  Dropdown,
  Field,
  Input,
  LiveCaption,
  SETTLE,
  Ticker,
  useDemo,
  zl,
  type Demo,
} from "./demo";

const TOASTER = "dashboard-demo";

type WidgetId = "todo" | "slots" | "summary";

// Tones copied from DASHBOARD_TONE_CLASSES in system.saloonik.com.
const tones = {
  orange: {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    icon: "text-orange-500 dark:text-orange-400",
    top: "border-t-orange-300 dark:border-t-orange-500/40",
  },
  green: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: "text-emerald-500 dark:text-emerald-400",
    top: "border-t-emerald-300 dark:border-t-emerald-500/40",
  },
  purple: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    icon: "text-blue-500 dark:text-blue-400",
    top: "border-t-blue-300 dark:border-t-blue-500/40",
  },
};

const widgets: Record<
  WidgetId,
  {
    title: string;
    hint: string;
    icon: AtelierIconComponent;
    tone: keyof typeof tones;
    wide?: boolean;
  }
> = {
  todo: {
    title: "Do zrobienia",
    hint: "Minione wizyty bez statusu lub płatności (ostatnie 30 dni)",
    icon: ListIcon,
    tone: "orange",
    wide: true,
  },
  slots: {
    title: "Najbliższe wolne terminy",
    hint: "Kliknij termin, aby zapisać klienta",
    icon: CalendarCheckIcon,
    tone: "green",
  },
  summary: {
    title: "Podsumowanie dnia",
    hint: "Dzisiaj do tej pory",
    icon: SunsetIcon,
    tone: "purple",
  },
};

const initialOrder: WidgetId[] = ["todo", "slots", "summary"];

const initialTodos = [
  {
    id: "t1",
    client: "Adam Kruk",
    meta: "16 paź, 17:00 · nieopłacona",
    price: 140,
  },
  {
    id: "t2",
    client: "Ola Dudek",
    meta: "16 paź, 15:30 · bez statusu",
    price: 180,
  },
  {
    id: "t3",
    client: "Piotr Nowicki",
    meta: "13 paź, 11:00 · bez statusu, nieopłacona",
    price: 90,
  },
];

const initialSlots = [
  {
    id: "f1",
    time: "13:30–15:00",
    day: "dziś",
    who: "Kasia Lis",
    gap: "1h 30min",
    color: "--viz-2",
  },
  {
    id: "f2",
    time: "16:00–17:00",
    day: "dziś",
    who: "Marek Wójcik",
    gap: "1h",
    color: "--viz-3",
  },
  {
    id: "f3",
    time: "09:00–11:00",
    day: "sob., 18 paź",
    who: "Anna Nowak",
    gap: "2h",
    color: "--viz-1",
  },
];

const initialStats = { visits: 7, done: 3, paid: 1240, tomorrow: 9 };

type Booking = {
  client: string;
  focus: boolean;
  picking: boolean;
  service: string | null;
};

const count = (n: number) => String(n);

export function DashboardMockup({ className }: { className?: string }) {
  const [order, setOrder] = useState(initialOrder);
  const [todos, setTodos] = useState(initialTodos);
  const [settled, setSettled] = useState<string | null>(null);
  const [slots, setSlots] = useState(initialSlots);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [stats, setStats] = useState(initialStats);
  const [editing, setEditing] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  // remounts the content so tickers start fresh instead of rolling back
  const [cycle, setCycle] = useState(0);

  const reset = () => {
    setOrder(initialOrder);
    setTodos(initialTodos);
    setSettled(null);
    setSlots(initialSlots);
    setBooking(null);
    setStats(initialStats);
    setEditing(false);
    setCaption(null);
    setFading(false);
    setCycle((c) => c + 1);
  };

  async function play(d: Demo) {
    const book = (patch: Partial<Booking>) =>
      setBooking((b) => (b ? { ...b, ...patch } : b));

    await d.wait(900);
    setCaption("Rozliczenie wizyty prosto z panelu");
    await d.click("settle-t1");
    setSettled("t1");
    await d.wait(800);
    setTodos((t) => t.filter((x) => x.id !== "t1"));
    setStats((s) => ({ ...s, done: s.done + 1, paid: s.paid + 140 }));
    d.toast("success", "Wizyta została rozliczona.");
    await d.wait(2000);

    setCaption("Zapis klienta w wolny termin");
    await d.click("slot-f1");
    setBooking({ client: "", focus: false, picking: false, service: null });
    await d.wait(400);
    await d.click("b-client", 700);
    book({ focus: true });
    await d.type("Karolina Bielska", (client) => book({ client }));
    await d.click("b-service", 700);
    book({ focus: false, picking: true });
    await d.click("opt-mani", 600);
    book({ picking: false, service: "Manicure hybrydowy" });
    await d.click("b-save", 800);
    setBooking(null);
    setSlots((s) => s.filter((x) => x.id !== "f1"));
    setStats((s) => ({ ...s, visits: s.visits + 1 }));
    d.toast("success", "Wizyta została dodana.");
    await d.wait(2200);

    setCaption("Układ panelu ustawiasz po swojemu");
    await d.click("edit");
    setEditing(true);
    await d.wait(600);
    await d.click("prev-summary", 1000);
    setOrder(["todo", "summary", "slots"]);
    await d.wait(1200);
    await d.click("done", 900);
    setEditing(false);
    d.toast("success", "Układ panelu został zapisany.");
    await d.wait(2400);

    d.hide();
    setCaption(null);
    await d.wait(1400);
    setFading(true);
    await d.wait(450);
    reset();
  }

  const { ref, cursor } = useDemo(TOASTER, play, reset);

  const content: Record<WidgetId, React.ReactNode> = {
    todo: (
      <ul className="space-y-0.5">
        <AnimatePresence initial={false}>
          {todos.map((t) => (
            <motion.li
              key={t.id}
              layout="position"
              exit={{ opacity: 0, height: 0 }}
              transition={SETTLE}
              className="flex items-center gap-2 overflow-hidden rounded-md px-1.5 py-1.5"
            >
              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">{t.client}</span>
                <span className="text-muted-foreground block truncate text-[10px]">
                  {t.meta}
                </span>
              </span>
              <Btn
                demo={`settle-${t.id}`}
                className={cn(
                  settled === t.id &&
                    "border-emerald-500/40 bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
                )}
              >
                {settled === t.id ? (
                  <>
                    <CheckIcon /> {zl(t.price)}
                  </>
                ) : (
                  <>
                    <BanknoteIcon /> Rozlicz
                  </>
                )}
              </Btn>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    ),
    slots: (
      <ul className="space-y-1.5">
        <AnimatePresence initial={false}>
          {slots.map((s) => (
            <motion.li
              key={s.id}
              layout="position"
              exit={{ opacity: 0, height: 0 }}
              transition={SETTLE}
              className="overflow-hidden"
            >
              <span
                data-demo={`slot-${s.id}`}
                className="flex items-center gap-2 border-l-4 py-1.5 pl-2.5"
                style={{ borderLeftColor: `var(${s.color})` }}
              >
                <span className="text-muted-foreground w-18 shrink-0 text-[10px] leading-tight font-medium tabular-nums">
                  {s.time}
                  <span className="block">{s.day}</span>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{s.who}</span>
                  <span className="text-muted-foreground block truncate text-[10px]">
                    Wolne przez {s.gap}
                  </span>
                </span>
                <CalendarPlusIcon className="text-muted-foreground mr-1 size-3.5 shrink-0" />
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    ),
    summary: (
      <>
        <dl className="grid grid-cols-2 gap-2">
          {[
            { label: "Wizyty dziś", value: stats.visits, format: count },
            { label: "Odbyte", value: stats.done, format: count },
            { label: "Opłacone dziś", value: stats.paid, format: zl },
            {
              label: "Zaplanowane jutro",
              value: stats.tomorrow,
              format: count,
            },
          ].map((s) => (
            <div key={s.label} className="bg-muted/40 min-w-0 rounded-lg p-2">
              <dt className="text-muted-foreground truncate text-[10px]">
                {s.label}
              </dt>
              <dd className="truncate font-mono text-[13px] font-semibold tabular-nums">
                <Ticker value={s.value} format={s.format} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-muted-foreground mt-2 text-[10px]">
          Pierwsze wolne okienko jutro:{" "}
          <span className="text-foreground font-medium">09:00</span> (Anna
          Nowak)
        </p>
      </>
    ),
  };

  return (
    <DemoStage
      stageRef={ref}
      cursor={cursor}
      toasterId={TOASTER}
      path="/dashboard"
      className={className}
      label="Panel główny Saloonik: karty z zadaniami, wolnymi terminami i podsumowaniem dnia"
      note="Widok poglądowy na przykładowych danych. W systemie panel ma więcej kart do wyboru, m.in. harmonogram dnia, statystyki i szybkie akcje."
    >
      <div className="flex text-left">
        <AppSidebar active={DashboardIcon} />
        <div className="bg-background @container relative min-h-[28rem] min-w-0 flex-1 text-xs">
          <div className="flex items-start gap-3 px-4 pt-3.5 pb-3">
            <div className="min-w-0">
              <p className="text-primary truncate text-[9px] font-semibold tracking-wider uppercase">
                Salon Bella · Oddział: Kraków
              </p>
              <p className="text-lg leading-tight font-semibold whitespace-nowrap">
                Dzień dobry, Anna
              </p>
              <p className="text-muted-foreground text-[11px]">
                Oto podsumowanie na dziś.
              </p>
            </div>
            <LiveCaption caption={caption} className="mt-1 ml-auto" />
            <span className="ml-auto flex shrink-0 gap-1.5 @md:ml-0">
              {editing ? (
                <>
                  <Btn variant="ghost" className="hidden @2xl:inline-flex">
                    <UndoIcon /> Przywróć domyślne
                  </Btn>
                  <Btn variant="primary" demo="done">
                    <CheckIcon /> Gotowe
                  </Btn>
                </>
              ) : (
                <Btn demo="edit">
                  <GridIcon /> Edytuj panel
                </Btn>
              )}
            </span>
          </div>

          <motion.div
            key={cycle}
            animate={{ opacity: fading ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-3 px-3 pb-3 @md:grid-cols-2"
          >
            {order.map((id, i) => {
              const w = widgets[id];
              const tone = tones[w.tone];
              const Icon = w.icon;
              return (
                <motion.section
                  key={id}
                  layout
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  className={cn(
                    "bg-card relative min-w-0 overflow-hidden rounded-xl border border-t-4 shadow-xs",
                    tone.top,
                    w.wide && "@md:col-span-2",
                  )}
                >
                  <AnimatePresence>
                    {editing && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="bg-muted/60 text-muted-foreground absolute inset-x-0 top-0 z-10 flex items-center gap-1 border-b px-2 py-1 text-[10px] font-medium backdrop-blur-sm"
                      >
                        <GripVerticalIcon className="size-3 shrink-0" />
                        <span className="min-w-0 flex-1 truncate">
                          {w.title}
                        </span>
                        <span
                          data-demo={`prev-${id}`}
                          className={cn(i === 0 && "opacity-40")}
                        >
                          <ChevronLeftIcon className="size-3" />
                        </span>
                        <ChevronRightIcon
                          className={cn(
                            "size-3",
                            i === order.length - 1 && "opacity-40",
                          )}
                        />
                        {(["S", "M", "L"] as const).map((size) => (
                          <span
                            key={size}
                            className={cn(
                              "flex size-4 items-center justify-center rounded text-[9px] font-semibold",
                              (w.wide ? "M" : "S") === size &&
                                "bg-primary text-primary-foreground",
                            )}
                          >
                            {size}
                          </span>
                        ))}
                        <EyeOffIcon className="size-3" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div
                    className={cn(
                      "space-y-3 p-3.5 transition-[padding]",
                      editing && "pt-9",
                    )}
                  >
                    <header className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-lg",
                          tone.bg,
                        )}
                      >
                        <Icon className={cn("size-4", tone.icon)} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold">
                          {w.title}
                        </span>
                        <span className="text-muted-foreground block truncate text-[11px]">
                          {w.hint}
                        </span>
                      </span>
                    </header>
                    {content[id]}
                  </div>
                </motion.section>
              );
            })}
          </motion.div>

          <AnimatePresence>
            {booking && <BookingDialog booking={booking} />}
          </AnimatePresence>
        </div>
      </div>
    </DemoStage>
  );
}

function BookingDialog({ booking }: { booking: Booking }) {
  return (
    <DemoDialog
      title="Nowa wizyta"
      description="Pracownik i godzina są już wpisane z wybranego terminu."
    >
      <Field label="Klient *">
        <Input
          demo="b-client"
          focused={booking.focus}
          placeholder="Wyszukaj lub dodaj klienta"
        >
          {booking.client}
        </Input>
      </Field>
      <Field label="Usługa *" className="relative">
        <Input demo="b-service" select placeholder="Wybierz usługę">
          {booking.service}
        </Input>
        <Dropdown show={booking.picking}>
          {[
            { id: "mani", name: "Manicure hybrydowy", price: 130 },
            { id: "pedi", name: "Pedicure", price: 140 },
            { id: "zel", name: "Paznokcie żelowe", price: 180 },
          ].map((s) => (
            <span
              key={s.id}
              data-demo={`opt-${s.id}`}
              className="flex items-center justify-between gap-2 rounded px-2 py-1"
            >
              {s.name}
              <span className="text-muted-foreground font-mono text-[10px]">
                {zl(s.price)}
              </span>
            </span>
          ))}
        </Dropdown>
      </Field>
      <div className="flex gap-3">
        <Field label="Pracownik" className="flex-1">
          <Input select>Kasia Lis</Input>
        </Field>
        <Field label="Termin" className="flex-1">
          <Input>Dziś, 13:30</Input>
        </Field>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <Btn>Anuluj</Btn>
        <Btn
          variant="primary"
          demo="b-save"
          className={cn(!booking.service && "opacity-50")}
        >
          Zapisz wizytę
        </Btn>
      </div>
    </DemoDialog>
  );
}
