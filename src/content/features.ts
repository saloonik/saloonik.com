import {
  CalendarDays,
  ChartColumn,
  ClipboardList,
  Images,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Scissors,
  Smartphone,
  Store,
  UserCog,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  points: string[];
  soon?: boolean;
};

// Treść oparta wyłącznie o funkcje, które działają w system.saloonik.com
// (routes, changelog patch-notes.ts, artykuły pomocy). „soon” = jeszcze niedostępne.
export const features: Feature[] = [
  {
    id: "kalendarz",
    icon: CalendarDays,
    title: "Kalendarz wizyt",
    summary: "Grafik całego zespołu na jednym ekranie. Przeciągasz wizytę — gotowe.",
    description:
      "Widok dnia z kolumną dla każdego pracownika, tydzień, miesiąc albo lista wizyt. Wizyty przesuwasz i wydłużasz myszką, a Saloonik pilnuje, żeby nic się nie nałożyło.",
    points: [
      "Przeciąganie i zmiana długości wizyt, z przyciskiem „Cofnij”",
      "Ostrzeżenie, gdy pracownik ma już wtedy inną wizytę",
      "Godziny zamknięcia i nieobecności widoczne od razu w grafiku",
      "Odwołaną wizytę zastępujesz nową jednym kliknięciem",
      "Statusy wizyty i płatności, filtry po pracowniku i usłudze",
      "Wydruk dziennego grafiku pracownika do PDF",
    ],
  },
  {
    id: "klienci",
    icon: Users,
    title: "Kartoteka klienta",
    summary: "Wizyty, karty zabiegowe, zdjęcia i opinie klienta — w jednym oknie.",
    description:
      "Kartoteka klienta otwiera się nad dowolną stroną, z zakładkami: dane klienta, wizyty, karty zabiegowe, zdjęcia i opinia. Dotychczasową bazę przenosisz z pliku Excel w kilka minut.",
    points: [
      "Zakładki: dane, wizyty, karty zabiegowe, zdjęcia, opinia klienta",
      "Import i eksport klientów z Excela (z gotowym szablonem)",
      "Zgody na przypomnienia SMS i e-mail zapisane przy kliencie",
      "Wysyłka SMS prosto z karty klienta lub z wizyty",
      "Opinie klientów o pracownikach po wizycie i wewnętrzna ocena klienta widoczna tylko dla zespołu",
    ],
  },
  {
    id: "karty-zabiegowe",
    icon: ClipboardList,
    title: "Karty zabiegowe",
    summary: "Klient dostaje kartę mailem przed wizytą, a Ty dodajesz skan wypełnionej.",
    description:
      "Wgraj własne wzory kart — wywiady, zgody, ankiety — i przypisz je do usług. Przy zapisie na wizytę Saloonik wyśle kartę klientowi mailem, a wypełnioną dodasz jako skan, choćby zdjęciem z telefonu.",
    points: [
      "Własne wzory kart (PDF, JPG, PNG, DOC, DOCX) przypisane do usług",
      "Wysyłka karty mailem przy zapisie wizyty, jeśli klient nie ma jeszcze wypełnionej",
      "Skan wypełnionej karty dodasz zdjęciem z telefonu",
      "Statusy „Wysłana” i „Wypełniona” w kartotece klienta",
      "Ostrzeżenie w wizycie, gdy brakuje wymaganej karty",
      "Druk pustej karty dla klienta bez adresu e-mail",
    ],
  },
  {
    id: "zdjecia",
    icon: Images,
    title: "Zdjęcia przed i po",
    summary: "Efekt zabiegu w parach przed/po — przy każdej usłudze wizyty.",
    description:
      "Zdjęcia dodajesz osobno dla każdej usługi wizyty — na telefonie od razu otwiera się aparat. Pary przed/po porównasz obok siebie, a wszystkie zdjęcia klienta masz w jego kartotece.",
    points: [
      "Zdjęcia przed i po przypisane do usługi i wizyty",
      "Na telefonie od razu otwiera się aparat",
      "Porównanie przed/po obok siebie",
      "Notatka do każdego zdjęcia, np. użyte produkty",
      "Wszystkie zdjęcia klienta w zakładce „Zdjęcia” kartoteki",
    ],
  },
  {
    id: "przypomnienia",
    icon: MessageSquareText,
    title: "Przypomnienia SMS i e-mail",
    summary: "Mniej nieodbytych wizyt dzięki automatycznym przypomnieniom.",
    description:
      "Saloonik sam wysyła klientom przypomnienie przed wizytą — SMS-em lub e-mailem, zgodnie ze zgodami zapisanymi na karcie klienta.",
    points: [
      "Automatyczne przypomnienie przed każdą wizytą",
      "200 SMS-ów na osobę miesięcznie w cenie abonamentu",
      "Historia wysłanych wiadomości z filtrami",
      "Ręczna wysyłka SMS, gdy trzeba coś przekazać",
    ],
  },
  {
    id: "zespol",
    icon: UserCog,
    title: "Zespół i uprawnienia",
    summary: "Każdy widzi to, co powinien. Ty widzisz wszystko.",
    description:
      "Konta dla pracowników, gotowe role i własne uprawnienia. Urlopy, zwolnienia i szkolenia blokują rezerwacje w kalendarzu.",
    points: [
      "Gotowe role: Właściciel, Menedżer, Pracownik — i własne",
      "Szczegółowe uprawnienia dla każdej roli",
      "Nieobecności: urlop, zwolnienie, dzień wolny, szkolenie, przerwa",
      "Dziennik aktywności — kto, co i kiedy zmienił",
    ],
  },
  {
    id: "uslugi",
    icon: Scissors,
    title: "Usługi i cennik",
    summary: "Gotowy cennik dla Twojej branży już przy rejestracji.",
    description:
      "Wybierasz branżę, a Saloonik podpowiada typowe usługi z czasem trwania i ceną. Dopasowujesz je do siebie albo wgrywasz własny cennik z Excela.",
    points: [
      "Gotowe szablony usług dla 15 branż",
      "Kategorie i podkategorie z kolorami",
      "Przypisanie, kto z zespołu wykonuje daną usługę",
      "Import cennika z pliku Excel",
    ],
  },
  {
    id: "statystyki",
    icon: ChartColumn,
    title: "Statystyki",
    summary: "Przychód, obłożenie i lojalność klientów — bez arkuszy kalkulacyjnych.",
    description:
      "Zobacz, które usługi i którzy pracownicy zarabiają najwięcej, jak wykorzystany jest czas zespołu i ilu klientów wraca.",
    points: [
      "Przychód i liczba wizyt w wybranym okresie",
      "Nowi i powracający klienci",
      "Wykorzystanie czasu pracy zespołu",
      "Porównanie z poprzednim okresem i rokiem wcześniej",
      "Podział na usługi, pracowników i oddziały, wydruk do PDF",
    ],
  },
  {
    id: "oddzialy",
    icon: Store,
    title: "Wiele oddziałów",
    summary: "Kilka lokali w jednym systemie, z widokiem całej firmy.",
    description:
      "Każdy oddział ma własne godziny otwarcia, zespół i telefon recepcji. Przełączasz się jednym kliknięciem, a statystyki pokazują całą firmę albo wybrany lokal.",
    points: [
      "Osobne godziny otwarcia dla każdego oddziału",
      "Szybkie przełączanie między lokalami",
      "Dane firmy pobierane z GUS po numerze NIP",
      "Statystyki dla oddziału lub całej firmy",
    ],
  },
  {
    id: "panel",
    icon: LayoutDashboard,
    title: "Panel główny",
    summary: "Dzień firmy w pigułce — od razu po zalogowaniu.",
    description:
      "Konfigurowalne kafelki: dzisiejszy harmonogram, nadchodzące rezerwacje, najbliższe wolne terminy, podsumowanie tygodnia i lista rzeczy do zrobienia.",
    points: [
      "Dzisiejszy harmonogram i najbliższe wolne terminy",
      "Podsumowanie dnia i tygodnia",
      "Szybkie akcje i ostatnia aktywność zespołu",
    ],
  },
];

export const upcomingFeatures: Feature[] = [
  {
    id: "aplikacja-mobilna",
    icon: Smartphone,
    title: "Aplikacja mobilna",
    summary: "Kalendarz i klienci zawsze pod ręką — na telefonie i tablecie.",
    description:
      "Aplikacja na Androida i iOS z kalendarzem wizyt i bazą klientów. Pracujemy nad jej publikacją w sklepach.",
    points: ["Android i iOS, także tablety", "Kalendarz, klienci i start dnia"],
    soon: true,
  },
  {
    id: "magazyn",
    icon: Package,
    title: "Magazyn",
    summary: "Stany produktów i kosmetyków pod kontrolą.",
    description: "Ewidencja produktów i materiałów zużywanych podczas zabiegów.",
    points: ["Stany magazynowe", "Zużycie materiałów"],
    soon: true,
  },
];

export const getFeature = (id: string) => features.find((f) => f.id === id);
