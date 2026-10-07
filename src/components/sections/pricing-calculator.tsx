"use client";

import { useId, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  extraEmployeesPrice,
  formatPln,
  isEnterprise,
  monthlyPrice,
  periodPrice,
  plan,
  withVat,
  type BillingPeriod,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

const included = [
  "Kalendarz wizyt i baza klientów",
  "Karty zabiegowe i zdjęcia przed/po",
  `Przypomnienia SMS — ${plan.smsPerPersonMonth} SMS na osobę/mies.`,
  "Statystyki, role i dziennik aktywności",
  "Import i eksport z Excela",
  "Wszystkie przyszłe funkcje",
];

type Props = { registerUrl: string; contactEmail: string };

export function PricingCalculator({ registerUrl, contactEmail }: Props) {
  const [employees, setEmployees] = useState(2);
  const [branches, setBranches] = useState(1);
  const [period, setPeriod] = useState<BillingPeriod>("monthly");
  const [gross, setGross] = useState(false);
  const yearlyId = useId();
  const grossId = useId();

  const enterprise = isEnterprise(branches);
  const show = (net: number) => formatPln(gross ? withVat(net) : net);
  const monthly = monthlyPrice(employees, branches);
  const total = periodPrice(employees, branches, period);
  const extraBranches = Math.max(0, branches - plan.includedBranches);

  return (
    <div className="bg-card grid overflow-hidden rounded-2xl border shadow-xl lg:grid-cols-[1.1fr_1fr]">
      <div className="space-y-8 p-6 sm:p-10">
        <div>
          <h3 className="text-xl font-semibold">Skonfiguruj swój abonament</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Jeden plan ze wszystkimi funkcjami. Płacisz tylko za wielkość
            zespołu i liczbę lokali.
          </p>
        </div>

        <Stepper
          label="Pracownicy"
          hint={
            employees >= plan.maxEmployees
              ? "Powyżej 15 pracowników kolejni są bezpłatni"
              : "Bez właściciela — właściciel jest w cenie"
          }
          value={employees}
          display={
            employees >= plan.maxEmployees
              ? `${plan.maxEmployees}+`
              : String(employees)
          }
          min={0}
          max={plan.maxEmployees}
          onChange={setEmployees}
        />
        <Stepper
          label="Oddziały"
          hint={
            enterprise
              ? "Powyżej 5 oddziałów — wycena indywidualna"
              : "Pierwszy oddział jest w cenie"
          }
          value={branches}
          display={enterprise ? `${plan.maxBranches}+` : String(branches)}
          min={1}
          max={plan.maxBranches + 1}
          onChange={setBranches}
        />

        <div className="flex flex-wrap gap-x-8 gap-y-4 border-t pt-6">
          <label
            htmlFor={yearlyId}
            className="flex cursor-pointer items-center gap-3 text-sm font-medium"
          >
            <Switch
              id={yearlyId}
              checked={period === "yearly"}
              onCheckedChange={(v) => setPeriod(v ? "yearly" : "monthly")}
            />
            Płatność roczna
            <Badge variant="success">2 miesiące gratis</Badge>
          </label>
          <label
            htmlFor={grossId}
            className="flex cursor-pointer items-center gap-3 text-sm font-medium"
          >
            <Switch id={grossId} checked={gross} onCheckedChange={setGross} />
            Pokaż ceny brutto
          </label>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground flex flex-col gap-6 p-6 sm:p-10">
        {enterprise ? (
          <div className="space-y-3">
            <p className="text-sm font-medium opacity-80">Enterprise</p>
            <p className="text-4xl font-semibold">Wycena indywidualna</p>
            <p className="opacity-80">
              Masz więcej niż {plan.maxBranches} oddziałów? Napisz do nas —
              przygotujemy ofertę dopasowaną do sieci lokali.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-medium opacity-80">
              {period === "yearly"
                ? "Płacisz raz w roku"
                : "Płacisz co miesiąc"}{" "}
              · {gross ? "brutto" : "netto"}
            </p>
            <p className="mt-2 flex items-baseline gap-2" aria-live="polite">
              <span className="font-mono text-5xl font-semibold tracking-tight">
                {show(total)}
              </span>
              <span className="opacity-80">
                /{period === "yearly" ? "rok" : "mies."}
              </span>
            </p>
            {period === "yearly" && (
              <p className="mt-1 text-sm opacity-80">
                Zamiast {show(monthly * 12)} — oszczędzasz {show(monthly * 2)}
              </p>
            )}
            <dl className="mt-6 space-y-2 border-t border-current/20 pt-4 text-sm">
              <Row
                label="Właściciel + 1 oddział"
                value={show(plan.monthlyPrice)}
              />
              {employees > 0 && (
                <Row
                  label={`Pracownicy (${employees >= plan.maxEmployees ? "15+" : employees})`}
                  value={show(extraEmployeesPrice(employees))}
                />
              )}
              {extraBranches > 0 && (
                <Row
                  label={`Dodatkowe oddziały (${extraBranches})`}
                  value={show(extraBranches * plan.pricePerExtraBranch)}
                />
              )}
              <Row label="Razem miesięcznie" value={show(monthly)} strong />
            </dl>
          </div>
        )}

        <ul className="space-y-2 text-sm">
          {included.map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0" /> {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto space-y-2">
          <Button
            asChild
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-primary dark:text-primary-foreground w-full"
          >
            {enterprise ? (
              <a href={`mailto:${contactEmail}?subject=Saloonik%20Enterprise`}>
                Napisz do nas
              </a>
            ) : (
              <a href={registerUrl}>Zacznij 7 dni za darmo</a>
            )}
          </Button>
          <p className="text-center text-xs opacity-80">
            Bez karty płatniczej. Ceny netto, do których doliczamy 23% VAT.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn("flex justify-between gap-4", strong && "font-semibold")}
    >
      <dt className={cn(!strong && "opacity-80")}>{label}</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  );
}

type StepperProps = {
  label: string;
  hint: string;
  value: number;
  display: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
};

function Stepper({
  label,
  hint,
  value,
  display,
  min,
  max,
  onChange,
}: StepperProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-muted-foreground text-sm">{hint}</p>
      </div>
      <div
        className="flex items-center gap-1 rounded-lg border p-1"
        role="group"
        aria-label={label}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`${label}: mniej`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus />
        </Button>
        <output
          aria-live="polite"
          className="w-10 text-center font-mono text-lg font-semibold"
        >
          {display}
        </output>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`${label}: więcej`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
