import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/section";
import { siteConfig } from "@/config/site";

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
        <div className="bg-primary text-primary-foreground relative isolate overflow-hidden rounded-3xl px-6 py-16 text-center shadow-2xl sm:px-16 dark:bg-accent dark:text-accent-foreground">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 opacity-[0.12]"
            style={{
              backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div aria-hidden className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-rose-400/30 blur-3xl" />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-85">{description}</p>
          <Button
            asChild
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-primary dark:text-primary-foreground mt-8"
          >
            <a href={siteConfig.registerUrl}>
              Załóż darmowe konto <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
