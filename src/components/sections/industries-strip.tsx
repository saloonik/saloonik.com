import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@/components/ui/icons";
import { Container } from "@/components/layout/section";
import { allIndustryLabels, industries } from "@/content/industries";

export function IndustriesStrip() {
  const linked = new Set(industries.map((i) => i.name));
  const others = allIndustryLabels.filter(
    (l) => !linked.has(l) && l !== "Inna branża",
  );
  return (
    <section
      aria-labelledby="branze-heading"
      id="branze"
      className="bg-card/50 overflow-hidden border-y py-14"
    >
      <Container>
        <h2
          id="branze-heading"
          className="text-muted-foreground mx-auto mb-8 max-w-2xl text-center text-sm font-medium text-balance"
        >
          Gotowe szablony usług dla 15 branż — i miejsce dla każdej innej, w
          której umawiasz klientów na wizyty
        </h2>
      </Container>

      {/* ponytail: list rendered twice for a seamless CSS loop; the copy is aria-hidden */}
      <div className="group/marquee [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
        <div className="motion-safe:animate-marquee flex w-max group-hover/marquee:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex gap-4 pr-4"
            >
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link
                    href={`/dla/${i.slug}`}
                    tabIndex={copy === 1 ? -1 : undefined}
                    className="group/card focus-visible:ring-ring/50 relative block h-44 w-60 overflow-hidden rounded-2xl outline-none focus-visible:ring-[3px]"
                  >
                    {i.photo && (
                      <Image
                        src={i.photo.src}
                        alt=""
                        fill
                        sizes="240px"
                        className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-110"
                      />
                    )}
                    <span className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-3.5 text-white">
                      <span className="font-semibold">{i.name}</span>
                      <span className="flex size-7 items-center justify-center rounded-full bg-white/20 backdrop-blur transition-transform group-hover/card:rotate-45">
                        <ArrowUpRightIcon className="size-3.5" />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <Container>
        <p className="text-muted-foreground mt-6 text-center text-sm">
          Na liście przy rejestracji są też: {others.join(", ")}. Pracujesz w
          innej branży? Wybierz „Inna branża”.
        </p>
      </Container>
    </section>
  );
}
