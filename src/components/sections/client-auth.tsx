"use client";

import { useId, useState } from "react";
import { ClockIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Field, fieldClass } from "./contact-form";

type Mode = "register" | "login";

const modes: { id: Mode; label: string }[] = [
  { id: "register", label: "Załóż konto" },
  { id: "login", label: "Zaloguj się" },
];

// ponytail: UI only — there is no client account API yet. Wire onSubmit to it
// when the client panel ships; until then the form says so instead of faking it.
export function ClientAuth({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("register");
  const [submitted, setSubmitted] = useState(false);
  const id = useId();
  const input = (name: string) => ({
    id: `${id}-${name}`,
    name,
    required: true,
    className: cn(fieldClass, "h-11"),
  });

  return (
    <div
      id="konto"
      className={cn(
        "bg-card/90 scroll-mt-24 rounded-2xl border p-6 shadow-xl backdrop-blur-md sm:p-8",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Konto klienta</h2>
        <Badge variant="warning">Wkrótce</Badge>
      </div>

      <div
        role="tablist"
        aria-label="Rejestracja lub logowanie"
        className="bg-muted mt-5 grid grid-cols-2 rounded-lg p-1"
      >
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={mode === m.id}
            onClick={() => {
              setMode(m.id);
              setSubmitted(false);
            }}
            className={cn(
              "focus-visible:ring-ring/50 rounded-md py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]",
              mode === m.id
                ? "bg-background shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>

      {submitted ? (
        <div
          role="status"
          className="flex flex-col items-center gap-3 py-8 text-center"
        >
          <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-12 items-center justify-center rounded-full">
            <ClockIcon className="size-6" />
          </span>
          <p className="text-lg font-semibold">
            Panel klienta jeszcze nie działa
          </p>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed text-pretty">
            Uruchamiamy go wkrótce. Nic nie zostało wysłane ani zapisane, więc
            wróć do nas za jakiś czas.
          </p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => setSubmitted(false)}
          >
            Wróć do formularza
          </Button>
        </div>
      ) : (
        <form
          key={mode}
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="mt-6 space-y-4"
        >
          {mode === "register" && (
            <Field id={`${id}-name`} label="Imię">
              <input {...input("name")} autoComplete="given-name" />
            </Field>
          )}
          <Field id={`${id}-email`} label="E-mail">
            <input
              {...input("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
            />
          </Field>
          {mode === "register" && (
            <Field id={`${id}-phone`} label="Telefon">
              <input {...input("phone")} type="tel" autoComplete="tel" />
            </Field>
          )}
          <Field id={`${id}-password`} label="Hasło">
            <input
              {...input("password")}
              type="password"
              minLength={mode === "register" ? 8 : undefined}
              autoComplete={
                mode === "register" ? "new-password" : "current-password"
              }
            />
          </Field>
          {mode === "register" && (
            <p className="text-muted-foreground text-xs leading-relaxed">
              Telefon łączy konto z wizytami, które salony już dla Ciebie
              zapisały. Zakładając konto, akceptujesz{" "}
              <a
                href={siteConfig.termsUrl}
                className="hover:text-foreground underline underline-offset-2"
              >
                Regulamin
              </a>{" "}
              i{" "}
              <a
                href={siteConfig.privacyUrl}
                className="hover:text-foreground underline underline-offset-2"
              >
                Politykę prywatności
              </a>
              .
            </p>
          )}
          <Button type="submit" size="xl" className="w-full">
            {mode === "register" ? "Załóż konto" : "Zaloguj się"}
          </Button>
        </form>
      )}
    </div>
  );
}
