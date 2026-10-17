"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisIcon,
  FolderIcon,
  GripVerticalIcon,
  InfoIcon,
  PlusIcon,
  SunIcon,
  TagIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import {
  AppSidebar,
  Avatar,
  Btn,
  Checkbox,
  DemoDialog,
  DemoStage,
  Dropdown,
  Field,
  GLIDE,
  Input,
  PageHeader,
  SETTLE,
  Th,
  thRow,
  useDemo,
  zl,
  type Demo,
} from "./demo";

const TOASTER = "services-demo";

const categories = [
  { id: "barber", name: "Barber", color: "--muted-foreground" },
  { id: "fryz", name: "Fryzjerstwo", color: "--viz-4" },
  { id: "kolor", name: "Koloryzacja", color: "--viz-5" },
  { id: "paz", name: "Paznokcie", color: "--viz-2" },
];

const staff = [
  { initials: "AN", name: "Anna Nowak", color: "--viz-1" },
  { initials: "JK", name: "Julia Kos", color: "--viz-5" },
  { initials: "MW", name: "Marek Wójcik", color: "--viz-3" },
  { initials: "KL", name: "Kasia Lis", color: "--viz-2" },
];

type Service = {
  id: string;
  name: string;
  cat: string;
  price: number;
  duration: number;
  staff: string[];
};

const initialServices: Service[] = [
  {
    id: "s6",
    name: "Skin fade",
    cat: "barber",
    price: 90,
    duration: 45,
    staff: ["MW"],
  },
  {
    id: "s7",
    name: "Strzyżenie i broda",
    cat: "barber",
    price: 140,
    duration: 75,
    staff: ["MW"],
  },
  {
    id: "s1",
    name: "Strzyżenie damskie",
    cat: "fryz",
    price: 120,
    duration: 45,
    staff: ["AN", "JK"],
  },
  {
    id: "s2",
    name: "Modelowanie",
    cat: "fryz",
    price: 90,
    duration: 30,
    staff: ["AN"],
  },
  {
    id: "s3",
    name: "Strzyżenie dziecięce",
    cat: "fryz",
    price: 60,
    duration: 30,
    staff: ["JK"],
  },
  {
    id: "s4",
    name: "Koloryzacja globalna",
    cat: "kolor",
    price: 320,
    duration: 120,
    staff: ["AN"],
  },
  {
    id: "s5",
    name: "Balayage",
    cat: "kolor",
    price: 450,
    duration: 180,
    staff: ["AN"],
  },
  {
    id: "s8",
    name: "Manicure hybrydowy",
    cat: "paz",
    price: 130,
    duration: 75,
    staff: ["KL"],
  },
  {
    id: "s9",
    name: "Pedicure",
    cat: "paz",
    price: 140,
    duration: 60,
    staff: ["KL"],
  },
];

type Draft = {
  name: string;
  cat: string | null;
  price: string;
  duration: number;
  staff: string[];
  open: "cat" | "staff" | null;
  focus: "name" | "price" | null;
};

const emptyDraft: Draft = {
  name: "",
  cat: null,
  price: "",
  duration: 30,
  staff: [],
  open: null,
  focus: null,
};

const durations = [15, 30, 45, 60, 90];

const plural = (n: number) =>
  n === 1
    ? "usługa"
    : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 12 || n % 100 > 14)
      ? "usługi"
      : "usług";

const minutes = (m: number) =>
  m < 60
    ? `${m} min`
    : m % 60
      ? `${Math.floor(m / 60)} h ${m % 60} min`
      : `${m / 60} h`;

const priceRange = (list: Service[]) => {
  const prices = list.map((s) => s.price);
  const [min, max] = [Math.min(...prices), Math.max(...prices)];
  return min === max ? zl(min) : `${zl(min)} – ${zl(max)}`;
};

// Column widths shared by the header, category and service rows.
const col = {
  price: "w-24 shrink-0 @md:w-28",
  duration: "hidden w-20 shrink-0 @md:block",
  staff: "w-12 shrink-0",
  actions: "hidden w-16 shrink-0 @2xl:flex",
};

export function ServicesMockup({ className }: { className?: string }) {
  const [services, setServices] = useState(initialServices);
  const [open, setOpen] = useState(["fryz"]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [drag, setDrag] = useState<{ id: string; dy: number } | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [fresh, setFresh] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  // remounts the content so every loop starts from a clean slate
  const [cycle, setCycle] = useState(0);

  const reset = () => {
    setServices(initialServices);
    setOpen(["fryz"]);
    setDraft(null);
    setDrag(null);
    setDropTarget(null);
    setFresh(null);
    setCaption(null);
    setFading(false);
    setCycle((c) => c + 1);
  };

  async function play(d: Demo) {
    const edit = (patch: Partial<Draft>) =>
      setDraft((x) => (x ? { ...x, ...patch } : x));

    await d.wait(900);
    setCaption("Nowa usługa z podglądem na żywo");
    await d.click("new");
    setDraft(emptyDraft);
    await d.wait(400);
    await d.click("f-name", 700);
    edit({ focus: "name" });
    await d.type("Tonowanie", (name) => edit({ name }));
    await d.click("f-cat", 700);
    edit({ focus: null, open: "cat" });
    await d.click("opt-kolor", 600);
    edit({ cat: "kolor", open: null });
    await d.click("f-price", 700);
    edit({ focus: "price" });
    await d.type("160", (price) => edit({ price }));
    await d.click("dur-45", 700);
    edit({ focus: null, duration: 45 });
    await d.click("f-staff", 700);
    edit({ open: "staff" });
    await d.click("st-AN", 500);
    edit({ staff: ["AN"] });
    await d.click("st-JK", 450);
    edit({ staff: ["AN", "JK"] });
    await d.click("f-staff", 500);
    edit({ open: null });
    await d.click("save", 800);
    setDraft(null);
    setOpen((o) => [...o, "kolor"]);
    setServices((s) => [
      ...s,
      {
        id: "new",
        name: "Tonowanie",
        cat: "kolor",
        price: 160,
        duration: 45,
        staff: ["AN", "JK"],
      },
    ]);
    setFresh("new");
    d.toast("success", "Usługa została dodana.");
    await d.wait(2200);

    setCaption("Przeciągnij usługę na inną kategorię");
    await d.point("row-s3");
    await d.press(true);
    setDrag({ id: "s3", dy: d.dy("row-s3", "cat-barber") });
    setDropTarget("barber");
    await d.point("cat-barber", 1000);
    setServices((s) =>
      s.map((x) => (x.id === "s3" ? { ...x, cat: "barber" } : x)),
    );
    setOpen((o) => [...o, "barber"]);
    setDrag(null);
    setDropTarget(null);
    await d.press(false);
    d.toast("success", "Usługa przeniesiona do kategorii Barber.");
    await d.wait(2400);

    d.hide();
    setCaption(null);
    await d.wait(1600);
    setFading(true);
    await d.wait(450);
    reset();
  }

  const { ref, cursor } = useDemo(TOASTER, play, reset);

  return (
    <DemoStage
      stageRef={ref}
      cursor={cursor}
      toasterId={TOASTER}
      path="/dashboard/services"
      className={className}
      label="Usługi w Saloonik: cennik pogrupowany w kategorie z formularzem dodawania usługi"
      note="Widok poglądowy na przykładowych danych. W systemie cennik ma więcej opcji, m.in. import z Excela i karty zabiegowe."
    >
      <div className="flex text-left">
        <AppSidebar active={TagIcon} />
        <div className="bg-background @container relative min-h-[32rem] min-w-0 flex-1 text-xs">
          <PageHeader
            title="Usługi"
            subtitle="Zarządzaj usługami swojego salonu — pogrupowane w kategorie"
            caption={caption}
          />
          <div className="flex items-center gap-1.5 px-3 pb-2.5">
            <Btn className="hidden @xl:inline-flex">Rozwiń wszystko</Btn>
            <Btn className="hidden @xl:inline-flex">Zwiń wszystko</Btn>
            <Btn variant="primary" demo="new" className="ml-auto">
              <PlusIcon /> Nowa usługa
            </Btn>
            <Btn className="hidden @md:inline-flex">
              <FolderIcon /> Nowa kategoria
            </Btn>
          </div>

          <motion.div
            key={cycle}
            animate={{ opacity: fading ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card mx-3 overflow-hidden rounded-lg border shadow-xs"
          >
            <div className={thRow}>
              <Checkbox />
              <Th label="Nazwa" sort grip={false} className="flex-1 pl-1" />
              <Th label="Cena" sort className={col.price} />
              <Th label="Czas trwania" className={col.duration} />
              <Th label="Kto" grip={false} className={col.staff} />
              <span className={col.actions} />
            </div>
            <div className="flex items-center gap-2 border-b px-3 py-1.5">
              <span className="size-3.5 shrink-0" />
              <Input
                className="h-6 w-1/2 text-[11px]"
                placeholder="Filtruj nazwa…"
              />
            </div>
            <LayoutGroup>
              {categories.map((c) => {
                const list = services.filter((s) => s.cat === c.id);
                const expanded = open.includes(c.id);
                return (
                  <motion.div key={c.id} layout="position" transition={SETTLE}>
                    <div
                      data-demo={`cat-${c.id}`}
                      className={cn(
                        "relative flex h-9 items-center gap-2 border-b border-l-[3px] pr-3 pl-[9px]",
                        dropTarget === c.id &&
                          "ring-primary z-10 ring-2 ring-inset",
                      )}
                      style={{
                        borderLeftColor: `var(${c.color})`,
                        backgroundColor: `color-mix(in oklab, var(${c.color}) 13%, var(--card))`,
                      }}
                    >
                      <Checkbox />
                      <span className="flex min-w-0 flex-1 items-center gap-1.5">
                        {expanded ? (
                          <ChevronDownIcon className="text-muted-foreground size-3.5 shrink-0" />
                        ) : (
                          <ChevronRightIcon className="text-muted-foreground size-3.5 shrink-0" />
                        )}
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: `var(${c.color})` }}
                        />
                        <span className="truncate font-semibold">{c.name}</span>
                        <span className="bg-background/60 text-muted-foreground shrink-0 rounded-full border px-1.5 text-[10px] leading-4">
                          {list.length} {plural(list.length)}
                        </span>
                      </span>
                      <span className="text-muted-foreground hidden w-[12.5rem] shrink-0 font-mono text-[11px] whitespace-nowrap tabular-nums @md:block">
                        {priceRange(list)}
                      </span>
                      <span className={col.staff} />
                      <span
                        className={cn(
                          col.actions,
                          "text-muted-foreground justify-end gap-2",
                        )}
                      >
                        <PlusIcon className="size-3.5" />
                        <FolderIcon className="size-3.5" />
                        <EllipsisIcon className="size-3.5" />
                      </span>
                    </div>
                    <AnimatePresence initial={false}>
                      {expanded &&
                        list.map((s) => (
                          <ServiceRow
                            key={s.id}
                            service={s}
                            fresh={fresh === s.id}
                            dragDy={drag?.id === s.id ? drag.dy : null}
                          />
                        ))}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </LayoutGroup>
          </motion.div>
          <p className="text-muted-foreground flex items-center justify-between gap-3 px-4 py-2 text-[10px]">
            <span>
              {categories.length} kategorie · {services.length} usług
            </span>
            <span className="hidden items-center gap-1 @md:flex">
              <GripVerticalIcon className="size-3" />
              Przeciągnij usługę na wiersz kategorii, aby ją przenieść.
            </span>
          </p>

          <AnimatePresence>
            {draft && <ServiceDialog draft={draft} />}
          </AnimatePresence>
        </div>
      </div>
    </DemoStage>
  );
}

function ServiceRow({
  service,
  fresh,
  dragDy,
}: {
  service: Service;
  fresh: boolean;
  dragDy: number | null;
}) {
  const dragging = dragDy !== null;
  return (
    <motion.div
      layout="position"
      data-demo={`row-${service.id}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: 1,
        height: "auto",
        y: dragDy ?? 0,
        scale: dragging ? 1.02 : 1,
        boxShadow: dragging
          ? "0 12px 28px rgba(0,0,0,0.14)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      exit={{ opacity: 0, height: 0 }}
      transition={dragging ? GLIDE : SETTLE}
      className={cn(
        "bg-card relative overflow-hidden border-b",
        dragging && "z-20 rounded-md border",
      )}
    >
      {fresh && (
        <motion.span
          className="bg-primary/12 absolute inset-0"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.4, delay: 0.6 }}
        />
      )}
      <div className="relative flex h-9 items-center gap-2 px-3">
        <Checkbox />
        <span className="min-w-0 flex-1 truncate pl-6">{service.name}</span>
        <span
          className={cn(
            col.price,
            "font-mono text-[11px] font-medium tabular-nums",
          )}
        >
          {zl(service.price)}
        </span>
        <span className={cn(col.duration, "text-muted-foreground")}>
          {minutes(service.duration)}
        </span>
        <span className={cn(col.staff, "flex -space-x-1.5")}>
          {service.staff.map((i) => (
            <Avatar
              key={i}
              initials={i}
              color={staff.find((s) => s.initials === i)!.color}
              className="ring-card size-5 text-[8px] ring-2"
            />
          ))}
        </span>
        <span className={cn(col.actions, "text-muted-foreground")}>—</span>
      </div>
    </motion.div>
  );
}

function ServiceDialog({ draft }: { draft: Draft }) {
  const cat = categories.find((c) => c.id === draft.cat);
  const chosen = staff.filter((s) => draft.staff.includes(s.initials));
  return (
    <DemoDialog
      title="Dodaj usługę"
      description="Wypełnij formularz, aby utworzyć nowy rekord."
    >
      <div
        className="bg-muted flex items-center justify-between gap-3 rounded-lg border-l-4 px-3 py-2 transition-colors duration-500"
        style={{
          borderLeftColor: `var(${cat?.color ?? "--muted-foreground"})`,
        }}
      >
        <span className="min-w-0">
          <span className="block truncate text-[13px] font-medium">
            {draft.name || "Nowa usługa"}
          </span>
          <span className="text-muted-foreground block text-[10px]">
            {cat?.name ?? "Bez kategorii"}
          </span>
        </span>
        <span className="shrink-0 text-right">
          <span className="block text-[13px] font-semibold tabular-nums">
            {zl(Number(draft.price) || 0)}
          </span>
          <span className="text-muted-foreground flex items-center justify-end gap-1 text-[10px]">
            <ClockIcon className="size-3" />
            {draft.duration} min
          </span>
        </span>
      </div>

      <Field label="Nazwa *">
        <Input
          demo="f-name"
          focused={draft.focus === "name"}
          placeholder="np. Strzyżenie męskie"
        >
          {draft.name}
        </Input>
      </Field>

      <Field label="Kategoria">
        <span className="relative block">
          <Input demo="f-cat" select placeholder="Wybierz kategorię">
            {cat && (
              <span className="flex items-center gap-1.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: `var(${cat.color})` }}
                />
                {cat.name}
              </span>
            )}
          </Input>
          <Dropdown show={draft.open === "cat"}>
            {categories.map((c) => (
              <span
                key={c.id}
                data-demo={`opt-${c.id}`}
                className="flex items-center gap-1.5 rounded px-2 py-1"
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: `var(${c.color})` }}
                />
                {c.name}
              </span>
            ))}
          </Dropdown>
        </span>
      </Field>

      <div className="flex gap-3">
        <Field label="Cena *" className="w-24 shrink-0">
          <Input
            demo="f-price"
            focused={draft.focus === "price"}
            suffix="zł"
            placeholder="0,00"
          >
            {draft.price}
          </Input>
        </Field>
        <Field label="Czas trwania (min) *" className="min-w-0 flex-1">
          <Input>{draft.duration}</Input>
          <span className="flex flex-wrap gap-1 pt-0.5">
            {durations.map((m) => (
              <span
                key={m}
                data-demo={`dur-${m}`}
                className={cn(
                  "flex h-5 min-w-7 items-center justify-center rounded-full border px-1.5 text-[10px] transition-colors",
                  draft.duration === m && "border-primary bg-primary/10",
                )}
              >
                {m}
              </span>
            ))}
            <span className="text-muted-foreground hidden h-5 items-center gap-1 rounded-full border px-1.5 text-[10px] @sm:flex">
              <SunIcon className="size-2.5" /> Cały dzień
            </span>
          </span>
        </Field>
      </div>

      <Field label="Kto wykonuje">
        <span className="relative block">
          <Input demo="f-staff" select placeholder="Wybierz pracowników">
            {chosen.map((s) => s.name).join(", ")}
          </Input>
          <Dropdown show={draft.open === "staff"} up>
            {staff.map((s) => {
              const on = draft.staff.includes(s.initials);
              return (
                <span
                  key={s.initials}
                  data-demo={`st-${s.initials}`}
                  className="flex items-center gap-2 rounded px-2 py-1"
                >
                  <span
                    className={cn(
                      "flex size-3.5 items-center justify-center rounded-[4px] border",
                      on && "bg-primary border-primary text-primary-foreground",
                    )}
                  >
                    {on && <CheckIcon className="size-2.5" />}
                  </span>
                  <Avatar
                    initials={s.initials}
                    color={s.color}
                    className="size-4 text-[7px]"
                  />
                  {s.name}
                </span>
              );
            })}
          </Dropdown>
        </span>
      </Field>

      <div className="flex items-center justify-end gap-2 pt-1">
        <span className="text-muted-foreground mr-auto hidden items-center gap-1 text-[10px] @sm:flex">
          <InfoIcon className="size-3" /> Pola z * są wymagane
        </span>
        <Btn>Anuluj</Btn>
        <Btn
          variant="primary"
          demo="save"
          className={cn(!draft.name && "opacity-50")}
        >
          Utwórz
        </Btn>
      </div>
    </DemoDialog>
  );
}
