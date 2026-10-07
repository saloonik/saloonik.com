import { describe, expect, it } from "vitest";
import { occupancy, resolveDrop, type DemoVisit } from "./calendar-demo";

const open = { from: 9 * 60, to: 17 * 60 };
const visit = (
  id: string,
  employee: number,
  start: number,
  duration: number,
): DemoVisit => ({
  id,
  employee,
  start,
  duration,
  client: id,
  service: "",
  price: 0,
});
const a = visit("a", 0, 600, 60);
const b = visit("b", 0, 690, 30);
const visits = [a, b];

describe("resolveDrop", () => {
  it("odrzuca upuszczenie w tym samym miejscu", () => {
    expect(resolveDrop(visits, a, 0, 600, open)).toEqual({
      ok: false,
      reason: "noop",
    });
  });
  it("odrzuca start poza godzinami otwarcia", () => {
    expect(resolveDrop(visits, a, 0, 17 * 60, open)).toEqual({
      ok: false,
      reason: "closed",
    });
  });
  it("odrzuca nakładanie się na inną wizytę tego samego pracownika", () => {
    expect(resolveDrop(visits, a, 0, 660, open)).toEqual({
      ok: false,
      reason: "conflict",
    });
  });
  it("pozwala na styk wizyt i na tę samą godzinę u innego pracownika", () => {
    expect(resolveDrop(visits, a, 0, 720, open)).toEqual({ ok: true });
    expect(resolveDrop(visits, a, 1, 690, open)).toEqual({ ok: true });
  });
});

describe("occupancy", () => {
  it("liczy zajęte minuty względem dostępnych, po odjęciu nieobecności", () => {
    expect(occupancy(visits, 0, open, [{ from: 720, to: 780 }])).toBeCloseTo(
      90 / 420,
    );
  });
});
