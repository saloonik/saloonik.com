import { cn } from "@/lib/utils";

// Dwa warianty wordmarku przełączane czystym CSS (bez JS), więc nie ma mignięcia przy hydratacji.
export function Logo({ className }: { className?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.svg"
        alt="Saloonik"
        width={85}
        height={20}
        className={cn("h-6 w-auto dark:hidden", className)}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.svg"
        alt="Saloonik"
        width={91}
        height={20}
        className={cn("hidden h-6 w-auto dark:block", className)}
      />
    </>
  );
}
