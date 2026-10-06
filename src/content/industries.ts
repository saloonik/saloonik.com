import type { FaqItem } from "./faq";

export type ServiceSample = { name: string; duration: number; price: number };

export type Industry = {
  slug: string;
  name: string;
  /** Kolor branży z industry-presets.ts w systemie */
  color: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  pains: { problem: string; solution: string }[];
  featureIds: string[];
  services: ServiceSample[];
  faq: FaqItem[];
};

// Wszystkie branże dostępne przy rejestracji (system.saloonik.com, industry-presets.ts).
export const allIndustryLabels = [
  "Fryzjerstwo",
  "Barber",
  "Paznokcie",
  "Kosmetologia",
  "Brwi i rzęsy",
  "Makijaż",
  "Masaż",
  "Depilacja",
  "Medycyna estetyczna",
  "Podologia",
  "Fizjoterapia",
  "Tatuaż i piercing",
  "Dietetyka",
  "Trening personalny",
  "Groomer",
  "Inna branża",
];

// Podstrony SEO. Usługi i ceny = gotowe szablony, które Saloonik proponuje przy rejestracji.
export const industries: Industry[] = [
  {
    slug: "salon-fryzjerski",
    name: "Fryzjerstwo",
    color: "#B7791F",
    h1: "Program dla salonu fryzjerskiego",
    metaTitle: "Program dla salonu fryzjerskiego — kalendarz i SMS",
    metaDescription:
      "Program do salonu fryzjerskiego: kalendarz wizyt dla całego zespołu, karta klientki z historią koloryzacji, przypomnienia SMS i statystyki. Sprawdź 7 dni za darmo.",
    eyebrow: "Dla fryzjerów",
    intro:
      "Koloryzacja na trzy godziny, szybkie strzyżenie między nimi i stała klientka, która chce „to samo co ostatnio”. Saloonik układa grafik całego zespołu i pamięta historię każdej wizyty.",
    pains: [
      {
        problem: "Długie usługi rozjeżdżają grafik",
        solution:
          "Usługi mają zapisany czas trwania, a kalendarz ostrzega, gdy nowa wizyta nachodzi na inną. Balayage na 3 godziny zajmie dokładnie tyle miejsca, ile trzeba.",
      },
      {
        problem: "Nikt nie pamięta, jaki był kolor",
        solution:
          "Zdjęcia przed i po przy każdej usłudze, z notatką o użytych produktach, oraz pełna historia wizyt. Przy następnej koloryzacji wszystko masz przed oczami.",
      },
      {
        problem: "Puste fotele po nieodbytych wizytach",
        solution:
          "Automatyczne przypomnienia SMS przed wizytą, a gdy ktoś odwoła — nową wizytę wstawisz w zwolnione miejsce jednym kliknięciem.",
      },
    ],
    featureIds: ["kalendarz", "zdjecia", "przypomnienia", "zespol"],
    services: [
      { name: "Strzyżenie damskie", duration: 60, price: 120 },
      { name: "Strzyżenie męskie", duration: 30, price: 60 },
      { name: "Koloryzacja", duration: 120, price: 250 },
      { name: "Balayage", duration: 180, price: 450 },
      { name: "Keratynowe prostowanie", duration: 150, price: 450 },
    ],
    faq: [
      {
        question: "Czy każdy fryzjer może mieć własny grafik?",
        answer:
          "Tak. W widoku dnia każdy pracownik ma osobną kolumnę, a swoje godziny pracy i nieobecności. Uprawnienia decydują, czy pracownik widzi tylko swoje wizyty, czy cały salon.",
      },
      {
        question: "Czy mogę zapisać, jakich farb użyłam u klientki?",
        answer:
          "Tak. Do każdego zdjęcia przed i po dodasz notatkę, np. z numerami farb i proporcjami. Zdjęcia są przypisane do usługi i wizyty, więc przy kolejnej koloryzacji masz wszystko pod ręką.",
      },
      {
        question: "Mam już cennik usług. Muszę go przepisywać?",
        answer:
          "Nie. Przy rejestracji Saloonik podpowiada typowe usługi fryzjerskie z cenami, a własny cennik wgrasz z pliku Excel.",
      },
    ],
  },
  {
    slug: "barber",
    name: "Barber",
    color: "#475569",
    h1: "Program dla barbera i barber shopu",
    metaTitle: "Program dla barbera — grafik i przypomnienia SMS",
    metaDescription:
      "Program dla barber shopu: szybki grafik wizyt dla kilku barberów, baza stałych klientów, przypomnienia SMS i statystyki przychodu. Wypróbuj Saloonik 7 dni za darmo.",
    eyebrow: "Dla barberów",
    intro:
      "Krótkie, gęsto ułożone wizyty, stali klienci co trzy tygodnie i kilku barberów na zmianie. Saloonik pokazuje cały dzień barber shopu na jednym ekranie.",
    pains: [
      {
        problem: "Gęsty grafik 30–45 minutowych wizyt",
        solution:
          "Widok dnia z kolumną dla każdego barbera. Wizytę przesuwasz przeciągnięciem, a kalendarz pilnuje, żeby nic się nie nałożyło.",
      },
      {
        problem: "Klienci zapominają o wizycie",
        solution:
          "SMS z przypomnieniem wychodzi automatycznie. 200 SMS-ów na osobę miesięcznie jest w cenie abonamentu.",
      },
      {
        problem: "Nie wiadomo, kto ile wypracował",
        solution:
          "Statystyki przychodu i liczby wizyt w podziale na barberów i usługi, z porównaniem do poprzedniego miesiąca.",
      },
    ],
    featureIds: ["kalendarz", "przypomnienia", "statystyki", "klienci"],
    services: [
      { name: "Strzyżenie klasyczne", duration: 45, price: 70 },
      { name: "Skin fade", duration: 45, price: 80 },
      { name: "Trymowanie brody", duration: 30, price: 50 },
      { name: "Strzyżenie i broda", duration: 75, price: 120 },
      { name: "Golenie brzytwą", duration: 30, price: 60 },
    ],
    faq: [
      {
        question: "Ile kosztuje Saloonik dla barber shopu z trzema barberami?",
        answer:
          "Właściciel i 3 pracowników w jednym lokalu to 184 zł netto miesięcznie. Przy płatności rocznej płacisz za 10 miesięcy. Dokładną kwotę policzysz w kalkulatorze na stronie cennika.",
      },
      {
        question: "Czy widzę przychód każdego barbera?",
        answer:
          "Tak. Statystyki pokazują przychód, liczbę wizyt i wykorzystanie czasu w podziale na pracowników i usługi.",
      },
      {
        question: "Czy mogę zablokować grafik na przerwę albo szkolenie?",
        answer:
          "Tak. Nieobecności (przerwa, szkolenie, urlop, dzień wolny) blokują rezerwacje w kalendarzu danego barbera.",
      },
    ],
  },
  {
    slug: "stylizacja-paznokci",
    name: "Paznokcie",
    color: "#D6457F",
    h1: "Program dla stylistki paznokci",
    metaTitle: "Program dla stylistki paznokci — kalendarz i SMS",
    metaDescription:
      "Program dla salonu paznokci i stylistek: kalendarz wizyt, przypomnienia SMS o uzupełnieniu, karta klientki ze zdjęciami stylizacji. Saloonik — 7 dni za darmo.",
    eyebrow: "Dla stylistek paznokci",
    intro:
      "Hybryda, żel, uzupełnienie co trzy tygodnie — i klientki, które chcą wrócić do tej samej stylizacji. Saloonik prowadzi kalendarz i pamięta, co było robione.",
    pains: [
      {
        problem: "Uzupełnienia, o których klientki zapominają",
        solution:
          "Automatyczne przypomnienie SMS lub e-mail przed każdą wizytą — bez ręcznego pisania wiadomości wieczorem.",
      },
      {
        problem: "„Chcę taki wzór jak ostatnio”",
        solution:
          "Zdjęcia przed i po dodajesz telefonem przy każdej usłudze wizyty. Ostatnia stylizacja jest w zakładce „Zdjęcia” kartoteki klientki.",
      },
      {
        problem: "Pracujesz sama i liczy się każda złotówka",
        solution:
          "Sama właścicielka bez pracowników to 79 zł netto miesięcznie — ze wszystkimi funkcjami.",
      },
    ],
    featureIds: ["przypomnienia", "zdjecia", "kalendarz", "uslugi"],
    services: [
      { name: "Manicure hybrydowy", duration: 75, price: 110 },
      { name: "Paznokcie żelowe", duration: 120, price: 180 },
      { name: "Uzupełnienie żelu", duration: 90, price: 140 },
      { name: "Pedicure hybrydowy", duration: 90, price: 140 },
      { name: "Zdjęcie hybrydy", duration: 20, price: 30 },
    ],
    faq: [
      {
        question: "Pracuję sama. Czy Saloonik ma dla mnie sens?",
        answer:
          "Tak. Plan dla samej właścicielki kosztuje 79 zł netto miesięcznie i zawiera kalendarz, bazę klientek, przypomnienia SMS i statystyki. Pracownika dodasz, gdy zespół urośnie.",
      },
      {
        question: "Czy mogę zapisywać zdjęcia stylizacji?",
        answer:
          "Tak. Zdjęcia przed i po dodajesz dla każdej usługi wizyty — na telefonie od razu otwiera się aparat — i porównujesz je obok siebie w kartotece klientki.",
      },
      {
        question: "Czy klientka musi wyrazić zgodę na SMS-y?",
        answer:
          "Zgody na przypomnienia SMS i e-mail zapisujesz na karcie klientki. Przypomnienia wychodzą zgodnie z tymi zgodami.",
      },
    ],
  },
  {
    slug: "salon-kosmetyczny",
    name: "Kosmetologia",
    color: "#0F9488",
    h1: "Program do salonu kosmetycznego",
    metaTitle: "Program do salonu kosmetycznego — karty zabiegowe",
    metaDescription:
      "Program do salonu kosmetycznego i gabinetu kosmetologii: karty zabiegowe, zdjęcia przed/po, kalendarz zespołu, przypomnienia SMS i statystyki. 7 dni za darmo.",
    eyebrow: "Dla salonów kosmetycznych",
    intro:
      "Serie zabiegów, konsultacje, dokumentacja efektów i kilka gabinetów pracujących równolegle. Saloonik porządkuje kalendarz i kartotekę klientów salonu kosmetycznego.",
    pains: [
      {
        problem: "Papierowe karty zabiegowe",
        solution:
          "Wzory kart przypisane do usług. Klient dostaje kartę mailem przy zapisie na wizytę, a wypełnioną dodajesz jako skan — wizyta ostrzeże, jeśli wymaganej karty brakuje.",
      },
      {
        problem: "Kto prowadzi którą klientkę?",
        solution:
          "Przy każdej usłudze ustawiasz, kto ją wykonuje, a historia wizyt pokazuje, u kogo klientka była ostatnio.",
      },
      {
        problem: "Brak wiedzy, które zabiegi się opłacają",
        solution:
          "Statystyki przychodu w podziale na usługi i pracowników, z porównaniem do poprzedniego okresu.",
      },
    ],
    featureIds: ["karty-zabiegowe", "zdjecia", "klienci", "statystyki"],
    services: [
      { name: "Konsultacja kosmetologiczna", duration: 30, price: 80 },
      { name: "Oczyszczanie wodorowe", duration: 60, price: 180 },
      { name: "Peeling kawitacyjny", duration: 45, price: 120 },
      { name: "Zabieg nawilżający", duration: 60, price: 200 },
      { name: "Mezoterapia mikroigłowa", duration: 60, price: 350 },
    ],
    faq: [
      {
        question: "Czy Saloonik obsługuje karty zabiegowe?",
        answer:
          "Tak. Wgrywasz własne wzory kart (PDF, JPG, DOC) i przypisujesz je do usług. Saloonik wysyła kartę klientowi mailem, a wypełnioną dodajesz jako skan. Klientowi bez e-maila wydrukujesz pustą kartę.",
      },
      {
        question: "Kto w salonie ma dostęp do danych klientów?",
        answer:
          "Decydujesz Ty. Role i uprawnienia określają, co widzi każdy pracownik, a dziennik aktywności pokazuje, kto i co zmienił.",
      },
      {
        question: "Czy mogę przenieść klientów z innego programu?",
        answer:
          "Tak — przez import z pliku Excel. Saloonik udostępnia gotowy szablon, a kreator prowadzi przez cały import.",
      },
    ],
  },
  {
    slug: "brwi-i-rzesy",
    name: "Brwi i rzęsy",
    color: "#7C5CD6",
    h1: "Program dla stylistki brwi i rzęs",
    metaTitle: "Program dla stylistki rzęs i brwi — kalendarz i SMS",
    metaDescription:
      "Program dla lash i brow stylistek: kalendarz wizyt, przypomnienia SMS o uzupełnieniu rzęs, zdjęcia efektów w karcie klientki. Wypróbuj Saloonik za darmo przez 7 dni.",
    eyebrow: "Dla stylistek brwi i rzęs",
    intro:
      "Rzęsy 1:1, uzupełnienia, laminacja i lifting — usługi, do których klientki wracają regularnie. Saloonik pilnuje terminów i przechowuje zdjęcia efektów.",
    pains: [
      {
        problem: "Uzupełnienia w odpowiednim momencie",
        solution:
          "Przypomnienie SMS lub e-mail przed każdą wizytą, wysyłane automatycznie zgodnie ze zgodą klientki.",
      },
      {
        problem: "Dokumentowanie efektów",
        solution:
          "Pary zdjęć przed i po przy każdej usłudze wizyty, porównywane obok siebie — idealne przy kolejnej aplikacji albo konsultacji.",
      },
      {
        problem: "Godzinne zabiegi i ciasny grafik",
        solution:
          "Usługi z dokładnym czasem trwania i kalendarz, który ostrzega przed nakładającymi się wizytami.",
      },
    ],
    featureIds: ["przypomnienia", "zdjecia", "karty-zabiegowe", "kalendarz"],
    services: [
      { name: "Henna i regulacja brwi", duration: 30, price: 60 },
      { name: "Laminacja brwi", duration: 60, price: 150 },
      { name: "Lifting rzęs", duration: 60, price: 160 },
      { name: "Rzęsy 1:1", duration: 120, price: 220 },
      { name: "Uzupełnienie rzęs", duration: 90, price: 160 },
    ],
    faq: [
      {
        question: "Czy mogę dodać własne usługi, np. rzęsy 2–3D?",
        answer:
          "Tak. Gotowe szablony to tylko punkt startowy — usługi, kategorie, czasy i ceny ustawiasz dowolnie.",
      },
      {
        question: "Ile SMS-ów mam w cenie?",
        answer: "200 SMS-ów na osobę (właścicielkę i każdego pracownika) miesięcznie.",
      },
      {
        question: "Czy potrzebuję karty płatniczej, żeby zacząć?",
        answer: "Nie. Okres próbny trwa 7 dni i nie wymaga podawania karty.",
      },
    ],
  },
  {
    slug: "gabinet-masazu",
    name: "Masaż",
    color: "#3F8F5B",
    h1: "Program dla gabinetu masażu",
    metaTitle: "Program dla gabinetu masażu — grafik i klienci",
    metaDescription:
      "Program dla gabinetu masażu i spa: grafik terapeutów, kartoteka klientów z historią zabiegów, przypomnienia SMS i statystyki obłożenia. Saloonik — 7 dni za darmo.",
    eyebrow: "Dla gabinetów masażu",
    intro:
      "Godzinne sesje, kilku terapeutów i klienci, którzy wracają co tydzień. Saloonik układa grafik gabinetu i pokazuje, jak wykorzystany jest czas zespołu.",
    pains: [
      {
        problem: "Przerwy między sesjami i dostępność terapeutów",
        solution:
          "Przerwy i nieobecności blokują kalendarz, a panel główny podpowiada najbliższe wolne terminy.",
      },
      {
        problem: "Przeciwwskazania i historia zabiegów",
        solution:
          "Karta zabiegowa z wywiadem trafia do klienta mailem przed wizytą, a skan wypełnionej — do kartoteki. Terapeuta widzi ją przed sesją.",
      },
      {
        problem: "Jak bardzo obłożony jest gabinet?",
        solution:
          "Statystyki wykorzystania czasu pracy pokazują obłożenie każdego terapeuty i całego gabinetu.",
      },
    ],
    featureIds: ["kalendarz", "karty-zabiegowe", "statystyki", "panel"],
    services: [
      { name: "Masaż klasyczny", duration: 60, price: 170 },
      { name: "Masaż relaksacyjny", duration: 60, price: 160 },
      { name: "Masaż gorącymi kamieniami", duration: 90, price: 250 },
      { name: "Masaż twarzy Kobido", duration: 60, price: 220 },
      { name: "Drenaż limfatyczny", duration: 60, price: 180 },
    ],
    faq: [
      {
        question: "Mam dwa gabinety w różnych lokalizacjach. Czy to zadziała?",
        answer:
          "Tak. Każdy oddział ma własne godziny otwarcia i zespół, a statystyki pokażesz dla jednego lokalu albo całej firmy. Każdy kolejny oddział to 59 zł netto miesięcznie.",
      },
      {
        question: "Czy mogę wydrukować grafik terapeuty na dany dzień?",
        answer: "Tak, dzienny grafik pracownika wydrukujesz lub zapiszesz jako PDF.",
      },
      {
        question: "Czy Saloonik nadaje się też dla fizjoterapeuty?",
        answer:
          "Tak. Przy rejestracji wybierzesz branżę „Fizjoterapia” z gotowymi usługami — kalendarz, kartoteka i przypomnienia działają tak samo.",
      },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
