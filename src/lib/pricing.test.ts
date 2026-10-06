import { describe, expect, it } from "vitest";
import { formatPln, monthlyPrice, periodPrice, withVat, isEnterprise } from "./pricing";

describe("formatPln", () => {
  it("pełne złote bez groszy, inaczej zawsze dwa miejsca", () => {
    expect(formatPln(184).replace(/\s/g, " ")).toBe("184 zł");
    expect(formatPln(2263.2).replace(/\s/g, " ")).toBe("2263,20 zł");
  });
});

// Oczekiwane wartości policzone ze wzoru w SubscriptionPricing.cs:
// 79 + 35 × min(e, 5) + 25 × max(min(e, 15) − 5, 0) + 59 × (oddziały − 1)
describe("monthlyPrice", () => {
  it.each([
    [0, 1, 79],
    [1, 1, 114],
    [3, 1, 184],
    [5, 1, 254],
    [6, 2, 338],
    [12, 5, 665],
    [15, 5, 740],
    [40, 5, 740], // powyżej 15 pracowników kolejni są bezpłatni
  ])("%i pracowników, %i oddziałów → %i zł", (employees, branches, expected) => {
    expect(monthlyPrice(employees, branches)).toBe(expected);
  });

  it("większy zespół nigdy nie kosztuje mniej", () => {
    for (let e = 1; e <= 20; e++) {
      expect(monthlyPrice(e, 1)).toBeGreaterThanOrEqual(monthlyPrice(e - 1, 1));
    }
  });
});

describe("periodPrice", () => {
  it("rocznie płaci się za 10 miesięcy", () => {
    expect(periodPrice(3, 1, "yearly")).toBe(1840);
    expect(periodPrice(3, 1, "monthly")).toBe(184);
  });
});

describe("VAT i Enterprise", () => {
  it("dolicza 23% VAT z zaokrągleniem do grosza", () => {
    expect(withVat(79)).toBe(97.17);
    expect(withVat(184)).toBe(226.32);
  });

  it("powyżej 5 oddziałów to Enterprise", () => {
    expect(isEnterprise(5)).toBe(false);
    expect(isEnterprise(6)).toBe(true);
  });
});
