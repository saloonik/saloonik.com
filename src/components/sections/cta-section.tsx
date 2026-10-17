import Image from "next/image";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/section";
import { siteConfig } from "@/config/site";

const collage = [
  {
    src: "/images/salon-fryzjerski.jpg",
    className: "top-10 -left-6 w-40 -rotate-6",
  },
  {
    src: "/images/stylizacja-paznokci.jpg",
    className: "bottom-8 left-20 w-32 rotate-3 [animation-delay:-2s]",
  },
  {
    src: "/images/barber.jpg",
    className: "top-8 -right-4 w-36 rotate-6 [animation-delay:-4s]",
  },
  {
    src: "/images/gabinet-masazu.jpg",
    className: "bottom-10 right-24 w-32 -rotate-3 [animation-delay:-1s]",
  },
];

export function CtaSection({
  title = "Sprawdź Saloonika w swojej firmie",
  description = "7 dni pełnej wersji za darmo. Bez karty płatniczej i bez zobowiązań.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="bg-primary text-primary-foreground dark:bg-accent dark:text-accent-foreground relative isolate overflow-hidden rounded-3xl px-6 py-16 text-center shadow-2xl sm:px-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div
            aria-hidden
            className="motion-safe:animate-drift-b absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-rose-400/30 blur-3xl"
          />
          {collage.map((p) => (
            <div
              key={p.src}
              aria-hidden
              className={`absolute -z-10 hidden xl:block ${p.className}`}
            >
              <div className="motion-safe:animate-float relative aspect-[4/3] overflow-hidden rounded-xl shadow-2xl ring-4 ring-white/20">
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-85">
            {description}
          </p>
          <Button
            asChild
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-primary dark:text-primary-foreground mt-8"
          >
            <a href={siteConfig.registerUrl}>
              Załóż darmowe konto <ArrowRightIcon className="size-5" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
