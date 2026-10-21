"use client";

import { useId, useState } from "react";
import { MapPinIcon, SearchIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fieldClass } from "./contact-form";

const popular = [
  "Strzyżenie",
  "Manicure hybrydowy",
  "Koloryzacja",
  "Masaż",
  "Brwi i rzęsy",
  "Fizjoterapia",
];

// ponytail: marketplace preview — submit only announces the launch. Swap for a
// router.push to the results page once search exists.
export function SalonSearch() {
  const [service, setService] = useState("");
  const [searched, setSearched] = useState(false);
  const id = useId();

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          setSearched(true);
        }}
        className="bg-card flex flex-col gap-2 rounded-2xl border p-2 shadow-lg sm:flex-row"
      >
        <label htmlFor={`${id}-q`} className="relative flex-1">
          <span className="sr-only">Usługa</span>
          <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <input
            id={`${id}-q`}
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Czego szukasz?"
            className={cn(
              fieldClass,
              "h-12 border-0 bg-transparent pl-10 shadow-none",
            )}
          />
        </label>
        <label htmlFor={`${id}-city`} className="relative flex-1 sm:border-l">
          <span className="sr-only">Miasto</span>
          <MapPinIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2" />
          <input
            id={`${id}-city`}
            placeholder="Gdzie?"
            autoComplete="address-level2"
            className={cn(
              fieldClass,
              "h-12 border-0 bg-transparent pl-10 shadow-none",
            )}
          />
        </label>
        <Button type="submit" size="xl" className="h-12">
          Szukaj
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {popular.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setService(p)}
            className="bg-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring/50 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]"
          >
            {p}
          </button>
        ))}
      </div>

      <p
        role="status"
        className={cn(
          "text-muted-foreground mt-5 text-center text-sm",
          !searched && "sr-only",
        )}
      >
        {searched &&
          "Wyszukiwarka salonów startuje wkrótce. Do tego czasu umówisz się bezpośrednio w swoim salonie."}
      </p>
    </div>
  );
}
