"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardCheckIcon,
  EllipsisIcon,
  GridIcon,
  ListIcon,
  PlusIcon,
  TrashIcon,
  TriangleAlertIcon,
  TruckIcon,
  UserPlusIcon,
  WarehouseIcon,
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
  Input,
  PageHeader,
  SETTLE,
  Switch,
  Th,
  thRow,
  Ticker,
  useDemo,
  zl,
  type Demo,
} from "./demo";

const TOASTER = "inventory-demo";

type Product = {
  id: string;
  name: string;
  size: string;
  stock: number;
  min: number;
  use: "Sprzedaż" | "Zabiegi";
  price: number | null;
};

const initialProducts: Product[] = [
  {
    id: "p1",
    name: "Szampon regenerujący",
    size: "300 ml",
    stock: 5,
    min: 4,
    use: "Sprzedaż",
    price: 89,
  },
  {
    id: "p2",
    name: "Olejek arganowy",
    size: "50 ml",
    stock: 8,
    min: 3,
    use: "Sprzedaż",
    price: 119,
  },
  {
    id: "p3",
    name: "Farba 6.0",
    size: "60 ml",
    stock: 14,
    min: 6,
    use: "Zabiegi",
    price: null,
  },
  {
    id: "p4",
    name: "Maska odbudowująca",
    size: "500 ml",
    stock: 4,
    min: 2,
    use: "Zabiegi",
    price: null,
  },
];

type Sale = {
  id: string;
  when: string;
  items: string;
  client: string;
  where: string;
  amount: number;
};

const initialSales: Sale[] = [
  {
    id: "a",
    when: "17.10.2026 12:40",
    items: "Olejek arganowy",
    client: "Ewa Kowal",
    where: "Przy wizycie",
    amount: 119,
  },
  {
    id: "b",
    when: "17.10.2026 10:15",
    items: "Szampon regenerujący",
    client: "—",
    where: "Osobno",
    amount: 89,
  },
  {
    id: "c",
    when: "16.10.2026 17:30",
    items: "Olejek arganowy ×2",
    client: "Marta Sowa",
    where: "Przy wizycie",
    amount: 238,
  },
];

const newSale: Sale = {
  id: "new",
  when: "17.10.2026 14:05",
  items: "Szampon regenerujący ×2",
  client: "Natalia Wrona",
  where: "Osobno",
  amount: 178,
};

type SaleDraft = {
  picking: boolean;
  product: Product | null;
  qty: string;
  qtyFocus: boolean;
  client: string | null;
};

type Receipt = { qty: string };

const szt = (n: number) => `${n} szt.`;

export function InventoryMockup({ className }: { className?: string }) {
  const [tab, setTab] = useState<"stock" | "sales">("stock");
  const [products, setProducts] = useState(initialProducts);
  const [sales, setSales] = useState(initialSales);
  const [sale, setSale] = useState<SaleDraft | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [history, setHistory] = useState(false);
  const [fresh, setFresh] = useState<string | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  // remounts the content so tickers start fresh instead of rolling back
  const [cycle, setCycle] = useState(0);

  const reset = () => {
    setTab("stock");
    setProducts(initialProducts);
    setSales(initialSales);
    setSale(null);
    setHover(null);
    setReceipt(null);
    setHistory(false);
    setFresh(null);
    setCaption(null);
    setFading(false);
    setCycle((c) => c + 1);
  };

  async function play(d: Demo) {
    const setStock = (stock: number) =>
      setProducts((ps) => ps.map((p) => (p.id === "p1" ? { ...p, stock } : p)));
    const editSale = (patch: Partial<SaleDraft>) =>
      setSale((s) => (s ? { ...s, ...patch } : s));

    await d.wait(900);
    setCaption("Sprzedaż kosmetyku przy recepcji");
    await d.click("tab-sales");
    setTab("sales");
    await d.click("new-sale");
    setSale({
      picking: false,
      product: null,
      qty: "1",
      qtyFocus: false,
      client: null,
    });
    await d.wait(500);
    await d.click("sale-product", 700);
    editSale({ picking: true });
    await d.click("opt-p1", 700);
    editSale({ picking: false, product: initialProducts[0] });
    await d.click("sale-qty", 700);
    editSale({ qtyFocus: true, qty: "" });
    await d.type("2", (qty) => editSale({ qty }));
    await d.click("sale-client", 800);
    editSale({ qtyFocus: false, client: "Natalia Wrona" });
    await d.wait(400);
    await d.click("sell", 800);
    setSale(null);
    setSales((list) => [newSale, ...list]);
    setFresh("new");
    d.toast("success", "Sprzedaż została zapisana.");
    await d.wait(2000);

    setCaption("Stan schodzi z magazynu sam");
    await d.click("tab-stock");
    setTab("stock");
    await d.wait(500);
    setStock(3);
    await d.wait(900);
    d.toast("warning", "Szampon regenerujący: zostały 3 szt.");
    await d.wait(1600);

    setCaption("Przyjęcie dostawy");
    await d.point("row-p1", 800);
    setHover("p1");
    await d.click("receive-p1", 700);
    setReceipt({ qty: "" });
    await d.wait(400);
    await d.click("receipt-qty", 600);
    await d.type("24", (qty) => setReceipt({ qty }));
    await d.click("receive", 800);
    setReceipt(null);
    setHover(null);
    setStock(27);
    d.toast("success", "Dostawa została przyjęta.");
    await d.wait(1800);

    setCaption("Każdy ruch zostaje w historii");
    await d.click("name-p1", 800);
    setHistory(true);
    await d.wait(3000);
    setHistory(false);

    d.hide();
    setCaption(null);
    await d.wait(1200);
    setFading(true);
    await d.wait(450);
    reset();
  }

  const { ref, cursor } = useDemo(TOASTER, play, reset);
  const shampoo = products[0];

  return (
    <DemoStage
      stageRef={ref}
      cursor={cursor}
      toasterId={TOASTER}
      path="/dashboard/warehouse"
      className={className}
      label="Magazyn w Saloonik: stany produktów, sprzedaż przy recepcji i przyjęcie dostawy"
      note="Widok poglądowy na przykładowych danych. W systemie magazyn ma też inwentaryzację i zużycie materiałów przy zabiegach."
    >
      <div className="flex text-left">
        <AppSidebar active={WarehouseIcon} />
        <div className="bg-background @container relative min-h-[27rem] min-w-0 flex-1 text-xs">
          <PageHeader
            title="Magazyn"
            subtitle={
              tab === "stock"
                ? "Stany produktów w Twoim salonie"
                : "Produkty sprzedane w Twoim salonie"
            }
            caption={caption}
          >
            <span className="bg-muted ml-auto flex shrink-0 rounded-lg p-0.5 text-[11px] font-medium @md:ml-0">
              {(["stock", "sales"] as const).map((t) => (
                <span
                  key={t}
                  data-demo={`tab-${t}`}
                  className="relative px-2.5 py-1"
                >
                  {tab === t && (
                    <motion.span
                      layoutId="inventory-tab"
                      className="bg-card absolute inset-0 rounded-md shadow-xs"
                      transition={SETTLE}
                    />
                  )}
                  <span
                    className={cn(
                      "relative",
                      tab !== t && "text-muted-foreground",
                    )}
                  >
                    {t === "stock" ? "Stan" : "Sprzedaż"}
                  </span>
                </span>
              ))}
            </span>
          </PageHeader>

          <div className="flex items-center gap-1.5 px-3 pb-2.5">
            <Btn className="hidden gap-3 @sm:inline-flex">
              {tab === "stock" ? "Każdy stan" : "Wszystkie"}
              <ChevronDownIcon className="text-muted-foreground" />
            </Btn>
            <Btn className="hidden gap-3 @2xl:inline-flex">
              {tab === "stock" ? "Każde przeznaczenie" : "Każda płatność"}
              <ChevronDownIcon className="text-muted-foreground" />
            </Btn>
            <span className="hidden items-center gap-1.5 px-1 text-[11px] whitespace-nowrap @xl:flex">
              <Switch on={false} />
              {tab === "stock" ? "Tylko kończące się" : "Anulowane"}
            </span>
            {tab === "stock" ? (
              <Btn variant="primary" className="ml-auto">
                <PlusIcon /> Nowy produkt
              </Btn>
            ) : (
              <Btn variant="primary" demo="new-sale" className="ml-auto">
                <PlusIcon /> Nowa sprzedaż
              </Btn>
            )}
            <span className="hidden rounded-md border p-0.5 @md:flex">
              <span className="bg-muted rounded px-1 py-0.5">
                <ListIcon className="size-3.5" />
              </span>
              <span className="text-muted-foreground px-1 py-0.5">
                <GridIcon className="size-3.5" />
              </span>
            </span>
          </div>

          <motion.div
            key={cycle}
            animate={{ opacity: fading ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className="bg-card mx-3 overflow-hidden rounded-lg border shadow-xs"
          >
            {tab === "stock" ? (
              <StockTable products={products} hover={hover} />
            ) : (
              <SalesTable sales={sales} fresh={fresh} />
            )}
          </motion.div>

          <div className="text-muted-foreground flex items-center justify-between px-4 py-2 text-[10px]">
            <span>
              Łącznie {tab === "stock" ? products.length : sales.length}{" "}
              rekordów
            </span>
            <span className="flex items-center gap-1">
              <span className="hidden @sm:inline">Strona 1 z 1</span>
              <ChevronLeftIcon className="size-3" />
              <span className="border-primary/30 bg-primary/10 text-foreground flex size-5 items-center justify-center rounded border font-medium">
                1
              </span>
              <ChevronRightIcon className="size-3" />
            </span>
          </div>

          <AnimatePresence>
            {sale && <SaleDialog key="sale" sale={sale} />}
            {receipt && (
              <ReceiptDialog
                key="receipt"
                product={shampoo}
                qty={receipt.qty}
              />
            )}
            {history && <HistoryDialog key="history" product={shampoo} />}
          </AnimatePresence>
        </div>
      </div>
    </DemoStage>
  );
}

const stockCol = {
  stock: "w-28 shrink-0",
  min: "hidden w-16 shrink-0 @xl:block",
  use: "hidden w-24 shrink-0 @md:block",
  price: "hidden w-16 shrink-0 @xl:block",
  actions: "w-16 shrink-0",
};

function StockTable({
  products,
  hover,
}: {
  products: Product[];
  hover: string | null;
}) {
  return (
    <>
      <div className={thRow}>
        <Checkbox />
        <Th label="Produkt" sort grip={false} className="flex-1 pl-1" />
        <Th label="Stan" sort className={stockCol.stock} />
        <Th label="Minimum" className={stockCol.min} />
        <Th label="Przeznaczenie" className={stockCol.use} />
        <Th label="Cena" className={stockCol.price} />
        <span className={stockCol.actions} />
      </div>
      <div className="flex items-center gap-2 border-b px-3 py-1.5">
        <span className="size-3.5 shrink-0" />
        <Input
          className="h-6 w-1/2 text-[11px]"
          placeholder="Filtruj produkt…"
        />
      </div>
      {products.map((p, i) => {
        const low = p.stock < p.min;
        return (
          <div
            key={p.id}
            data-demo={`row-${p.id}`}
            className={cn(
              "flex h-10 items-center gap-2 px-3 transition-colors duration-500",
              i % 2 === 1 && "bg-muted/40",
              hover === p.id && "bg-muted",
            )}
          >
            <Checkbox />
            <span className="flex min-w-0 flex-1 items-center gap-1.5 pl-1">
              <span data-demo={`name-${p.id}`} className="truncate font-medium">
                {p.name}
              </span>
              <AnimatePresence>
                {low && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:text-amber-400"
                  >
                    <TriangleAlertIcon className="size-3" />
                    <span className="hidden @xl:inline">Kończy się</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span
              className={cn(
                stockCol.stock,
                "font-mono text-[11px] whitespace-nowrap tabular-nums transition-colors",
                low && "font-semibold text-amber-700 dark:text-amber-400",
              )}
            >
              <Ticker value={p.stock} format={szt} />
              <span className="text-muted-foreground font-normal">
                {" "}
                × {p.size}
              </span>
            </span>
            <span
              className={cn(
                stockCol.min,
                "text-muted-foreground font-mono text-[11px]",
              )}
            >
              {p.min} szt.
            </span>
            <span className={stockCol.use}>
              <span
                className={cn(
                  "rounded-md px-1.5 py-0.5 text-[10px] font-medium",
                  p.use === "Sprzedaż"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
                )}
              >
                {p.use}
              </span>
            </span>
            <span
              className={cn(
                stockCol.price,
                "font-mono text-[11px] tabular-nums",
              )}
            >
              {p.price ? zl(p.price).replace(" zł", "") : "—"}
            </span>
            <span
              className={cn(
                stockCol.actions,
                "text-muted-foreground flex justify-end gap-2 transition-opacity",
                hover === p.id ? "opacity-100" : "opacity-0",
              )}
            >
              <span data-demo={`receive-${p.id}`}>
                <TruckIcon className="size-3.5" />
              </span>
              <ClipboardCheckIcon className="size-3.5" />
              <EllipsisIcon className="size-3.5" />
            </span>
          </div>
        );
      })}
    </>
  );
}

const saleCol = {
  when: "w-24 shrink-0",
  client: "hidden w-24 shrink-0 @lg:block",
  where: "hidden w-20 shrink-0 @2xl:block",
  paid: "w-16 shrink-0",
  amount: "w-18 shrink-0 text-right",
};

function SalesTable({ sales, fresh }: { sales: Sale[]; fresh: string | null }) {
  return (
    <>
      <div className={thRow}>
        <Th label="Data" grip={false} className={saleCol.when} />
        <Th label="Produkty" className="flex-1" />
        <Th label="Klient" className={saleCol.client} />
        <Th label="Gdzie" className={saleCol.where} />
        <Th label="Płatność" className={saleCol.paid} />
        <Th
          label="Kwota"
          grip={false}
          className={cn(saleCol.amount, "justify-end")}
        />
      </div>
      <AnimatePresence initial={false}>
        {sales.map((s, i) => (
          <motion.div
            key={s.id}
            layout="position"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={SETTLE}
            className={cn(
              "relative overflow-hidden",
              i % 2 === 1 && "bg-muted/40",
            )}
          >
            {fresh === s.id && (
              <motion.span
                className="bg-primary/12 absolute inset-0"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2.4, delay: 0.6 }}
              />
            )}
            <div className="relative flex h-10 items-center gap-2 px-3">
              <span className={cn(saleCol.when, "text-[11px] tabular-nums")}>
                {s.when}
              </span>
              <span className="min-w-0 flex-1 truncate">{s.items}</span>
              <span className={cn(saleCol.client, "truncate")}>{s.client}</span>
              <span className={saleCol.where}>{s.where}</span>
              <span className={saleCol.paid}>
                <span className="rounded-full bg-emerald-500/12 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-400">
                  Opłacona
                </span>
              </span>
              <span
                className={cn(
                  saleCol.amount,
                  "font-mono text-[11px] font-medium tabular-nums",
                )}
              >
                {zl(s.amount)}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

function SaleDialog({ sale }: { sale: SaleDraft }) {
  const price = sale.product?.price ?? 0;
  const total = price * (Number(sale.qty) || 0);
  return (
    <DemoDialog
      title="Nowa sprzedaż"
      description="Sprzedaż bez wizyty, np. klientka kupuje szampon przy recepcji. Towar zejdzie ze stanu tego oddziału."
      className="max-w-96"
    >
      <div className="flex items-end gap-2 rounded-lg border p-2.5">
        <Field label="Produkt" className="relative min-w-0 flex-1">
          <Input demo="sale-product" select placeholder="Wybierz produkt">
            {sale.product?.name}
          </Input>
          <Dropdown show={sale.picking}>
            {initialProducts
              .filter((p) => p.use === "Sprzedaż")
              .map((p) => (
                <span
                  key={p.id}
                  data-demo={`opt-${p.id}`}
                  className="flex items-center justify-between gap-2 rounded px-2 py-1"
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-muted-foreground shrink-0 font-mono text-[10px]">
                    {szt(p.stock)}
                  </span>
                </span>
              ))}
          </Dropdown>
        </Field>
        <Field label="Ilość" className="w-14 shrink-0">
          <Input demo="sale-qty" focused={sale.qtyFocus} suffix="szt.">
            {sale.qty}
          </Input>
        </Field>
        <Field label="Cena" className="hidden w-18 shrink-0 @sm:block">
          <Input suffix="zł" placeholder="0,00">
            {sale.product && zl(price).replace(" zł", "")}
          </Input>
        </Field>
        <span className="flex h-7 shrink-0 items-center gap-1.5">
          <span className="font-mono text-[11px] font-semibold tabular-nums">
            <Ticker value={total} format={zl} />
          </span>
          <TrashIcon className="text-muted-foreground size-3.5" />
        </span>
      </div>

      <div className="flex items-center justify-between">
        <Btn>
          <PlusIcon /> Dodaj produkt
        </Btn>
        <span>
          Razem{" "}
          <span className="font-mono font-semibold tabular-nums">
            <Ticker value={total} format={zl} />
          </span>
        </span>
      </div>

      <div className="flex gap-3">
        <Field label="Klient (opcjonalnie)" className="flex-1">
          <span
            data-demo="sale-client"
            className={cn(
              "flex h-12 flex-col items-center justify-center gap-0.5 rounded-lg border-2 text-[10px]",
              sale.client
                ? "flex-row gap-2 border-solid px-2"
                : "text-muted-foreground border-dashed",
            )}
          >
            {sale.client ? (
              <>
                <Avatar initials="NW" color="--viz-3" />
                <span className="text-foreground text-xs font-medium">
                  {sale.client}
                </span>
              </>
            ) : (
              <>
                <UserPlusIcon className="size-3.5" />
                Bez klienta
              </>
            )}
          </span>
        </Field>
        <Field label="Płatność" className="flex-1">
          <span className="flex h-7 items-center gap-2">
            <Switch on /> Opłacona
          </span>
        </Field>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <Btn>Anuluj</Btn>
        <Btn
          variant="primary"
          demo="sell"
          className={cn(!sale.product && "opacity-50")}
        >
          Sprzedaj · <Ticker value={total} format={zl} />
        </Btn>
      </div>
    </DemoDialog>
  );
}

function ReceiptDialog({ product, qty }: { product: Product; qty: string }) {
  const after = qty ? product.stock + Number(qty) : null;
  return (
    <DemoDialog
      title="Przyjmij dostawę"
      description="Dodaj do stanu towar, który przyszedł do tego oddziału."
    >
      <div className="bg-muted/50 flex items-center justify-between gap-3 rounded-lg px-3 py-2">
        <span className="min-w-0 truncate font-medium">{product.name}</span>
        <span className="shrink-0 text-right">
          <span className="text-muted-foreground block text-[10px]">
            Teraz → po zapisie
          </span>
          <span className="font-mono text-[11px] tabular-nums">
            {szt(product.stock)}
            <span className="text-muted-foreground"> → </span>
            <span className="font-semibold">
              {after === null ? "—" : szt(after)}
            </span>
          </span>
        </span>
      </div>
      <div className="flex gap-3">
        <Field label="Ilość w dostawie *" className="flex-1">
          <Input demo="receipt-qty" focused suffix="szt.">
            {qty}
          </Input>
        </Field>
        <Field label="Cena zakupu" className="flex-1">
          <Input suffix="zł/szt." placeholder="0,00" />
        </Field>
      </div>
      <Field label="Notatka">
        <span className="text-muted-foreground bg-background block h-10 rounded-md border px-2 py-1.5 shadow-xs">
          np. numer faktury, dostawca
        </span>
      </Field>
      <div className="flex justify-end gap-2 pt-1">
        <Btn>Anuluj</Btn>
        <Btn
          variant="primary"
          demo="receive"
          className={cn(!qty && "opacity-50")}
        >
          Przyjmij
        </Btn>
      </div>
    </DemoDialog>
  );
}

const movements = [
  {
    label: "Przyjęcie dostawy",
    when: "17.10.2026 14:07",
    delta: 24,
    total: 27,
  },
  { label: "Sprzedaż", when: "17.10.2026 14:05", delta: -2, total: 3 },
  { label: "Sprzedaż", when: "17.10.2026 10:15", delta: -1, total: 5 },
];

function HistoryDialog({ product }: { product: Product }) {
  return (
    <DemoDialog
      title="Historia ruchów"
      description={`${product.name} · stan ${szt(product.stock)}`}
    >
      <ul className="-mt-1 divide-y border-t">
        {movements.map((m) => (
          <li key={m.when} className="flex items-center justify-between py-2">
            <span>
              <span className="block">{m.label}</span>
              <span className="text-muted-foreground text-[10px]">
                {m.when} · Anna Nowak
              </span>
            </span>
            <span className="text-right font-mono text-[11px]">
              <span
                className={cn(
                  "block font-semibold",
                  m.delta > 0
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-destructive",
                )}
              >
                {m.delta > 0 ? "+" : "−"}
                {szt(Math.abs(m.delta))}
              </span>
              <span className="text-muted-foreground">= {szt(m.total)}</span>
            </span>
          </li>
        ))}
      </ul>
    </DemoDialog>
  );
}
