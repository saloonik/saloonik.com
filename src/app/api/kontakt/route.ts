import { rateLimit, validateContact } from "@/lib/contact";

const error = (message: string, status: number) =>
  Response.json({ message }, { status });

export async function POST(request: Request) {
  const formUrl = process.env.NOCODB_CONTACT_FORM_URL;
  if (!formUrl) return error("Formularz jest chwilowo niedostępny.", 503);

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (!rateLimit(ip))
    return error("Za dużo wiadomości. Spróbuj ponownie za kilka minut.", 429);

  const body = await request.json().catch(() => null);
  if (body?.website) return Response.json({ ok: true });

  const { data, errors } = validateContact(body);
  if (Object.keys(errors).length)
    return Response.json(
      { message: "Popraw zaznaczone pola.", errors },
      { status: 400 },
    );

  const form = new FormData();
  form.append(
    "data",
    JSON.stringify({
      "Imię i nazwisko": data.name,
      Email: data.email,
      Telefon: data.phone,
      Firma: data.company,
      Temat: data.topic,
      Wiadomość: data.message,
      Przeglądarka: request.headers.get("User-Agent"),
    }),
  );

  const response = await fetch(formUrl, { method: "POST", body: form }).catch(
    (e: unknown) => {
      console.error("[kontakt] NocoDB unreachable:", e);
      return null;
    },
  );
  if (!response?.ok) {
    if (response)
      console.error(
        `[kontakt] NocoDB answered ${response.status}:`,
        (await response.text().catch(() => "")).slice(0, 500),
      );
    return error("Nie udało się wysłać wiadomości.", 502);
  }

  return Response.json({ ok: true });
}
