// Jedno źródło prawdy dla adresów, kontaktu i danych firmy.

const appUrl = "https://system.saloonik.com";

export const siteConfig = {
  name: "Saloonik",
  url: "https://saloonik.com",
  locale: "pl_PL",
  tagline: "Program do umawiania wizyt dla firm usługowych",
  description:
    "Program do umawiania wizyt dla salonów, gabinetów i studiów: kalendarz zespołu, baza klientów, karty zabiegowe, przypomnienia SMS i statystyki. 7 dni za darmo.",
  appUrl,
  registerUrl: `${appUrl}/register`,
  loginUrl: appUrl,
  helpUrl: `${appUrl}/pomoc`,
  termsUrl: `${appUrl}/regulamin`,
  privacyUrl: `${appUrl}/polityka-prywatnosci`,
  contactEmail: "kontakt@saloonik.com",
  trialDays: 7,
  // TODO: uzupełnić przed publikacją — puste pola nie są renderowane (stopka, JSON-LD).
  company: {
    legalName: "",
    nip: "",
    address: "",
  },
} as const;

export type NavLink = { href: string; label: string };

export const mainNav: NavLink[] = [
  { href: "/funkcje", label: "Funkcje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/kontakt", label: "Kontakt" },
];
