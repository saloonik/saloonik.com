import { FileSpreadsheet, Sparkles, UserPlus } from "lucide-react";
import { Section, SectionHeading } from "@/components/layout/section";

const steps = [
  {
    icon: UserPlus,
    title: "Załóż konto",
    text: "Rejestracja zajmuje chwilę i nie wymaga karty płatniczej. Od razu dostajesz pełną wersję na 7 dni.",
  },
  {
    icon: Sparkles,
    title: "Wybierz branżę",
    text: "Wybierz jedną z 15 branż albo „Inna branża”. Saloonik podpowie typowe usługi z czasem trwania i cenami. Ustawisz też godziny otwarcia.",
  },
  {
    icon: FileSpreadsheet,
    title: "Przenieś klientów i zespół",
    text: "Zaimportuj klientów i cennik z Excela, dodaj pracowników — i zapisuj pierwsze wizyty.",
  },
];

export function HowItWorks() {
  return (
    <Section className="bg-card/50 border-y">
      <SectionHeading
        eyebrow="Jak zacząć"
        title="Gotowy do pracy jeszcze dziś"
        description="Nie potrzebujesz wdrożenia ani instalacji. Saloonik działa w przeglądarce."
      />
      <ol className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="bg-background relative rounded-xl border p-6"
          >
            <span className="text-primary/15 dark:text-primary/20 absolute top-4 right-5 font-mono text-5xl font-bold">
              {i + 1}
            </span>
            <div className="flex items-center gap-3 pr-10">
              <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <step.icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
