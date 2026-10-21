"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type Audience = "salon" | "klient";

export const AUDIENCE_KEY = "saloonik-audience";
export const CLIENT_PATH = "/dla-klientow";

export function readAudience(): Audience | null {
  try {
    const v = localStorage.getItem(AUDIENCE_KEY);
    return v === "salon" || v === "klient" ? v : null;
  } catch {
    return null;
  }
}

export function rememberAudience(a: Audience) {
  try {
    localStorage.setItem(AUDIENCE_KEY, a);
  } catch {}
}

export const isClientPath = (pathname: string) =>
  pathname.startsWith(CLIENT_PATH);

/** Link that also switches the remembered audience, so "/" stops redirecting. */
export function AudienceLink({
  audience,
  ...props
}: React.ComponentProps<typeof Link> & { audience: Audience }) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        rememberAudience(audience);
        props.onClick?.(e);
      }}
    />
  );
}

/** Picks the salon or client variant of shared chrome (header, footer). */
export function ForAudience({
  salon,
  client,
}: {
  salon: React.ReactNode;
  client: React.ReactNode;
}) {
  return isClientPath(usePathname()) ? client : salon;
}
