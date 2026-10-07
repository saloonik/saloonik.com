import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";

type FooterLink = { href: string; label: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Produkt",
    links: [
      { href: "/funkcje", label: "Funkcje" },
      { href: "/cennik", label: "Cennik" },
      { href: siteConfig.registerUrl, label: "Załóż konto", external: true },
      { href: siteConfig.loginUrl, label: "Zaloguj się", external: true },
    ],
  },
  {
    title: "Branże",
    links: industries.map((i) => ({ href: `/dla/${i.slug}`, label: i.name })),
  },
  {
    title: "Pomoc",
    links: [
      { href: "/kontakt", label: "Kontakt" },
      {
        href: `mailto:${siteConfig.contactEmail}`,
        label: siteConfig.contactEmail,
        external: true,
      },
    ],
  },
  {
    title: "Dokumenty",
    links: [
      { href: siteConfig.termsUrl, label: "Regulamin", external: true },
      {
        href: siteConfig.privacyUrl,
        label: "Polityka prywatności",
        external: true,
      },
    ],
  },
];

export function SiteFooter() {
  const { company } = siteConfig;
  const companyLine = [
    company.legalName,
    company.address,
    company.nip && `NIP ${company.nip}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <footer className="bg-card border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div className="max-w-xs space-y-4">
          <Logo />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Program do umawiania wizyt dla firm usługowych — kalendarz wizyt,
            klienci, przypomnienia SMS i statystyki w jednym miejscu.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h2 className="text-muted-foreground mb-3 text-[11px] font-semibold tracking-wider uppercase">
                {col.title}
              </h2>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="hover:text-primary text-sm break-all transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="hover:text-primary text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col gap-1 px-4 py-6 text-xs sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} Saloonik. Wszelkie prawa zastrzeżone.
          </p>
          {companyLine && <p>{companyLine}</p>}
        </div>
      </div>
    </footer>
  );
}
