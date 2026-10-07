import { ogSize, renderOg } from "@/lib/og";

export const alt = "Saloonik — program do umawiania wizyt dla firm usługowych";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "Dla salonów, gabinetów i studiów",
    title: "Program do umawiania wizyt",
    subtitle:
      "Kalendarz wizyt, klienci, przypomnienia SMS i statystyki. 7 dni za darmo.",
  });
}
