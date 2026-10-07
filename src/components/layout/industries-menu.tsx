"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { slug: string; h1: string; color: string };

export function IndustriesMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="industries-menu"
        onClick={() => setOpen((v) => !v)}
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]"
      >
        Branże
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          id="industries-menu"
          className="bg-popover text-popover-foreground animate-in fade-in-0 zoom-in-95 absolute top-full left-1/2 z-50 mt-2 w-72 -translate-x-1/2 rounded-xl border p-2 shadow-lg"
        >
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/dla/${item.slug}`}
              onClick={() => setOpen(false)}
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.h1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
