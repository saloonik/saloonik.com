import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/section";
import { PhoneMockup } from "@/components/mockups/phone-mockup";
import { upcomingFeatures } from "@/content/features";

export function ComingSoon() {
  return (
    <Section className="bg-card/50 overflow-hidden border-y">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-primary mb-3 text-xs font-bold tracking-wide uppercase">
            Wkrótce
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Saloonik rośnie razem z Twoją firmą
          </h2>
          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Regularnie dodajemy nowe funkcje — każda trafia do abonamentu bez
            dopłat.
          </p>
          <div className="mt-8 space-y-4">
            {upcomingFeatures.map((f) => (
              <div
                key={f.id}
                className="bg-background flex gap-4 rounded-xl border p-5"
              >
                <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <f.icon className="size-5" />
                </span>
                <div>
                  <h3 className="flex items-center gap-2 font-semibold">
                    {f.title} <Badge variant="warning">Wkrótce</Badge>
                  </h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PhoneMockup className="motion-safe:-rotate-3" />
      </div>
    </Section>
  );
}
