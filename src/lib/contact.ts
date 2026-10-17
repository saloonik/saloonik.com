export const contactTopics = [
  "Pytanie o program",
  "Oferta dla sieci lokali",
  "Pomoc z kontem",
  "Współpraca",
  "Inne",
] as const;

export type ContactMessage = {
  name: string;
  email: string;
  phone: string;
  company: string;
  topic: (typeof contactTopics)[number];
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

const limits = {
  name: 100,
  email: 254,
  phone: 30,
  company: 120,
  message: 4000,
};

const text = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

/** Shared by the form (inline errors) and the API route (never trust the client). */
export function validateContact(input: unknown): {
  data: ContactMessage;
  errors: ContactErrors;
} {
  const raw = (input ?? {}) as Record<string, unknown>;
  const data = {
    name: text(raw.name),
    email: text(raw.email),
    phone: text(raw.phone),
    company: text(raw.company),
    topic: text(raw.topic) as ContactMessage["topic"],
    message: text(raw.message),
  };
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Podaj imię i nazwisko.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Podaj poprawny adres e-mail, np. anna@salon.pl.";
  if (data.phone && !/^[+\d][\d\s()-]{6,}$/.test(data.phone))
    errors.phone = "Podaj numer telefonu albo zostaw puste pole.";
  if (!contactTopics.includes(data.topic)) errors.topic = "Wybierz temat.";
  if (data.message.length < 10)
    errors.message = "Napisz kilka słów więcej, żebyśmy mogli pomóc.";

  for (const [key, max] of Object.entries(limits) as [
    keyof typeof limits,
    number,
  ][])
    if (data[key].length > max) errors[key] = `Maksymalnie ${max} znaków.`;

  return { data, errors };
}

const hits = new Map<string, { count: number; reset: number }>();

/** Fixed window per key: `max` requests per `windowMs`. True = allowed. */
export function rateLimit(
  key: string,
  max = 5,
  windowMs = 10 * 60_000,
  now = Date.now(),
) {
  // Keeps the map from growing forever under a flood of unique IPs.
  if (hits.size > 10_000)
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
  const hit = hits.get(key);
  if (!hit || hit.reset <= now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  return ++hit.count <= max;
}
