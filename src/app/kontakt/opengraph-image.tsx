import { ogSize, renderOg } from "@/lib/og";

export const alt = "Kontakt z zespołem Saloonik";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "Kontakt",
    title: "Porozmawiajmy o Twojej firmie",
    subtitle: "Pytania o program, oferta dla sieci lokali i pomoc techniczna.",
  });
}
