"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type ToastTone = "success" | "error" | "warning" | "info" | "delete";

const TONE_CLASS: Record<ToastTone, string> = {
  success: "text-chart-2",
  error: "text-destructive",
  warning: "text-amber-500 dark:text-amber-400",
  info: "text-primary",
  delete: "text-destructive",
};

const TONE_MARK: Record<ToastTone, string> = {
  success: "M10 16.5l4 4 8-9",
  error: "M11.5 11.5l9 9M20.5 11.5l-9 9",
  warning: "M16 9.5v8M16 22.5v.01",
  info: "M16 14.5v8M16 9.5v.01",
  delete: "M11 12h10M14 12v-1.5h4V12M12.5 12l.8 9.5h5.4l.8-9.5",
};

export function ToastStatusIcon({
  tone,
  className,
}: {
  tone: ToastTone;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const draw = reduceMotion
    ? { initial: false as const }
    : { initial: { pathLength: 0 }, animate: { pathLength: 1 } };

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-7 shrink-0", TONE_CLASS[tone], className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.circle
        cx="16"
        cy="16"
        r="14"
        {...draw}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      <motion.path
        d={TONE_MARK[tone]}
        {...draw}
        transition={{ duration: 0.3, delay: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}
