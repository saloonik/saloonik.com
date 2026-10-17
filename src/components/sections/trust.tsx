import {
  CreditCardIcon,
  FileSpreadsheetIcon,
  HistoryIcon,
  ShieldUserIcon,
} from "@/components/ui/icons";
import * as motion from "motion/react-client";
import { revealGroup, revealItem } from "@/components/ui/reveal";
import { Section, SectionHeading } from "@/components/layout/section";

const items = [
  {
    icon: ShieldUserIcon,
    title: "Role i uprawnienia",
    text: "Każdy pracownik widzi tylko to, do czego dasz mu dostęp.",
  },
  {
    icon: HistoryIcon,
    title: "Dziennik aktywności",
    text: "Pełna historia zmian: kto, co i kiedy zmienił w kalendarzu i danych.",
  },
  {
    icon: CreditCardIcon,
    title: "Bezpieczne płatności",
    text: "Abonament opłacasz przez Przelewy24 (m.in. BLIK). Nie przechowujemy danych Twojej karty.",
  },
  {
    icon: FileSpreadsheetIcon,
    title: "Twoje dane są Twoje",
    text: "Klientów wyeksportujesz do Excela w każdej chwili. Zgody na kontakt zapisane przy kliencie.",
  },
];

export function Trust() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Bezpieczeństwo"
        title="Dane klientów pod Twoją kontrolą"
        description="Dostęp do kalendarza i bazy klientów masz pod kontrolą — od pierwszego pracownika po kilka oddziałów."
      />
      <motion.div
        {...revealGroup}
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={revealItem}
            data-atelier-hover
            className="text-center"
          >
            <span className="bg-primary/10 text-primary dark:bg-primary/20 mx-auto flex size-12 items-center justify-center rounded-xl">
              <item.icon className="size-6" />
            </span>
            <h3 className="mt-4 font-semibold">{item.title}</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
