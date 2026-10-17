import type { FaqItem } from "./faq";
import { grossPln, monthlyPrice, plan } from "@/lib/pricing";

export type ServiceSample = { name: string; duration: number; price: number };

export type Industry = {
  slug: string;
  name: string;

  color: string;
  photo?: { src: string; alt: string };
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

export const industries: Industry[] = [
  {
    slug: "salon-fryzjerski",
    photo: {
      src: "/images/salon-fryzjerski.jpg",
      alt: "Fryzjer strzyże pasmo włosów nożyczkami",
    },
    name: "Fryzjerstwo",
    color: "#B7791F",
    h1: "Program dla salonu fryzjerskiego",
    metaTitle: "Program dla salonu fryzjerskiego — grafik i SMS",
    metaDescription:
      "Program do salonu fryzjerskiego: kalendarz wizyt całego zespołu, karta klientki z historią koloryzacji, przypomnienia SMS i statystyki. 7 dni za darmo.",
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
    featureIds: ["kalendarz", "zdjecia", "przypomnienia", "magazyn"],
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
      {
        question: "Czy mogę sprzedawać kosmetyki klientkom przy wizycie?",
        answer:
          "Tak. Produkty na sprzedaż i do zabiegów prowadzisz w magazynie z osobnymi stanami. Sprzedaż dodasz przy wizycie albo osobno, a alert pokaże, gdy farby lub szamponu zostaje mniej niż ustawione minimum.",
      },
      {
        question: "Mam salon z kilkoma fryzjerami. Ile to kosztuje?",
        answer:
          "Płacisz cenę bazową za właściciela i lokal oraz stawkę za każdego pracownika. Dokładną kwotę dla swojego zespołu policzysz w kalkulatorze na stronie cennika, a przy płatności rocznej 2 miesiące masz gratis.",
      },
      {
        question: "Czy widzę, który fryzjer zarabia najwięcej?",
        answer:
          "Tak. Statystyki pokazują przychód i liczbę wizyt w podziale na pracowników i usługi, z porównaniem do poprzedniego okresu.",
      },
    ],
  },
  {
    slug: "barber",
    photo: {
      src: "/images/barber.jpg",
      alt: "Pędzel do golenia, brzytwy i maszynki na stanowisku barbera",
    },
    name: "Barber",
    color: "#475569",
    h1: "Program dla barbera i barber shopu",
    metaTitle: "Program dla barbera — grafik i przypomnienia SMS",
    metaDescription:
      "Program dla barber shopu: grafik wizyt kilku barberów, baza stałych klientów, przypomnienia SMS i statystyki przychodu. Wypróbuj 7 dni za darmo.",
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
          "SMS z przypomnieniem wychodzi automatycznie. 400 SMS-ów na osobę miesięcznie jest w cenie abonamentu.",
      },
      {
        problem: "Nie wiadomo, kto ile wypracował",
        solution:
          "Statystyki przychodu i liczby wizyt w podziale na barberów i usługi, z porównaniem do poprzedniego miesiąca.",
      },
    ],
    featureIds: ["kalendarz", "przypomnienia", "statystyki", "magazyn"],
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
        answer: `Właściciel i 3 pracowników w jednym lokalu to ${grossPln(monthlyPrice(3, 1))} brutto miesięcznie. Przy płatności rocznej płacisz za 10 miesięcy. Dokładną kwotę policzysz w kalkulatorze na stronie cennika.`,
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
      {
        question: "Czy klient dostanie przypomnienie o strzyżeniu?",
        answer:
          "Tak. SMS z przypomnieniem wychodzi automatycznie przed każdą wizytą, zgodnie ze zgodą zapisaną w kartotece klienta.",
      },
      {
        question: "Czy mogę sprzedawać kosmetyki do brody i włosów?",
        answer:
          "Tak. Magazyn prowadzi stany produktów, a sprzedaż dodasz przy wizycie albo osobno. Alert pokaże, gdy produkt się kończy.",
      },
      {
        question: "Czy barber widzi tylko swoje wizyty?",
        answer:
          "Decydujesz Ty. Role i uprawnienia określają, czy pracownik widzi swój grafik, czy kalendarz całego barber shopu.",
      },
    ],
  },
  {
    slug: "stylizacja-paznokci",
    photo: {
      src: "/images/stylizacja-paznokci.jpg",
      alt: "Dłoń z ciemnym manicure hybrydowym",
    },
    name: "Paznokcie",
    color: "#D6457F",
    h1: "Program dla stylistki paznokci",
    metaTitle: "Program dla stylistki paznokci — kalendarz i SMS",
    metaDescription:
      "Program dla salonu paznokci: kalendarz wizyt, przypomnienia SMS o uzupełnieniu, karta klientki ze zdjęciami stylizacji. Saloonik — 7 dni za darmo.",
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
        solution: `Sama właścicielka bez pracowników to ${grossPln(plan.monthlyPrice)} brutto miesięcznie — ze wszystkimi funkcjami.`,
      },
    ],
    featureIds: ["przypomnienia", "zdjecia", "kalendarz", "magazyn"],
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
        answer: `Tak. Plan dla samej właścicielki kosztuje ${grossPln(plan.monthlyPrice)} brutto miesięcznie i zawiera kalendarz, bazę klientek, przypomnienia SMS i statystyki. Pracownika dodasz, gdy zespół urośnie.`,
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
      {
        question: "Czy mogę prowadzić magazyn lakierów i żeli?",
        answer:
          "Tak. Materiały przypiszesz do usług, a zużycie przy zabiegach odejmie się od stanu. Alert pokaże, gdy produkt spadnie poniżej minimum.",
      },
      {
        question: "Czy przeniosę klientki z zeszytu lub innego programu?",
        answer:
          "Tak. Klientki zaimportujesz z pliku Excel — Saloonik udostępnia gotowy szablon i kreator importu.",
      },
      {
        question: "Czy widzę, które usługi przynoszą największy przychód?",
        answer:
          "Tak. Statystyki pokazują przychód i liczbę wizyt w podziale na usługi, z porównaniem do poprzedniego okresu.",
      },
    ],
  },
  {
    slug: "salon-kosmetyczny",
    photo: {
      src: "/images/salon-kosmetyczny.jpg",
      alt: "Miseczki z solami kosmetycznymi i kwiaty w salonie",
    },
    name: "Kosmetologia",
    color: "#0F9488",
    h1: "Program do salonu kosmetycznego",
    metaTitle: "Program do salonu kosmetycznego — karty zabiegowe",
    metaDescription:
      "Program do salonu kosmetycznego i gabinetu kosmetologii: karty zabiegowe, zdjęcia przed/po, kalendarz zespołu i przypomnienia SMS. 7 dni za darmo.",
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
    featureIds: ["karty-zabiegowe", "zdjecia", "magazyn", "statystyki"],
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
      {
        question: "Czy mogę dokumentować efekty zabiegów zdjęciami?",
        answer:
          "Tak. Zdjęcia przed i po dodajesz przy każdej usłudze wizyty i porównujesz je obok siebie w kartotece klientki.",
      },
      {
        question: "Czy Saloonik pilnuje stanów kosmetyków w gabinecie?",
        answer:
          "Tak. Magazyn prowadzi osobne stany produktów do zabiegów i na sprzedaż, a materiały przypisane do usług odejmują się przy zabiegach.",
      },
      {
        question: "Ile SMS-ów mam w cenie?",
        answer:
          "400 SMS-ów miesięcznie na każdą osobę w salonie — właścicielkę i każdego pracownika.",
      },
    ],
  },
  {
    slug: "brwi-i-rzesy",
    photo: {
      src: "/images/brwi-i-rzesy.jpg",
      alt: "Zalotka, szczoteczka do rzęs i pędzle do makijażu na białym blacie",
    },
    name: "Brwi i rzęsy",
    color: "#7C5CD6",
    h1: "Program dla stylistki brwi i rzęs",
    metaTitle: "Program dla stylistki rzęs i brwi — grafik i SMS",
    metaDescription:
      "Program dla stylistek rzęs i brwi: kalendarz wizyt, przypomnienia SMS o uzupełnieniu rzęs i zdjęcia efektów w karcie klientki. 7 dni za darmo.",
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
        answer:
          "400 SMS-ów na osobę (właścicielkę i każdego pracownika) miesięcznie.",
      },
      {
        question:
          "Czy mogę wysłać klientce kartę zabiegową przed liftingiem lub laminacją?",
        answer:
          "Tak. Wzór karty przypiszesz do usługi, a Saloonik wyśle ją mailem przy zapisie wizyty. Wypełnioną dodasz jako skan do kartoteki.",
      },
      {
        question: "Czy zapiszę zdjęcia efektu przy każdej aplikacji?",
        answer:
          "Tak. Pary zdjęć przed i po dodajesz przy każdej usłudze wizyty, z notatką, np. o skrętach i długościach rzęs.",
      },
      {
        question: "Pracuję sama. Ile zapłacę?",
        answer: `Sam właściciel w jednym lokalu to ${grossPln(plan.monthlyPrice)} brutto miesięcznie, ze wszystkimi funkcjami. Przy płatności rocznej płacisz za 10 miesięcy.`,
      },
    ],
  },
  {
    slug: "gabinet-masazu",
    photo: {
      src: "/images/gabinet-masazu.jpg",
      alt: "Kamienie do masażu, zwinięte ręczniki i storczyki w gabinecie",
    },
    name: "Masaż",
    color: "#3F8F5B",
    h1: "Program dla gabinetu masażu",
    metaTitle: "Program dla gabinetu masażu — grafik i klienci",
    metaDescription:
      "Program dla gabinetu masażu i spa: grafik terapeutów, kartoteka klientów z historią zabiegów, przypomnienia SMS i statystyki obłożenia. 7 dni za darmo.",
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
        answer: `Tak. Każdy oddział ma własne godziny otwarcia i zespół, a statystyki pokażesz dla jednego lokalu albo całej firmy. Każdy kolejny oddział to ${grossPln(plan.pricePerExtraBranch)} brutto miesięcznie.`,
      },
      {
        question: "Czy mogę wydrukować grafik terapeuty na dany dzień?",
        answer:
          "Tak, dzienny grafik pracownika wydrukujesz lub zapiszesz jako PDF.",
      },
      {
        question: "Czy Saloonik nadaje się też dla fizjoterapeuty?",
        answer:
          "Tak. Przy rejestracji wybierzesz branżę „Fizjoterapia” z gotowymi usługami — kalendarz, kartoteka i przypomnienia działają tak samo.",
      },
      {
        question: "Czy mogę wysłać klientowi wywiad o przeciwwskazaniach?",
        answer:
          "Tak. Kartę zabiegową z wywiadem wyślesz mailem przed wizytą, a skan wypełnionej trafi do kartoteki klienta.",
      },
      {
        question: "Czy widzę obłożenie każdego terapeuty?",
        answer:
          "Tak. Statystyki wykorzystania czasu pracy pokazują obłożenie każdego terapeuty i całego gabinetu, z porównaniem do poprzedniego okresu.",
      },
    ],
  },
  {
    slug: "makijaz",
    photo: {
      src: "/images/makijaz.jpg",
      alt: "Paleta cieni, róż i kosmetyki do makijażu na marmurowym blacie",
    },
    name: "Makijaż",
    color: "#BE185D",
    h1: "Program dla wizażystki i studia makijażu",
    metaTitle: "Program dla wizażystki — kalendarz i klientki",
    metaDescription:
      "Program dla wizażystki: kalendarz wizyt i próbnych makijaży, karta klientki ze zdjęciami, przypomnienia SMS i statystyki. Wypróbuj Saloonik 7 dni za darmo.",
    eyebrow: "Dla wizażystek",
    intro:
      "Makijaż ślubny z próbą miesiąc wcześniej, sesje zdjęciowe w sobotę rano i stałe klientki przed każdym wyjściem. Saloonik pilnuje terminów i pamięta, jaki makijaż zrobiłaś ostatnio.",
    pains: [
      {
        problem: "Próbny makijaż i dzień ślubu to dwie wizyty",
        solution:
          "Obie wizyty zapisujesz przy jednej klientce, a historia wizyt pokazuje, co ustaliłyście na próbie.",
      },
      {
        problem: "„Chcę taki sam jak ostatnio”",
        solution:
          "Zdjęcia efektu przy każdej usłudze wizyty i notatka o użytych kosmetykach. Odtworzysz makijaż bez zgadywania.",
      },
      {
        problem: "Weekendy pękają w szwach",
        solution:
          "Widok tygodnia pokazuje wolne okna, a przypomnienia SMS ograniczają nieodbyte wizyty w najbardziej obleganych terminach.",
      },
    ],
    featureIds: ["kalendarz", "zdjecia", "przypomnienia", "klienci"],
    services: [
      { name: "Makijaż dzienny", duration: 45, price: 150 },
      { name: "Makijaż wieczorowy", duration: 60, price: 200 },
      { name: "Makijaż ślubny", duration: 90, price: 350 },
      { name: "Próbny makijaż ślubny", duration: 90, price: 250 },
      { name: "Lekcja makijażu", duration: 120, price: 300 },
    ],
    faq: [
      {
        question: "Pracuję sama. Ile zapłacę?",
        answer: `Sam właściciel w jednym lokalu to ${grossPln(plan.monthlyPrice)} brutto miesięcznie, ze wszystkimi funkcjami. Przy płatności rocznej płacisz za 10 miesięcy.`,
      },
      {
        question: "Czy mogę zapisać zdjęcie makijażu przy wizycie?",
        answer:
          "Tak. Do każdej usługi wizyty dodasz zdjęcia przed i po, a w kartotece klientki zobaczysz je w historii wizyt.",
      },
      {
        question:
          "Czy klientka dostanie przypomnienie przed makijażem ślubnym?",
        answer:
          "Tak. Przypomnienie SMS lub e-mail wychodzi automatycznie przed każdą wizytą, także przed próbnym makijażem.",
      },
      {
        question: "Czy zapiszę, jakich kosmetyków użyłam?",
        answer:
          "Tak. Do każdego zdjęcia dodasz notatkę, np. o użytych podkładach i odcieniach, więc odtworzysz makijaż przy kolejnej wizycie.",
      },
    ],
  },
  {
    slug: "medycyna-estetyczna",
    photo: {
      src: "/images/medycyna-estetyczna.jpg",
      alt: "Szklane buteleczki z serum wśród drobnych kwiatów",
    },
    name: "Medycyna estetyczna",
    color: "#0E7490",
    h1: "Program dla gabinetu medycyny estetycznej",
    metaTitle: "Program dla medycyny estetycznej — wizyty i karty",
    metaDescription:
      "Program dla gabinetu medycyny estetycznej: kalendarz lekarzy i kosmetologów, karty zabiegowe z wywiadem, zdjęcia przed i po, SMS. 7 dni za darmo.",
    eyebrow: "Dla medycyny estetycznej",
    intro:
      "Konsultacja, zabieg i kontrola po dwóch tygodniach. Do tego wywiad przed każdym zabiegiem i dokumentacja zdjęciowa. Saloonik trzyma całą ścieżkę pacjentki w jednej kartotece.",
    pains: [
      {
        problem: "Wywiad i zgody na papierze",
        solution:
          "Karta zabiegowa trafia do pacjentki mailem przed wizytą. Skan wypełnionej zgody dołączasz do kartoteki.",
      },
      {
        problem: "Efekty trudno porównać po miesiącach",
        solution:
          "Zdjęcia przed i po przy każdym zabiegu, ułożone w historii wizyt. Kontrolę porównasz z dniem zabiegu.",
      },
      {
        problem: "Kto ma dostęp do danych pacjentek?",
        solution:
          "Role i uprawnienia ograniczają dostęp do kartotek, a dziennik aktywności zapisuje, kto co zmienił.",
      },
    ],
    featureIds: ["karty-zabiegowe", "zdjecia", "zespol", "kalendarz"],
    services: [
      { name: "Konsultacja", duration: 30, price: 150 },
      { name: "Mezoterapia igłowa", duration: 60, price: 600 },
      { name: "Stymulator tkankowy", duration: 45, price: 900 },
      { name: "Peeling medyczny", duration: 45, price: 350 },
      { name: "Wizyta kontrolna", duration: 20, price: 0 },
    ],
    faq: [
      {
        question: "Czy mogę wysłać pacjentce wywiad przed zabiegiem?",
        answer:
          "Tak. Kartę zabiegową wyślesz mailem przed wizytą, a skan wypełnionej dołączysz do kartoteki pacjentki.",
      },
      {
        question: "Czy recepcja musi widzieć zdjęcia pacjentek?",
        answer:
          "Nie. Uprawnienia ustawiasz dla każdej roli, więc recepcja może umawiać wizyty bez dostępu do dokumentacji.",
      },
      {
        question: "Czy porównam efekty przed zabiegiem i na kontroli?",
        answer:
          "Tak. Zdjęcia przed i po są przypisane do usługi i wizyty, a w kartotece pacjentki porównasz je obok siebie.",
      },
      {
        question: "Czy widzę, kto zmieniał dane pacjentki?",
        answer: "Tak. Dziennik aktywności zapisuje, kto, co i kiedy zmienił.",
      },
      {
        question: "Czy lekarz i kosmetolog mogą mieć osobne grafiki?",
        answer:
          "Tak. Każdy pracownik ma własną kolumnę w kalendarzu, godziny pracy i nieobecności, które blokują rezerwacje.",
      },
    ],
  },
  {
    slug: "podologia",
    photo: {
      src: "/images/podologia.jpg",
      alt: "Stopy klientki podczas zabiegu pielęgnacyjnego",
    },
    name: "Podologia",
    color: "#4D7C0F",
    h1: "Program dla gabinetu podologicznego",
    metaTitle: "Program dla podologa — kalendarz i dokumentacja",
    metaDescription:
      "Program dla gabinetu podologicznego: kalendarz wizyt, kartoteka pacjenta ze zdjęciami zmian, karty zabiegowe i przypomnienia SMS. 7 dni za darmo.",
    eyebrow: "Dla podologów",
    intro:
      "Terapia wrastającego paznokcia to kilka wizyt co dwa tygodnie, a każda zmiana wymaga zdjęcia. Saloonik prowadzi serię wizyt i dokumentację pacjenta w jednym miejscu.",
    pains: [
      {
        problem: "Leczenie rozłożone na wiele wizyt",
        solution:
          "Historia wizyt pacjenta z notatkami pokazuje przebieg terapii od pierwszej konsultacji.",
      },
      {
        problem: "Dokumentacja zdjęciowa zmian",
        solution:
          "Zdjęcia przed i po przy każdej wizycie. Postęp leczenia zobaczysz na jednej osi czasu.",
      },
      {
        problem: "Pacjenci zapominają o kontroli",
        solution:
          "Automatyczne przypomnienie SMS przed każdą wizytą, bez dzwonienia do każdego pacjenta.",
      },
    ],
    featureIds: ["zdjecia", "klienci", "przypomnienia", "karty-zabiegowe"],
    services: [
      { name: "Konsultacja podologiczna", duration: 30, price: 120 },
      { name: "Pedicure podologiczny", duration: 60, price: 180 },
      { name: "Terapia wrastającego paznokcia", duration: 45, price: 200 },
      { name: "Usunięcie odcisku", duration: 30, price: 120 },
      { name: "Klamra ortonyksyjna", duration: 45, price: 250 },
    ],
    faq: [
      {
        question: "Czy mogę prowadzić dokumentację zdjęciową pacjenta?",
        answer:
          "Tak. Zdjęcia dodajesz do każdej usługi wizyty, a w kartotece widzisz je w historii.",
      },
      {
        question: "Pracuję w dwóch gabinetach. Czy to zadziała?",
        answer: `Tak. Każdy oddział ma własne godziny otwarcia, a kolejny oddział to ${grossPln(plan.pricePerExtraBranch)} brutto miesięcznie.`,
      },
      {
        question:
          "Czy pacjent dostanie przypomnienie o kolejnej wizycie terapii?",
        answer:
          "Tak. SMS z przypomnieniem wychodzi automatycznie przed każdą wizytą, zgodnie ze zgodą zapisaną w kartotece pacjenta.",
      },
      {
        question: "Czy mogę wysłać pacjentowi wywiad przed pierwszą wizytą?",
        answer:
          "Tak. Kartę zabiegową z wywiadem wyślesz mailem przy zapisie wizyty, a skan wypełnionej dodasz do kartoteki.",
      },
    ],
  },
  {
    slug: "fizjoterapia",
    photo: {
      src: "/images/fizjoterapia.jpg",
      alt: "Fizjoterapeutka masuje plecy pacjentki",
    },
    name: "Fizjoterapia",
    color: "#1D4ED8",
    h1: "Program dla gabinetu fizjoterapii",
    metaTitle: "Program dla fizjoterapeuty — grafik i pacjenci",
    metaDescription:
      "Program dla gabinetu fizjoterapii: grafik terapeutów, serie wizyt pacjenta, karty z wywiadem, przypomnienia SMS i statystyki obłożenia. 7 dni za darmo.",
    eyebrow: "Dla fizjoterapeutów",
    intro:
      "Seria dziesięciu wizyt, kilku terapeutów na zmianie i pacjenci, którzy przychodzą prosto z pracy. Saloonik układa grafik gabinetu i pamięta przebieg każdej terapii.",
    pains: [
      {
        problem: "Serie wizyt trudno ułożyć",
        solution:
          "Widok tygodnia pokazuje wolne okna każdego terapeuty, więc kolejne wizyty serii zaplanujesz od razu.",
      },
      {
        problem: "Wywiad przed pierwszą wizytą",
        solution:
          "Karta z wywiadem trafia do pacjenta mailem, a terapeuta czyta ją przed spotkaniem.",
      },
      {
        problem: "Popołudnia pełne, ranki puste",
        solution:
          "Statystyki wykorzystania czasu pokazują obłożenie terapeutów w ciągu dnia i tygodnia.",
      },
    ],
    featureIds: ["kalendarz", "karty-zabiegowe", "statystyki", "zespol"],
    services: [
      { name: "Konsultacja fizjoterapeutyczna", duration: 60, price: 200 },
      { name: "Terapia manualna", duration: 50, price: 180 },
      { name: "Masaż leczniczy", duration: 45, price: 160 },
      { name: "Kinesiotaping", duration: 20, price: 60 },
      { name: "Trening medyczny", duration: 60, price: 170 },
    ],
    faq: [
      {
        question: "Czy każdy terapeuta ma własny grafik?",
        answer:
          "Tak. Kalendarz pokazuje osobną kolumnę dla każdego pracownika, a urlopy i szkolenia blokują rezerwacje.",
      },
      {
        question: "Czy terapeuta widzi tylko swoich pacjentów?",
        answer:
          "Uprawnienia ustawiasz dla każdej roli, więc decydujesz, do czego ma dostęp każdy pracownik.",
      },
      {
        question:
          "Czy pacjent dostanie przypomnienie o każdej wizycie z serii?",
        answer:
          "Tak. Przypomnienie SMS lub e-mail wychodzi automatycznie przed każdą wizytą, więc o kolejnych terminach serii nie musisz przypominać ręcznie.",
      },
      {
        question: "Czy mogę wysłać pacjentowi wywiad przed konsultacją?",
        answer:
          "Tak. Kartę z wywiadem przypiszesz do usługi, a Saloonik wyśle ją mailem przy zapisie wizyty.",
      },
    ],
  },
  {
    slug: "tatuaz-i-piercing",
    photo: {
      src: "/images/tatuaz-i-piercing.jpg",
      alt: "Tatuażysta w rękawiczkach wykonuje tatuaż na przedramieniu",
    },
    name: "Tatuaż i piercing",
    color: "#374151",
    h1: "Program dla studia tatuażu i piercingu",
    metaTitle: "Program dla studia tatuażu — sesje i zgody",
    metaDescription:
      "Program dla studia tatuażu i piercingu: kalendarz długich sesji, zgody klientów przed zabiegiem, zdjęcia prac i przypomnienia SMS. 7 dni za darmo.",
    eyebrow: "Dla studiów tatuażu",
    intro:
      "Rękaw na cztery sesje po pięć godzin, szybkie piercingi pomiędzy i zgoda podpisana przed każdym zabiegiem. Saloonik układa grafik artystów i trzyma dokumentację klienta.",
    pains: [
      {
        problem: "Duży projekt to kilka długich sesji",
        solution:
          "Usługi mają własny czas trwania, a historia wizyt klienta pokazuje wszystkie sesje projektu.",
      },
      {
        problem: "Zgody i przeciwwskazania",
        solution:
          "Karta zabiegowa ze zgodą trafia do klienta mailem przed sesją, a skan podpisanej — do kartoteki.",
      },
      {
        problem: "Portfolio rozsiane po telefonach",
        solution:
          "Zdjęcia gotowych prac zapisujesz przy wizycie, więc każda praca ma klienta i datę.",
      },
    ],
    featureIds: ["kalendarz", "karty-zabiegowe", "zdjecia", "zespol"],
    services: [
      { name: "Konsultacja projektu", duration: 30, price: 0 },
      { name: "Tatuaż — mały wzór", duration: 60, price: 300 },
      { name: "Sesja tatuażu", duration: 300, price: 1200 },
      { name: "Piercing ucha", duration: 20, price: 100 },
      { name: "Piercing nosa", duration: 20, price: 120 },
    ],
    faq: [
      {
        question: "Czy wizyta może trwać cały dzień?",
        answer:
          "Tak. Czas trwania ustawiasz w każdej usłudze, a w kalendarzu sesja zajmie dokładnie tyle miejsca, ile trzeba.",
      },
      {
        question: "Czy każdy artysta ma własny grafik?",
        answer:
          "Tak. Każdy pracownik ma swoją kolumnę w kalendarzu i własne konto z uprawnieniami.",
      },
      {
        question: "Czy klient podpisze zgodę przed sesją?",
        answer:
          "Kartę ze zgodą przypiszesz do usługi, a Saloonik wyśle ją mailem przy zapisie wizyty. Skan podpisanej zgody dodasz do kartoteki, a wizyta ostrzeże, gdy jej brakuje.",
      },
      {
        question: "Czy zapiszę zdjęcia gotowych prac?",
        answer:
          "Tak. Zdjęcia dodajesz przy każdej wizycie, więc każda praca ma przypisanego klienta i datę.",
      },
    ],
  },
  {
    slug: "dietetyka",
    photo: {
      src: "/images/dietetyka.jpg",
      alt: "Talerz z warzywami, jajkiem i awokado na drewnianym stole",
    },
    name: "Dietetyka",
    color: "#15803D",
    h1: "Program dla dietetyka",
    metaTitle: "Program dla dietetyka — wizyty i pacjenci",
    metaDescription:
      "Program dla dietetyka: kalendarz konsultacji i wizyt kontrolnych, kartoteka pacjenta, ankieta przed pierwszą wizytą i przypomnienia SMS. 7 dni za darmo.",
    eyebrow: "Dla dietetyków",
    intro:
      "Pierwsza konsultacja z wywiadem, potem kontrola co dwa, trzy tygodnie. Saloonik przypomina pacjentom o wizytach i trzyma ich historię w jednej kartotece.",
    pains: [
      {
        problem: "Wywiad żywieniowy zajmuje pół wizyty",
        solution:
          "Ankietę jako kartę zabiegową wyślesz mailem przed konsultacją. Na wizycie omawiacie już wyniki.",
      },
      {
        problem: "Pacjenci znikają po drugiej kontroli",
        solution:
          "Automatyczne przypomnienia SMS przed każdą wizytą i lista klientów, którzy dawno nie wracali.",
      },
      {
        problem: "Notatki w zeszycie",
        solution:
          "Kartoteka pacjenta z historią wizyt i notatkami, dostępna w przeglądarce w gabinecie i w domu.",
      },
    ],
    featureIds: ["karty-zabiegowe", "przypomnienia", "klienci", "statystyki"],
    services: [
      { name: "Konsultacja dietetyczna", duration: 60, price: 180 },
      { name: "Wizyta kontrolna", duration: 30, price: 100 },
      { name: "Plan żywieniowy", duration: 45, price: 250 },
      { name: "Analiza składu ciała", duration: 15, price: 60 },
      { name: "Konsultacja online", duration: 45, price: 150 },
    ],
    faq: [
      {
        question: "Pracuję sama. Ile zapłacę?",
        answer: `Sam właściciel w jednym lokalu to ${grossPln(plan.monthlyPrice)} brutto miesięcznie, ze wszystkimi funkcjami.`,
      },
      {
        question: "Czy mogę wysłać pacjentowi ankietę przed wizytą?",
        answer:
          "Tak. Kartę zabiegową z pytaniami wyślesz mailem, a wypełnioną zapiszesz w kartotece pacjenta.",
      },
      {
        question: "Czy pacjent dostanie przypomnienie o wizycie kontrolnej?",
        answer:
          "Tak. SMS lub e-mail z przypomnieniem wychodzi automatycznie przed każdą wizytą.",
      },
      {
        question: "Czy zobaczę, ilu pacjentów wraca na kontrole?",
        answer:
          "Tak. Statystyki pokazują nowych i powracających klientów w wybranym okresie.",
      },
    ],
  },
  {
    slug: "trening-personalny",
    photo: {
      src: "/images/trening-personalny.jpg",
      alt: "Rząd hantli na stojaku w studiu treningowym",
    },
    name: "Trening personalny",
    color: "#C2410C",
    h1: "Program dla trenera personalnego",
    metaTitle: "Program dla trenera personalnego — treningi",
    metaDescription:
      "Program dla trenera personalnego i studia treningowego: grafik treningów, baza podopiecznych, przypomnienia SMS i statystyki. 7 dni za darmo.",
    eyebrow: "Dla trenerów",
    intro:
      "Treningi o szóstej rano, wieczorne bloki i podopieczni, którzy przesuwają terminy w ostatniej chwili. Saloonik układa grafik trenerów i przypomina o każdym treningu.",
    pains: [
      {
        problem: "Przesunięcia w ostatniej chwili",
        solution:
          "Trening przeniesiesz w kalendarzu jednym ruchem, a kalendarz ostrzeże przed nałożeniem się terminów.",
      },
      {
        problem: "Nieobecności podopiecznych",
        solution:
          "Przypomnienie SMS przed każdym treningiem wychodzi automatycznie.",
      },
      {
        problem: "Kilku trenerów na jednej sali",
        solution:
          "Każdy trener ma swoją kolumnę w kalendarzu, a statystyki pokazują, ile treningów poprowadził.",
      },
    ],
    featureIds: ["kalendarz", "przypomnienia", "zespol", "statystyki"],
    services: [
      { name: "Trening personalny", duration: 60, price: 150 },
      { name: "Trening w parze", duration: 60, price: 200 },
      { name: "Konsultacja i pomiary", duration: 45, price: 120 },
      { name: "Plan treningowy", duration: 30, price: 200 },
      { name: "Trening medyczny", duration: 60, price: 170 },
    ],
    faq: [
      {
        question: "Czy mogę zarządzać kilkoma trenerami?",
        answer:
          "Tak. Każdy trener ma własne konto, grafik i uprawnienia, a Ty widzisz kalendarz całego studia.",
      },
      {
        question: "Czy podopieczny dostanie przypomnienie o treningu?",
        answer:
          "Tak. SMS z przypomnieniem wychodzi automatycznie przed każdą wizytą.",
      },
      {
        question: "Pracuję sam. Ile zapłacę?",
        answer: `Sam właściciel w jednym lokalu to ${grossPln(plan.monthlyPrice)} brutto miesięcznie, ze wszystkimi funkcjami. Przy płatności rocznej płacisz za 10 miesięcy.`,
      },
      {
        question: "Czy widzę, ile treningów poprowadził każdy trener?",
        answer:
          "Tak. Statystyki pokazują liczbę wizyt i przychód w podziale na pracowników i usługi.",
      },
    ],
  },
  {
    slug: "groomer",
    photo: {
      src: "/images/groomer.jpg",
      alt: "Groomerka czesze golden retrievera w salonie",
    },
    name: "Groomer",
    color: "#A16207",
    h1: "Program dla groomera i salonu dla psów",
    metaTitle: "Program dla groomera — kalendarz i karta pupila",
    metaDescription:
      "Program dla groomera: kalendarz strzyżeń, kartoteka właścicieli ze zdjęciami psów przed i po, przypomnienia SMS i statystyki. 7 dni za darmo.",
    eyebrow: "Dla groomerów",
    intro:
      "Mały york na godzinę, nowofundland na pół dnia i właściciele, którzy chcą „jak ostatnio”. Saloonik układa grafik salonu i zapisuje zdjęcia każdego strzyżenia.",
    pains: [
      {
        problem: "Czas zależy od rasy i szaty",
        solution:
          "Usługi mają własny czas trwania, więc kąpiel małego psa i pełne strzyżenie dużego zajmą w kalendarzu tyle, ile trzeba.",
      },
      {
        problem: "Jak było strzyżone ostatnio?",
        solution:
          "Zdjęcia przed i po przy każdej wizycie, z notatką o długości ostrzy i zachowaniu psa.",
      },
      {
        problem: "Właściciele zapominają o terminie",
        solution:
          "Automatyczne przypomnienie SMS przed wizytą, bez wydzwaniania do klientów.",
      },
    ],
    featureIds: ["kalendarz", "zdjecia", "przypomnienia", "uslugi"],
    services: [
      { name: "Kąpiel i suszenie", duration: 60, price: 100 },
      { name: "Strzyżenie małego psa", duration: 90, price: 150 },
      { name: "Strzyżenie dużego psa", duration: 150, price: 250 },
      { name: "Trymowanie", duration: 120, price: 200 },
      { name: "Obcinanie pazurów", duration: 15, price: 30 },
    ],
    faq: [
      {
        question: "Czy zapiszę notatki o psie, nie tylko o właścicielu?",
        answer:
          "Tak. Notatki i zdjęcia dodajesz przy każdej wizycie, więc historia strzyżeń pupila jest w kartotece właściciela.",
      },
      {
        question: "Czy mogę ustawić własne usługi i ceny?",
        answer:
          "Tak. Gotowe szablony to punkt startowy — usługi, czasy i ceny zmienisz w każdej chwili.",
      },
      {
        question: "Czy właściciel psa dostanie przypomnienie o wizycie?",
        answer:
          "Tak. SMS z przypomnieniem wychodzi automatycznie przed wizytą, zgodnie ze zgodą zapisaną w kartotece.",
      },
      {
        question: "Czy mogę sprzedawać karmę i kosmetyki dla psów?",
        answer:
          "Tak. Magazyn prowadzi stany produktów, a sprzedaż dodasz przy wizycie albo osobno.",
      },
    ],
  },
];

export const getIndustry = (slug: string) =>
  industries.find((i) => i.slug === slug);
