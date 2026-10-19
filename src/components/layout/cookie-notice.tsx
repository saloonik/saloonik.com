"use client";

import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { CookieIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

const STORAGE_KEY = "cookie-notice-ack";

const noop = () => () => {};

function readAck() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return true;
  }
}

// Only necessary storage on this site, so this is information, not a consent prompt.
export function CookieNotice() {
  const acked = useSyncExternalStore(noop, readAck, () => true);
  const [dismissed, setDismissed] = useState(false);
  if (acked || dismissed) return null;

  const acknowledge = () => {
    try {
      localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    } catch {}
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Informacja o plikach cookie"
      className="bg-card animate-in fade-in slide-in-from-bottom-4 fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-lg border p-4 shadow-lg duration-300 sm:inset-x-auto sm:left-4"
    >
      <div className="flex gap-3">
        <CookieIcon className="text-primary mt-0.5 size-5 shrink-0" />
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">
            Używamy wyłącznie niezbędnych plików cookie i pamięci przeglądarki,
            np. do zapamiętania motywu i tego komunikatu. Nie korzystamy z
            ciasteczek analitycznych ani marketingowych. Więcej informacji w{" "}
            <a
              href={siteConfig.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium underline"
            >
              Polityce prywatności
            </a>
            .
          </p>
          <Button size="sm" onClick={acknowledge} className="w-full sm:w-auto">
            Rozumiem
          </Button>
        </div>
      </div>
    </div>
  );
}
