"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

type Item = { slug: string; name: string; photo?: string };

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
        <ChevronDownIcon
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="industries-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-popover text-popover-foreground absolute top-full left-0 z-50 mt-2 w-max origin-top-left rounded-2xl border p-2 shadow-xl"
          >
            <motion.ul
              className="grid grid-cols-2 gap-0.5"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.02 } } }}
            >
              {items.map((item) => (
                <motion.li
                  key={item.slug}
                  variants={{
                    hidden: { opacity: 0, y: 6 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={`/dla/${item.slug}`}
                    onClick={() => setOpen(false)}
                    className="hover:bg-accent hover:text-accent-foreground group flex items-center gap-3 rounded-xl py-1.5 pr-4 pl-1.5 text-sm font-medium whitespace-nowrap transition-colors"
                  >
                    <span className="bg-muted relative size-9 shrink-0 overflow-hidden rounded-lg">
                      {item.photo && (
                        <Image
                          src={item.photo}
                          alt=""
                          fill
                          sizes="36px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      )}
                    </span>
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <p className="text-muted-foreground mt-1 border-t px-3 pt-2.5 pb-1 text-xs whitespace-nowrap">
              Innej branży nie ma na liście? Saloonik też się sprawdzi.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
