import { features } from "@/content/features";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Funkcje Saloonika";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return features.filter((f) => f.page).map((f) => ({ id: f.id }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feature = features.find((f) => f.id === id);
  return renderOg({
    eyebrow: "Funkcje",
    title: feature?.page?.h1 ?? "Program do umawiania wizyt",
    subtitle: feature?.summary ?? "",
  });
}
