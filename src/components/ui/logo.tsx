"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo as BrandLogo } from "@saloonik/icons/web";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
  animate = false,
}: {
  className?: string;
  /** Letter-by-letter entrance; keep it to the header so it plays once per page load. */
  animate?: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  return (
    <Link
      href="/"
      aria-label="Saloonik — strona główna"
      onClick={(e) => {
        onClick?.();
        // On the home page the link goes nowhere, so bring the visitor back to the top.
        if (pathname !== "/") return;
        e.preventDefault();
        const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
        if (location.hash) history.replaceState(null, "", "/");
      }}
      draggable={false}
      // padding + negative margin = bigger tap target without moving the logo
      className={cn(
        "focus-visible:ring-ring/50 -m-2 inline-flex shrink-0 items-center rounded-md p-2 outline-none select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] focus-visible:ring-[3px]",
        className,
      )}
    >
      {/* Both themes rendered and toggled by CSS: no resolvedTheme, no hydration flash. */}
      <BrandLogo animate={animate} className="block h-6 w-auto dark:hidden" />
      <BrandLogo
        theme="dark"
        animate={animate}
        className="hidden h-6 w-auto dark:block"
      />
    </Link>
  );
}
