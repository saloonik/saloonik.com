import { describe, expect, it } from "vitest";
import {
  formatPln,
  monthlyPrice,
  periodPrice,
  netOf,
  grossPln,
  isEnterprise,
  plan,
} from "./pricing";

describe("formatPln", () => {
  it("pełne złote bez groszy, inaczej zawsze dwa miejsca", () => {
    expect(formatPln(184).replace(/\s/g, " ")).toBe("184 zł");
    expect(formatPln(2263.2).replace(/\s/g, " ")).toBe("2263,20 zł");
  });
});

describe("monthlyPrice", () => {
  it.each([
    [0, 1, 98],
    [1, 1, 142],
    [3, 1, 230],
    [5, 1, 318],
    [6, 2, 422],
    [12, 5, 827],
    [15, 5, 920],
    [40, 5, 920],
  ])(
    "%i pracowników, %i oddziałów → %i zł",
    (employees, branches, expected) => {
      expect(monthlyPrice(employees, branches)).toBe(expected);
    },
  );

  it("większy zespół nigdy nie kosztuje mniej", () => {
    for (let e = 1; e <= 20; e++) {
      expect(monthlyPrice(e, 1)).toBeGreaterThanOrEqual(monthlyPrice(e - 1, 1));
    }
  });
});

describe("periodPrice", () => {
  it("rocznie płaci się za 10 miesięcy", () => {
    expect(periodPrice(3, 1, "yearly")).toBe(2300);
    expect(periodPrice(3, 1, "monthly")).toBe(230);
  });
});

describe("VAT i Enterprise", () => {
  it("ceny brutto są w pełnych złotych", () => {
    expect(grossPln(98)).toBe("98 zł");
    for (const p of [
      plan.monthlyPrice,
      plan.pricePerExtraEmployee,
      plan.pricePerExtraEmployeeAboveTier,
      plan.pricePerExtraBranch,
    ])
      expect(Number.isInteger(p)).toBe(true);
  });

  it("netto liczy z brutto przez 23% VAT", () => {
    expect(netOf(98)).toBe(79.67);
    expect(netOf(123)).toBe(100);
  });

  it("powyżej 5 oddziałów to Enterprise", () => {
    expect(isEnterprise(5)).toBe(false);
    expect(isEnterprise(6)).toBe(true);
  });
});
