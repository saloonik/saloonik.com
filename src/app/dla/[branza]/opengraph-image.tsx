import { getIndustry, industries } from "@/content/industries";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Saloonik — program dla Twojej branży";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return industries.map((i) => ({ branza: i.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ branza: string }>;
}) {
  const industry = getIndustry((await params).branza);
  return renderOg({
    eyebrow: industry?.eyebrow ?? "Saloonik",
    title: industry?.h1 ?? "Program do umawiania wizyt",
    subtitle:
      "Kalendarz wizyt, karty klientów i przypomnienia SMS. 7 dni za darmo.",
  });
}
