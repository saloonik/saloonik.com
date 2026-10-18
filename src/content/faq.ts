import { grossPln, plan } from "@/lib/pricing";

export type FaqItem = { question: string; answer: string };

export const generalFaq: FaqItem[] = [
  {
    question: "Czym jest Saloonik?",
    answer:
      "Saloonik to program do umawiania wizyt i zarządzania firmą usługową działający w przeglądarce: kalendarz wizyt, baza klientów z kartami zabiegowymi, automatyczne przypomnienia SMS i e-mail, zarządzanie zespołem, statystyki i obsługa wielu oddziałów.",
  },
  {
    question: "Dla kogo jest Saloonik?",
    answer:
      "Dla każdej firmy, w której usługodawca pracuje z klientem na umówionych wizytach: salonów fryzjerskich i kosmetycznych, barberów, stylistek paznokci, gabinetów masażu, fizjoterapii i medycyny estetycznej, studiów tatuażu, dietetyków, trenerów personalnych, groomerów i wielu innych — od jednoosobowej działalności po sieć kilku lokali.",
  },
  {
    question: "Jak działa okres próbny?",
    answer:
      `Po rejestracji przez 7 dni korzystasz z pełnej wersji Saloonika, bez podawania karty płatniczej. W okresie próbnym możesz wysłać ${plan.trialSms} SMS-ów i ${plan.trialEmails} e-maili. Po tym czasie wybierasz liczbę pracowników i oddziałów i opłacasz abonament.`,
  },
  {
    question: "Czy muszę coś instalować?",
    answer:
      "Nie. Saloonik działa w przeglądarce na komputerze. Aplikacja mobilna na Androida i iOS jest w przygotowaniu.",
  },
  {
    question: "Jak przenieść dane z innego programu lub zeszytu?",
    answer:
      "Klientów i cennik usług zaimportujesz z pliku Excel — Saloonik udostępnia gotowe szablony i kreator importu. Przy rejestracji możesz też wybrać branżę i zacząć od gotowej listy usług.",
  },
  {
    question: "Czy dane moich klientów są bezpieczne?",
    answer:
      "Dostęp do danych kontrolujesz rolami i uprawnieniami, a dziennik aktywności pokazuje, kto i co zmienił. Zgody klientów na SMS i e-mail zapisujesz na ich kartach. Płatności obsługuje PayU — Saloonik nie przechowuje danych Twojej karty.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: "Czy właściciel liczy się jako pracownik?",
    answer: `Nie. Cena bazowa ${grossPln(plan.monthlyPrice)} brutto miesięcznie obejmuje konto właściciela i jeden oddział. Płacisz tylko za zatrudnionych pracowników.`,
  },
  {
    question: "Ile kosztuje każdy kolejny pracownik?",
    answer: `Pierwszych ${plan.extraEmployeeTierSize} pracowników kosztuje po ${grossPln(plan.pricePerExtraEmployee)} brutto miesięcznie, każdy kolejny ${grossPln(plan.pricePerExtraEmployeeAboveTier)}. Powyżej ${plan.maxEmployees} pracowników następni są bezpłatni.`,
  },
  {
    question: "Ile kosztuje dodatkowy oddział?",
    answer: `Każdy kolejny oddział to ${grossPln(plan.pricePerExtraBranch)} brutto miesięcznie. Dla firm z więcej niż ${plan.maxBranches} oddziałami przygotowujemy indywidualną wycenę.`,
  },
  {
    question: "Czy płatność roczna jest tańsza?",
    answer:
      "Tak. Przy płatności rocznej płacisz za 10 miesięcy — 2 miesiące masz gratis.",
  },
  {
    question: "Czy SMS-y są w cenie?",
    answer:
      `Tak. Abonament obejmuje 400 SMS-ów miesięcznie na każdą osobę w firmie — właściciela i każdego pracownika. W 7-dniowym okresie próbnym limit wynosi ${plan.trialSms} SMS-ów i ${plan.trialEmails} e-maili.`,
  },
  {
    question: "Jak mogę zapłacić?",
    answer:
      "Płatności obsługuje PayU, m.in. BLIK i karta. Wszystkie ceny na stronie są cenami brutto, zawierają 23% VAT.",
  },
  {
    question: "Co się stanie po zakończeniu okresu próbnego?",
    answer:
      "Jeśli nie wykupisz abonamentu, Twoje dane nie znikają — konto przechodzi w tryb tylko do odczytu, dopóki go nie opłacisz.",
  },
];
