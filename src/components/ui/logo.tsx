import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      aria-label="Saloonik — strona główna"
      onClick={onClick}
      className={cn(
        "focus-visible:ring-ring/50 inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-[3px]",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.svg"
        alt=""
        width={85}
        height={20}
        className="block h-6 w-auto dark:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.svg"
        alt=""
        width={91}
        height={20}
        className="hidden h-6 w-auto dark:block"
      />
    </Link>
  );
}
