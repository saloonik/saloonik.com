import {
  FileSpreadsheetIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@/components/ui/icons";
import * as motion from "motion/react-client";
import { revealGroup, revealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/layout/section";

const steps = [
  {
    icon: UserPlusIcon,
    title: "Załóż konto",
    text: "Rejestracja zajmuje chwilę i nie wymaga karty płatniczej. Od razu dostajesz pełną wersję na 7 dni.",
  },
  {
    icon: SparklesIcon,
    title: "Wybierz branżę",
    text: "Wybierz jedną z 15 branż albo „Inna branża”. Saloonik podpowie typowe usługi z czasem trwania i cenami. Ustawisz też godziny otwarcia.",
  },
  {
    icon: FileSpreadsheetIcon,
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
      <motion.div
        {...revealGroup}
        aria-hidden
        className="relative mt-14 hidden grid-cols-3 md:grid"
      >
        <motion.span
          variants={{
            hidden: { scaleX: 0 },
            show: {
              scaleX: 1,
              transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
            },
          }}
          className="from-primary/60 to-primary/20 absolute inset-x-[16.67%] top-1/2 h-0.5 origin-left rounded-full bg-linear-to-r"
        />
        {steps.map((step, i) => (
          <motion.span
            key={step.title}
            variants={{
              hidden: { scale: 0, opacity: 0 },
              show: {
                scale: 1,
                opacity: 1,
                transition: {
                  delay: i * 0.55,
                  type: "spring",
                  stiffness: 380,
                  damping: 18,
                },
              },
            }}
            className="bg-primary text-primary-foreground ring-background relative mx-auto flex size-10 items-center justify-center rounded-full font-semibold shadow-lg ring-4"
          >
            {i + 1}
          </motion.span>
        ))}
      </motion.div>
      <motion.ol
        {...revealGroup}
        className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            variants={revealItem}
            data-atelier-hover
            data-spotlight
            className="bg-background relative rounded-xl border p-6 transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="text-primary mb-3 block text-sm font-semibold md:hidden">
              Krok {i + 1}
            </span>
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary dark:bg-primary/20 flex size-10 shrink-0 items-center justify-center rounded-lg">
                <step.icon className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              {step.text}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}
