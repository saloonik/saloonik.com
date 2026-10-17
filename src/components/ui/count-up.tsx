"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

// Counts the number inside a label like "48 320 zł" up from zero once it scrolls into view.
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const match = value.match(/^(\D*)(\d[\d ]*\d|\d)(.*)$/);
    if (!inView || reduced || !match) return;
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/\s/g, ""));
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current)
          ref.current.textContent = `${prefix}${Math.round(v).toLocaleString("pl-PL")}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return <span ref={ref}>{value}</span>;
}
