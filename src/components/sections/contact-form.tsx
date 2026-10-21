"use client";

import { useId, useState } from "react";
import { CircleCheckIcon, LoaderIcon, SendIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
  contactTopics,
  validateContact,
  type ContactErrors,
  type ContactMessage,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "failed";

export const fieldClass =
  "bg-background border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 w-full rounded-md border px-3 text-base shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] sm:text-sm";

export function ContactForm({
  email,
  privacyUrl,
  legalName,
}: {
  email: string;
  privacyUrl: string;
  legalName: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState<ContactMessage | null>(null);
  const [notice, setNotice] = useState<string>();
  const id = useId();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const { data, errors } = validateContact(values);
    setErrors(errors);
    if (Object.keys(errors).length) {
      const first = Object.keys(errors)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const res = await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, website: values.website }),
    }).catch(() => null);

    if (res?.ok) {
      setSent(data);
      setStatus("sent");
      return;
    }
    const body = await res?.json().catch(() => null);
    if (body?.errors) setErrors(body.errors);
    // Only the rate limit message is worth showing; the rest are generic.
    setNotice(res?.status === 429 ? body?.message : undefined);
    setStatus("failed");
  }

  if (status === "sent" && sent)
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 py-10 text-center"
      >
        <CircleCheckIcon className="size-10 text-emerald-600 dark:text-emerald-400" />
        <h2 className="text-xl font-semibold">Wiadomość wysłana</h2>
        <p className="text-muted-foreground max-w-sm text-pretty">
          Dziękujemy, {sent.name.split(" ")[0]}. Odpowiemy na adres{" "}
          <span className="text-foreground font-medium">{sent.email}</span>{" "}
          najszybciej, jak to możliwe.
        </p>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => {
            setSent(null);
            setStatus("idle");
          }}
        >
          Napisz kolejną wiadomość
        </Button>
      </div>
    );

  const field = (name: keyof ContactMessage) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Imię i nazwisko" error={errors.name}>
          <input
            {...field("name")}
            autoComplete="name"
            className={cn(fieldClass, "h-11")}
          />
        </Field>
        <Field id={`${id}-email`} label="E-mail" error={errors.email}>
          <input
            {...field("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            className={cn(fieldClass, "h-11")}
          />
        </Field>
        <Field id={`${id}-phone`} label="Telefon" optional error={errors.phone}>
          <input
            {...field("phone")}
            type="tel"
            autoComplete="tel"
            className={cn(fieldClass, "h-11")}
          />
        </Field>
        <Field
          id={`${id}-company`}
          label="Nazwa salonu lub firmy"
          optional
          error={errors.company}
        >
          <input
            {...field("company")}
            autoComplete="organization"
            className={cn(fieldClass, "h-11")}
          />
        </Field>
      </div>

      <Field id={`${id}-topic`} label="Temat" error={errors.topic}>
        <select
          {...field("topic")}
          defaultValue={contactTopics[0]}
          className={cn(fieldClass, "h-11")}
        >
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field id={`${id}-message`} label="Wiadomość" error={errors.message}>
        <textarea
          {...field("message")}
          rows={5}
          placeholder="Napisz, w czym możemy pomóc, np. ilu macie pracowników i z jakiego programu korzystacie teraz."
          className={cn(fieldClass, "min-h-32 py-2.5 leading-relaxed")}
        />
      </Field>

      {/* Honeypot: hidden from people and screen readers, bots fill it in. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {status === "failed" && (
        <p
          role="alert"
          className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border p-3 text-sm"
        >
          {notice ?? "Nie udało się wysłać wiadomości. Spróbuj ponownie."}{" "}
          Możesz też napisać na{" "}
          <a href={`mailto:${email}`} className="font-medium underline">
            {email}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-xs leading-relaxed sm:max-w-sm">
          Twoje dane przetwarza {legalName} wyłącznie po to, żeby odpowiedzieć
          na wiadomość.{" "}
          <a
            href={privacyUrl}
            className="hover:text-foreground underline underline-offset-2"
          >
            Polityka prywatności
          </a>
        </p>
        <Button
          type="submit"
          size="xl"
          disabled={status === "sending"}
          className="w-full sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <LoaderIcon className="size-5 animate-spin" /> Wysyłanie…
            </>
          ) : (
            <>
              <SendIcon className="size-5" /> Wyślij wiadomość
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex items-baseline gap-1.5 text-sm font-medium"
      >
        {label}
        {optional && (
          <span className="text-muted-foreground text-xs font-normal">
            (opcjonalnie)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-destructive text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
