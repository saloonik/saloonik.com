import { ogSize, renderOg } from "@/lib/og";

export const alt = "Funkcje Saloonika: kalendarz, klienci, SMS i statystyki";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "Funkcje",
    title: "Jeden program do prowadzenia firmy usługowej",
    subtitle:
      "Kalendarz zespołu, kartoteka klientów, przypomnienia SMS i statystyki.",
  });
}
