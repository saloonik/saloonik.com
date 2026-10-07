export type DemoVisit = {
  id: string;
  employee: number;
  start: number;
  duration: number;
  client: string;
  service: string;
  price: number;
};

export type DropResult =
  { ok: true } | { ok: false; reason: "noop" | "closed" | "conflict" };

export function hasConflict(
  visits: DemoVisit[],
  moving: DemoVisit,
  employee: number,
  start: number,
) {
  const end = start + moving.duration;
  return visits.some(
    (v) =>
      v.id !== moving.id &&
      v.employee === employee &&
      v.start < end &&
      start < v.start + v.duration,
  );
}

export function resolveDrop(
  visits: DemoVisit[],
  moving: DemoVisit,
  employee: number,
  start: number,
  open: { from: number; to: number },
): DropResult {
  if (start === moving.start && employee === moving.employee)
    return { ok: false, reason: "noop" };
  if (start < open.from || start >= open.to)
    return { ok: false, reason: "closed" };
  if (hasConflict(visits, moving, employee, start))
    return { ok: false, reason: "conflict" };
  return { ok: true };
}

export function occupancy(
  visits: DemoVisit[],
  employee: number,
  open: { from: number; to: number },
  absences: { from: number; to: number }[] = [],
) {
  const clipped = (from: number, to: number) =>
    Math.max(0, Math.min(to, open.to) - Math.max(from, open.from));
  const available =
    clipped(open.from, open.to) -
    absences.reduce((sum, a) => sum + clipped(a.from, a.to), 0);
  const booked = visits
    .filter((v) => v.employee === employee)
    .reduce((sum, v) => sum + clipped(v.start, v.start + v.duration), 0);
  return available > 0 ? booked / available : 0;
}

export const formatTime = (minute: number) =>
  `${String(Math.floor(minute / 60)).padStart(2, "0")}:${String(minute % 60).padStart(2, "0")}`;

export const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}min`;
};
