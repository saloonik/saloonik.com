import { ogSize, renderOg } from "@/lib/og";
import { grossPln, plan } from "@/lib/pricing";

export const alt = `Cennik Saloonika od ${grossPln(plan.monthlyPrice)} brutto miesięcznie`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg({
    eyebrow: "Cennik",
    title: `Od ${grossPln(plan.monthlyPrice)} brutto miesięcznie`,
    subtitle:
      "Wszystkie funkcje w cenie. Rocznie 2 miesiące gratis. 7 dni za darmo.",
  });
}
