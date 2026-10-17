"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { MotionConfig } from "motion/react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </NextThemesProvider>
  );
}

const noop = () => () => {};

// Thumb position comes from the `dark` class, so SSR and first paint already match.
// aria-checked waits for hydration: the server cannot know the theme.
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
  const dark = hydrated && resolvedTheme === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Ciemny motyw"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="bg-muted/70 hover:bg-muted focus-visible:ring-ring/50 relative grid h-8 w-15 shrink-0 grid-cols-2 items-center rounded-full border p-0.5 transition-colors outline-none focus-visible:ring-[3px]"
    >
      <span className="bg-background absolute top-0.5 left-0.5 size-6.5 rounded-full shadow-sm ring-1 ring-black/5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:translate-x-6.5 dark:ring-white/10" />
      <SunIcon
        size={15}
        className="text-foreground dark:text-muted-foreground relative mx-auto transition-colors"
      />
      <MoonIcon
        size={15}
        className="text-muted-foreground dark:text-foreground relative mx-auto transition-colors"
      />
    </button>
  );
}
