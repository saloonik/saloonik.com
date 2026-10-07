export const plan = {
  monthlyPrice: 79,
  includedEmployees: 0,
  includedBranches: 1,
  maxEmployees: 15,
  maxBranches: 5,
  pricePerExtraEmployee: 35,
  extraEmployeeTierSize: 5,
  pricePerExtraEmployeeAboveTier: 25,
  pricePerExtraBranch: 59,
  yearlyMonthsCharged: 10,
  smsPerPersonMonth: 200,
  vatRate: 0.23,
} as const;

export type BillingPeriod = "monthly" | "yearly";

export const round = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export function extraEmployeesPrice(extraEmployees: number) {
  const capped = Math.min(
    extraEmployees,
    Math.max(0, plan.maxEmployees - plan.includedEmployees),
  );
  const inTier = Math.min(capped, plan.extraEmployeeTierSize);
  return (
    inTier * plan.pricePerExtraEmployee +
    (capped - inTier) * plan.pricePerExtraEmployeeAboveTier
  );
}

export function monthlyPrice(employees: number, branches: number) {
  const extraBranches = Math.max(0, branches - plan.includedBranches);
  return round(
    plan.monthlyPrice +
      extraEmployeesPrice(Math.max(0, employees - plan.includedEmployees)) +
      extraBranches * plan.pricePerExtraBranch,
  );
}

export function periodPrice(
  employees: number,
  branches: number,
  period: BillingPeriod,
) {
  const monthly = monthlyPrice(employees, branches);
  return period === "yearly"
    ? round(monthly * plan.yearlyMonthsCharged)
    : monthly;
}

export const withVat = (net: number) => round(net * (1 + plan.vatRate));

export const isEnterprise = (branches: number) => branches > plan.maxBranches;

const plnWhole = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 0 });
const plnCents = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatPln = (value: number) =>
  `${(Number.isInteger(round(value)) ? plnWhole : plnCents).format(value)} zł`;
