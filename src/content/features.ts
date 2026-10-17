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
import type { FaqItem } from "./faq";

export type Feature = {
  id: string;
  icon: AtelierIconComponent;
  title: string;
  summary: string;
  description: string;
  points: string[];
  soon?: boolean;
  photo?: { src: string; alt: string; caption?: string };
  // features with a page get their own URL under /funkcje/[id]
  page?: {
    h1: string;
    metaTitle: string;
    metaDescription: string;
    intro: string[];
    faq: FaqItem[];
  };
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
    page: {
      h1: "Kalendarz wizyt online dla całego zespołu",
      metaTitle: "Kalendarz wizyt online dla salonu i gabinetu",
      metaDescription:
        "Kalendarz wizyt online w przeglądarce: grafik całego zespołu, przeciąganie wizyt, ostrzeżenia o nakładaniu się terminów i przypomnienia SMS. 7 dni za darmo.",
      intro: [
        "Zeszyt i telefon wystarczą, dopóki pracujesz sama. Gdy dochodzi drugi pracownik, długie usługi i odwołania, papierowy grafik zaczyna się rozjeżdżać. Kalendarz Saloonika pokazuje dzień całego zespołu na jednym ekranie — każdy pracownik ma własną kolumnę z godzinami pracy i nieobecnościami.",
        "Usługi mają zapisany czas trwania, więc nowa wizyta od razu zajmuje tyle miejsca, ile trzeba. Gdy termin nachodzi na inną wizytę pracownika, kalendarz ostrzeże Cię przed zapisaniem. Wizytę przesuwasz i wydłużasz myszką, a pomyłkę cofniesz jednym przyciskiem.",
        "Kalendarz działa w przeglądarce na komputerze, bez instalacji. Do każdej wizyty Saloonik sam wysyła klientowi przypomnienie SMS lub e-mail, zgodnie ze zgodami zapisanymi w kartotece.",
      ],
      faq: [
        {
          question: "Czy każdy pracownik może mieć własny grafik?",
          answer:
            "Tak. W widoku dnia każdy pracownik ma osobną kolumnę, własne godziny pracy i nieobecności. Uprawnienia decydują, czy widzi tylko swoje wizyty, czy cały kalendarz firmy.",
        },
        {
          question: "Jakie widoki ma kalendarz?",
          answer:
            "Dzień z kolumnami pracowników, tydzień, miesiąc i lista wizyt. Wizyty filtrujesz po pracowniku i usłudze, a dzienny grafik pracownika wydrukujesz do PDF.",
        },
        {
          question: "Czy klienci mogą umawiać się sami przez internet?",
          answer:
            "Rezerwacja online jest w przygotowaniu — klient wybierze usługę, pracownika i wolny termin, a wizyta od razu trafi do kalendarza. Dziś wizyty wpisuje zespół, a klienci dostają automatyczne przypomnienia.",
        },
        {
          question: "Co się dzieje, gdy klient odwoła wizytę?",
          answer:
            "Zwolnione miejsce od razu widać w kalendarzu, a nową wizytę wstawisz w nie jednym kliknięciem. Panel główny pokazuje też najbliższe wolne terminy.",
        },
      ],
    },
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
    page: {
      h1: "Karty zabiegowe online — wysyłane klientom przed wizytą",
      metaTitle: "Karta zabiegowa online — wywiady i zgody klientów",
      metaDescription:
        "Karty zabiegowe online: własne wzory wywiadów i zgód przypisane do usług, wysyłka mailem przed wizytą i skany w kartotece klienta. Wypróbuj 7 dni za darmo.",
      intro: [
        "Wywiad przed zabiegiem, zgoda na zabieg, ankieta przed pierwszą konsultacją — w salonie kosmetycznym, gabinecie medycyny estetycznej czy studiu tatuażu to codzienność. Na papierze karty giną, a przed wizytą nikt nie wie, czy klient w ogóle ją wypełnił.",
        "W Saloonik wgrywasz własne wzory kart (PDF, JPG, PNG, DOC, DOCX) i przypisujesz je do usług. Gdy zapisujesz wizytę na usługę wymagającą karty, a klient nie ma jeszcze wypełnionej, Saloonik wyśle mu ją mailem. Wypełnioną kartę dodasz jako skan — wystarczy zdjęcie telefonem.",
        "W kartotece klienta każda karta ma status „Wysłana” albo „Wypełniona”, a wizyta ostrzeże Cię, jeśli wymaganej karty brakuje. Klientowi bez adresu e-mail wydrukujesz pustą kartę na miejscu.",
      ],
      faq: [
        {
          question: "Czy mogę używać własnych wzorów kart zabiegowych?",
          answer:
            "Tak. Wgrywasz własne pliki — PDF, JPG, PNG, DOC lub DOCX — i przypisujesz je do usług, które ich wymagają.",
        },
        {
          question: "Jak klient dostaje kartę przed wizytą?",
          answer:
            "Przy zapisie wizyty Saloonik wysyła kartę mailem, jeśli klient nie ma jeszcze wypełnionej karty dla tej usługi. Klientowi bez e-maila wydrukujesz pustą kartę.",
        },
        {
          question: "Gdzie przechowywane są wypełnione karty?",
          answer:
            "W kartotece klienta, w zakładce kart zabiegowych. Skan dodasz zdjęciem z telefonu, a dostęp do kartotek ograniczysz rolami i uprawnieniami.",
        },
        {
          question: "Skąd wiem, że klientowi brakuje karty?",
          answer:
            "Wizyta pokazuje ostrzeżenie, gdy brakuje wymaganej karty, a w kartotece widać status każdej karty: „Wysłana” lub „Wypełniona”.",
        },
      ],
    },
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
    ],
    page: {
      h1: "Przypomnienia SMS o wizycie — automatycznie",
      metaTitle: "Przypomnienia SMS o wizycie dla salonu i gabinetu",
      metaDescription:
        "Automatyczne przypomnienia SMS i e-mail o wizycie: mniej nieodbytych wizyt, 400 SMS-ów na osobę miesięcznie w cenie abonamentu. Wypróbuj 7 dni za darmo.",
      intro: [
        "Nieodbyta wizyta to pusty fotel i stracony przychód — a najczęstszy powód jest prosty: klient zapomniał. Ręczne pisanie wiadomości wieczorem przed każdym dniem pracy zajmuje czas, którego w salonie zwykle brakuje.",
        "Saloonik sam wysyła klientowi przypomnienie przed każdą wizytą — SMS-em lub e-mailem, zgodnie ze zgodami zapisanymi w jego kartotece. Nie musisz o niczym pamiętać, a historia wysłanych wiadomości pokazuje, co i kiedy wyszło.",
        "SMS-y są w cenie abonamentu: 400 wiadomości miesięcznie na każdą osobę w firmie, czyli właściciela i każdego pracownika.",
      ],
      faq: [
        {
          question: "Ile SMS-ów jest w cenie?",
          answer:
            "400 SMS-ów miesięcznie na każdą osobę w firmie — właściciela i każdego pracownika — bez dodatkowych opłat.",
        },
        {
          question: "Czy klient musi zgodzić się na przypomnienia?",
          answer:
            "Zgody na przypomnienia SMS i e-mail zapisujesz w kartotece klienta, a Saloonik wysyła wiadomości zgodnie z tymi zgodami.",
        },
        {
          question: "Czy przypomnienie może przyjść e-mailem?",
          answer:
            "Tak. Przypomnienie wychodzi SMS-em lub e-mailem, w zależności od zgód zapisanych przy kliencie.",
        },
      ],
    },
  },
  {
    id: "zespol",
    photo: {
      src: "/images/zespol.jpg",
      alt: "Nożyczki fryzjerskie zawieszone na ścianie salonu",
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
    page: {
      h1: "Magazyn i sprzedaż kosmetyków w salonie",
      metaTitle: "Program magazynowy dla salonu — stany i sprzedaż",
      metaDescription:
        "Magazyn salonu w programie do wizyt: stany produktów w każdym oddziale, dostawy, inwentaryzacja, alerty o niskim stanie i sprzedaż kosmetyków przy wizycie.",
      intro: [
        "Farba kończy się w środku koloryzacji, a szampon na sprzedaż leży w szafce od roku — tak wygląda magazyn prowadzony na oko. Saloonik trzyma produkty do zabiegów i na sprzedaż w jednym miejscu, z osobnymi stanami dla każdego oddziału.",
        "Dostawę przyjmujesz w kilka kliknięć, a inwentaryzacja zapisuje różnice między stanem w systemie a tym na półce. Materiały przypisujesz do usług, więc zużycie przy zabiegach odejmuje się od stanu, a historia ruchów pokazuje, co i kiedy zeszło.",
        "Gdy produkt spada poniżej ustawionego minimum, Saloonik pokaże alert, zanim czegoś zabraknie. Kosmetyki sprzedasz klientowi przy wizycie albo osobno.",
      ],
      faq: [
        {
          question: "Czy magazyn jest w cenie abonamentu?",
          answer:
            "Tak. Magazyn i sprzedaż, tak jak pozostałe funkcje, są w cenie abonamentu, bez dodatkowych modułów.",
        },
        {
          question: "Czy rozróżnię produkty na sprzedaż i do zabiegów?",
          answer:
            "Tak. Saloonik prowadzi osobne stany produktów na sprzedaż i do zabiegów.",
        },
        {
          question: "Mam kilka lokali. Czy każdy ma własny magazyn?",
          answer:
            "Tak. Stany produktów są prowadzone osobno dla każdego oddziału, z historią ruchów.",
        },
        {
          question: "Skąd wiem, że coś się kończy?",
          answer:
            "Dla każdego produktu ustawiasz minimum, a Saloonik pokaże alert, gdy stan spadnie poniżej tej wartości.",
        },
      ],
    },
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
