import {
  CalendarPlusIcon,
  ContactlessIcon,
  ReceiptIcon,
  CalendarIcon,
  ChartColumnIcon,
  ClipboardListIcon,
  ImagesIcon,
  DashboardIcon,
  MessageSquareTextIcon,
  ScissorsIcon,
  SmartphoneIcon,
  StoreIcon,
  UserCogIcon,
  UsersIcon,
  WarehouseIcon,
  type AtelierIconComponent,
} from "@/components/ui/icons";

export type Feature = {
  id: string;
  icon: AtelierIconComponent;
  title: string;
  summary: string;
  description: string;
  points: string[];
  soon?: boolean;
  photo?: { src: string; alt: string; caption?: string };
};

export const features: Feature[] = [
  {
    id: "kalendarz",
    icon: CalendarIcon,
    title: "Kalendarz wizyt",
    summary:
      "Grafik całego zespołu na jednym ekranie. Przeciągasz wizytę — gotowe.",
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
    icon: UsersIcon,
    title: "Kartoteka klienta",
    summary:
      "Wizyty, karty zabiegowe, zdjęcia i opinie klienta — w jednym oknie.",
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
    icon: ClipboardListIcon,
    title: "Karty zabiegowe",
    summary:
      "Klient dostaje kartę mailem przed wizytą, a Ty dodajesz skan wypełnionej.",
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
    icon: ImagesIcon,
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
    icon: MessageSquareTextIcon,
    title: "Przypomnienia SMS i e-mail",
    summary: "Mniej nieodbytych wizyt dzięki automatycznym przypomnieniom.",
    description:
      "Saloonik sam wysyła klientom przypomnienie przed wizytą — SMS-em lub e-mailem, zgodnie ze zgodami zapisanymi na karcie klienta.",
    points: [
      "Automatyczne przypomnienie przed każdą wizytą",
      "400 SMS-ów na osobę miesięcznie w cenie abonamentu",
      "Historia wysłanych wiadomości z filtrami",
      "Ręczna wysyłka SMS, gdy trzeba coś przekazać",
    ],
  },
  {
    id: "zespol",
    photo: {
      src: "/images/zespol.jpg",
      alt: "Trzy fryzjerki z nożyczkami i szczotkami w salonie",
      caption: "Anna Nowak: urlop 20–24.10, rezerwacje zablokowane",
    },
    icon: UserCogIcon,
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
    photo: {
      src: "/images/uslugi.jpg",
      alt: "Dłonie trzymające nożyczki, szczotki i pędzel do farbowania",
      caption: "Balayage: 3 h, 450 zł, wykonuje Anna i Julia",
    },
    icon: ScissorsIcon,
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
    icon: ChartColumnIcon,
    title: "Statystyki",
    summary:
      "Przychód, obłożenie i lojalność klientów — bez arkuszy kalkulacyjnych.",
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
    photo: {
      src: "/images/oddzialy.jpg",
      alt: "Wnętrze nowoczesnego salonu z rzędem stanowisk",
      caption: "Oddział Kraków: otwarte 9:00–19:00",
    },
    icon: StoreIcon,
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
    photo: {
      src: "/images/panel.jpg",
      alt: "Stanowiska w jasnym salonie fryzjerskim",
      caption: "Dziś 18 wizyt, najbliższy wolny termin 13:30",
    },
    icon: DashboardIcon,
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
  {
    id: "magazyn",
    photo: {
      src: "/images/magazyn.jpg",
      alt: "Kosmetyki do pielęgnacji ułożone na blacie",
      caption: "Szampon regenerujący: zostały 3 sztuki",
    },
    icon: WarehouseIcon,
    title: "Magazyn i sprzedaż",
    summary: "Wiesz, co jest na półce, zanim czegoś zabraknie.",
    description:
      "Produkty na sprzedaż i do zabiegów w jednym miejscu. Przyjmujesz dostawy, sprzedajesz kosmetyki przy wizycie, a Saloonik pokazuje, co się kończy w każdym oddziale.",
    points: [
      "Stany produktów w każdym oddziale z historią ruchów",
      "Przyjęcie dostawy i inwentaryzacja z zapisem różnic",
      "Alert, gdy produkt spada poniżej ustawionego minimum",
      "Materiały przypisane do usług i zużycie przy zabiegach",
      "Sprzedaż produktów klientom przy wizycie albo osobno",
      "Osobne stany na sprzedaż i do zabiegów",
    ],
  },
];

export const upcomingFeatures: Feature[] = [
  {
    id: "aplikacja-mobilna",
    icon: SmartphoneIcon,
    title: "Aplikacja mobilna",
    summary: "Kalendarz i klienci zawsze pod ręką — na telefonie i tablecie.",
    description:
      "Aplikacja na Androida i iOS z kalendarzem wizyt i bazą klientów. Pracujemy nad jej publikacją w sklepach.",
    points: ["Android i iOS, także tablety", "Kalendarz, klienci i start dnia"],
    soon: true,
  },
  {
    id: "terminale",
    icon: ContactlessIcon,
    title: "Płatności terminalem",
    summary: "Kwota z wizyty trafia prosto na terminal.",
    description:
      "Przy zamykaniu wizyty kwota trafi na terminal płatniczy, a status transakcji zapisze się przy wizycie. Bez przepisywania kwot i pomyłek.",
    points: [
      "Kwota wysyłana na terminal jednym kliknięciem",
      "Status płatności zapisany przy wizycie",
    ],
    soon: true,
  },
  {
    id: "kasa-fiskalna",
    icon: ReceiptIcon,
    title: "Kasa fiskalna",
    summary: "Paragon po wizycie bez wpisywania pozycji.",
    description:
      "Usługi i produkty z wizyty trafią na kasę fiskalną, więc paragon wydrukujesz bez ręcznego wpisywania pozycji.",
    points: [
      "Pozycje paragonu prosto z wizyty i sprzedaży",
      "Mniej pracy przy recepcji na koniec dnia",
    ],
    soon: true,
  },
  {
    id: "rezerwacja-online",
    icon: CalendarPlusIcon,
    title: "Rezerwacja online",
    summary: "Klienci umówią się sami, także po godzinach.",
    description:
      "Strona rezerwacji Twojej firmy: klient wybiera usługę, pracownika i wolny termin, a wizyta od razu pojawia się w kalendarzu.",
    points: [
      "Wolne terminy liczone z grafiku i godzin otwarcia",
      "Wizyta od razu w kalendarzu i przypomnienie SMS",
    ],
    soon: true,
  },
];

export const getFeature = (id: string) => features.find((f) => f.id === id);
