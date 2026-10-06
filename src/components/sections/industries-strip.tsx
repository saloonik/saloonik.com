import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/section";
import { allIndustryLabels, industries } from "@/content/industries";

export function IndustriesStrip() {
  const linked = new Map(industries.map((i) => [i.name, i.slug]));
  return (
    <section aria-labelledby="branze" className="border-y bg-card/50 py-12">
      <Container className="text-center">
        <h2 id="branze" className="text-muted-foreground mb-6 text-sm font-medium">
          Gotowe szablony usług dla 15 branż — i miejsce dla każdej innej, w której umawiasz klientów na wizyty
        </h2>
        <ul className="flex flex-wrap justify-center gap-2">
          {allIndustryLabels.map((label) => {
            const slug = linked.get(label);
            return (
              <li key={label}>
                {slug ? (
                  <Link
                    href={`/dla/${slug}`}
                    className="bg-background hover:bg-accent hover:text-accent-foreground inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
                  >
                    {label} <ArrowUpRight className="text-muted-foreground size-3.5" />
                  </Link>
                ) : (
                  <span className="text-muted-foreground inline-flex rounded-full border border-dashed px-3.5 py-1.5 text-sm">
                    {label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
