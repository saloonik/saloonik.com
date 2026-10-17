"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { toast } from "sonner";
import {
  BellIcon,
  BookOpenIcon,
  BuildingIcon,
  CalendarIcon,
  ChartColumnIcon,
  ChevronsUpDownIcon,
  ClipboardListIcon,
  DashboardIcon,
  GripVerticalIcon,
  HistoryIcon,
  InfoIcon,
  MenuIcon,
  TagIcon,
  UserLockIcon,
  UsersIcon,
  WarehouseIcon,
  XIcon,
  type AtelierIconComponent,
} from "@/components/ui/icons";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { AppWindow } from "./app-window";

export const GLIDE = { duration: 0.9, ease: [0.45, 0, 0.2, 1] } as const;
export const SETTLE = {
  type: "spring",
  stiffness: 260,
  damping: 30,
  mass: 0.9,
} as const;

type Cursor = { x: number; y: number; down: boolean; visible: boolean };
const hiddenCursor: Cursor = { x: 0, y: 0, down: false, visible: false };

export type Demo = {
  wait: (ms: number) => Promise<void>;
  /** Glides the cursor onto the element marked data-demo={name}. */
  point: (name: string, ms?: number) => Promise<void>;
  press: (down: boolean) => Promise<void>;
  click: (name: string, ms?: number) => Promise<void>;
  /** Types text letter by letter into a setter. */
  type: (text: string, set: (value: string) => void) => Promise<void>;
  /** Vertical distance between two marked elements, for drag ghosts. */
  dy: (from: string, to: string) => number;
  hide: () => void;
  toast: (tone: "success" | "info" | "warning", message: string) => void;
};

// Plays an async script in a loop while the mockup is on screen; like the
// calendar, nothing here is interactive.
export function useDemo(
  toasterId: string,
  play: (demo: Demo) => Promise<void>,
  reset: () => void,
) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [cursor, setCursor] = useState(hiddenCursor);
  const onPlay = useEffectEvent(play);
  const onReset = useEffectEvent(reset);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const ctrl = new AbortController();
    const el = (name: string) =>
      ref.current?.querySelector<HTMLElement>(`[data-demo="${name}"]`);
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const t = setTimeout(resolve, ms);
        ctrl.signal.addEventListener(
          "abort",
          () => {
            clearTimeout(t);
            reject(ctrl.signal.reason);
          },
          { once: true },
        );
      });
    const point = async (name: string, ms = 900) => {
      const target = el(name)?.getBoundingClientRect();
      const root = ref.current?.getBoundingClientRect();
      if (target && root)
        setCursor((c) => ({
          ...c,
          x: target.left - root.left + Math.min(target.width / 2, 28),
          y: target.top - root.top + target.height * 0.6,
          visible: true,
        }));
      await wait(ms);
    };
    const press = async (down: boolean) => {
      setCursor((c) => ({ ...c, down }));
      await wait(180);
    };
    const demo: Demo = {
      wait,
      point,
      press,
      click: async (name, ms) => {
        await point(name, ms);
        await press(true);
        await press(false);
      },
      type: async (text, set) => {
        for (let i = 1; i <= text.length; i++) {
          set(text.slice(0, i));
          await wait(70);
        }
      },
      dy: (from, to) =>
        (el(to)?.getBoundingClientRect().top ?? 0) -
        (el(from)?.getBoundingClientRect().top ?? 0),
      hide: () => setCursor((c) => ({ ...c, visible: false })),
      toast: (tone, message) => toast[tone](message, { toasterId }),
    };

    (async () => {
      for (;;) await onPlay(demo);
    })().catch(() => {});
    return () => {
      ctrl.abort();
      setCursor(hiddenCursor);
      onReset();
    };
  }, [inView, reduceMotion, toasterId]);

  return { ref, cursor };
}

export function DemoStage({
  stageRef,
  cursor,
  toasterId,
  label,
  path,
  note,
  className,
  children,
}: {
  path?: string;
  stageRef: React.Ref<HTMLDivElement>;
  cursor: Cursor;
  toasterId: string;
  label: string;
  note: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <div ref={stageRef} className="relative">
        <AppWindow label={label} path={path}>
          {children}
        </AppWindow>
        <DemoCursor cursor={cursor} />
        <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-xl [contain:paint]">
          <Toaster
            id={toasterId}
            position="bottom-right"
            offset={12}
            duration={2400}
            className="origin-bottom-right scale-80"
          />
        </div>
      </div>
      <p className="text-muted-foreground mt-3 flex items-start gap-1.5 px-1 text-xs text-pretty">
        <InfoIcon className="mt-px size-3.5 shrink-0" />
        {note}
      </p>
    </div>
  );
}

function DemoCursor({ cursor }: { cursor: Cursor }) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-60"
      initial={false}
      animate={{ x: cursor.x, y: cursor.y, opacity: cursor.visible ? 1 : 0 }}
      transition={{ ...GLIDE, opacity: { duration: 0.3 } }}
    >
      <AnimatePresence>
        {cursor.down && (
          <motion.span
            className="border-primary absolute -top-3 -left-3 size-6 rounded-full border-2"
            initial={{ scale: 0.3, opacity: 0.9 }}
            animate={{ scale: 1.4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        )}
      </AnimatePresence>
      <motion.svg
        viewBox="0 0 20 20"
        className="size-5 drop-shadow-md"
        animate={{ scale: cursor.down ? 0.82 : 1 }}
        style={{ originX: 0, originY: 0 }}
      >
        <path
          d="M2 1.5 L2 16.5 L6.2 12.6 L9 18.5 L11.6 17.3 L8.9 11.5 L14.6 11.5 Z"
          className="fill-foreground stroke-background"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

export function LiveCaption({
  caption,
  className,
}: {
  caption: string | null;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-muted-foreground hidden min-w-0 items-center gap-2 text-[11px] md:flex",
        className,
      )}
    >
      <span className="relative flex size-2 shrink-0">
        <span className="bg-primary absolute inset-0 rounded-full motion-safe:animate-ping" />
        <span className="bg-primary relative size-2 rounded-full" />
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={caption ?? "idle"}
          className="truncate"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
        >
          {caption ?? "Podgląd na żywo"}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Same groups as the collapsed sidebar in system.saloonik.com.
const sidebarGroups = [
  [DashboardIcon, BellIcon],
  [
    UserLockIcon,
    UsersIcon,
    CalendarIcon,
    TagIcon,
    WarehouseIcon,
    ClipboardListIcon,
    BuildingIcon,
  ],
  [BookOpenIcon, HistoryIcon, ChartColumnIcon],
];

export function AppSidebar({ active }: { active: AtelierIconComponent }) {
  return (
    <div className="bg-muted/30 hidden w-14 shrink-0 flex-col items-center border-r sm:flex">
      <span className="text-muted-foreground flex h-13 items-center">
        <MenuIcon size={18} animate={false} />
      </span>
      <span className="bg-border h-px w-full" />
      <div className="flex flex-1 flex-col items-center gap-0.5 py-2">
        {sidebarGroups.map((group, g) => (
          <div key={g} className="flex flex-col items-center gap-0.5">
            {g > 0 && <span className="bg-border my-1.5 h-px w-5" />}
            {group.map((Icon, i) => {
              const on = Icon === active;
              return (
                <span
                  key={i}
                  className={cn(
                    "relative flex size-8 items-center justify-center rounded-lg",
                    on
                      ? "bg-card text-foreground ring-border shadow-xs ring-1"
                      : "text-muted-foreground",
                  )}
                >
                  <Icon
                    size={16}
                    variant={on ? "tile" : "line"}
                    animate={on ? "play" : false}
                  />
                  {Icon === BellIcon && (
                    <span className="bg-primary ring-background absolute top-1.5 right-1.5 size-1.5 rounded-full ring-2" />
                  )}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <span className="bg-border h-px w-full" />
      <Avatar initials="AN" color="--viz-1" className="my-2.5 size-8" />
    </div>
  );
}

export function Avatar({
  initials,
  color,
  className,
}: {
  initials: string;
  color: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white",
        className,
      )}
      style={{ backgroundColor: `var(${color})` }}
    >
      {initials}
    </span>
  );
}

/** A number that rolls to its new value instead of jumping. */
export function Ticker({
  value,
  format,
}: {
  value: number;
  format: (value: number) => string;
}) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => format(Math.round(v)));
  useEffect(() => {
    const controls = animate(mv, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [mv, value]);
  return <motion.span>{text}</motion.span>;
}

const zlFormat = new Intl.NumberFormat("pl-PL", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
export const zl = (value: number) => `${zlFormat.format(value)} zł`;

// Static stand-ins for the shadcn/ui pieces used in system.saloonik.com,
// scaled down to fit a mockup window.

export function PageHeader({
  title,
  subtitle,
  caption,
  children,
}: {
  title: string;
  subtitle: string;
  caption: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 px-4 pt-3.5 pb-3">
      <div className="min-w-0">
        <p className="text-base leading-tight font-semibold">{title}</p>
        <p className="text-muted-foreground truncate text-[11px]">{subtitle}</p>
      </div>
      <LiveCaption caption={caption} className="mt-1 ml-auto" />
      {children}
    </div>
  );
}

export function Btn({
  variant = "outline",
  demo,
  className,
  children,
}: {
  variant?: "primary" | "outline" | "ghost";
  demo?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      data-demo={demo}
      className={cn(
        "inline-flex h-7 shrink-0 items-center justify-center gap-1 rounded-md px-2.5 text-[11px] font-medium whitespace-nowrap transition-colors [&_svg]:size-3.5",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "outline" && "bg-background border shadow-xs",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Checkbox({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "border-muted-foreground/35 bg-background size-3.5 shrink-0 rounded-[4px] border",
        className,
      )}
    />
  );
}

export function Switch({ on }: { on: boolean }) {
  return (
    <span
      className={cn(
        "flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors",
        on ? "bg-primary justify-end" : "bg-input justify-start",
      )}
    >
      <motion.span
        layout
        className="bg-background size-3 rounded-full shadow-xs"
      />
    </span>
  );
}

export function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-[11px] font-medium">{label}</p>
      {children}
    </div>
  );
}

/** A text input; `focused` adds the ring and a blinking caret. */
export function Input({
  demo,
  focused,
  suffix,
  placeholder,
  select,
  className,
  children,
}: {
  demo?: string;
  focused?: boolean;
  suffix?: string;
  placeholder?: string;
  select?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const empty = children === undefined || children === "" || children === null;
  return (
    <span
      data-demo={demo}
      className={cn(
        "bg-background flex h-7 items-center gap-1 rounded-md border px-2 shadow-xs transition-shadow",
        focused && "border-primary/60 ring-primary/25 ring-[3px]",
        className,
      )}
    >
      <span className="min-w-0 flex-1 truncate">
        {empty
          ? !focused && (
              <span className="text-muted-foreground">{placeholder}</span>
            )
          : children}
        {focused && (
          <span className="bg-foreground ml-px inline-block h-3 w-px align-middle motion-safe:animate-pulse" />
        )}
      </span>
      {suffix && (
        <span className="text-muted-foreground shrink-0">{suffix}</span>
      )}
      {select && (
        <ChevronsUpDownIcon className="text-muted-foreground size-3 shrink-0" />
      )}
    </span>
  );
}

/** Column header cell: uppercase label with the reorder grip and sort arrows. */
export function Th({
  label,
  sort,
  grip = true,
  className,
}: {
  label: string;
  sort?: boolean;
  grip?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("min-w-0", className)}>
      <span className="flex min-w-0 items-center gap-1 whitespace-nowrap">
        {grip && (
          <GripVerticalIcon className="text-muted-foreground/60 size-3 shrink-0" />
        )}
        <span className="truncate">{label}</span>
        {sort && (
          <ChevronsUpDownIcon className="text-muted-foreground/60 size-3 shrink-0" />
        )}
      </span>
    </span>
  );
}

export const thRow =
  "bg-muted/70 text-foreground/80 flex h-8 items-center gap-2 border-b px-3 text-[10px] font-semibold tracking-wider uppercase";

export function DemoDialog({
  title,
  description,
  className,
  children,
}: {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-start justify-center bg-black/30 p-3 pt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={cn(
          "bg-background relative w-full max-w-88 rounded-xl border p-4 text-xs shadow-2xl",
          className,
        )}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={SETTLE}
      >
        <XIcon className="text-muted-foreground absolute top-3.5 right-3.5 size-3.5" />
        <p className="pr-6 text-sm font-semibold">{title}</p>
        {description && (
          <p className="text-muted-foreground mt-0.5 pr-4 text-[11px] text-pretty">
            {description}
          </p>
        )}
        <div className="mt-3.5 space-y-3">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export function Dropdown({
  show,
  up,
  children,
}: {
  show: boolean;
  up?: boolean;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.span
          className={cn(
            "bg-popover absolute inset-x-0 z-10 block rounded-md border p-1 shadow-lg",
            up ? "bottom-8" : "top-8",
          )}
          initial={{ opacity: 0, y: up ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: up ? 4 : -4 }}
        >
          {children}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
