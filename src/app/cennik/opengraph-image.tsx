import { ogSize, renderOg } from "@/lib/og";

export const alt = "Cennik Saloonika od 79 zł netto miesięcznie";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "Cennik",
    title: "Od 79 zł netto miesięcznie",
    subtitle:
      "Wszystkie funkcje w cenie. Rocznie 2 miesiące gratis. 7 dni za darmo.",
  });
}
