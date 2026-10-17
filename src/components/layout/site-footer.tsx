import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";

const productLinks = [
  { href: "/funkcje", label: "Funkcje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/kontakt", label: "Kontakt" },
];

const linkClass = "hover:text-primary transition-colors";

export function SiteFooter() {
  const { company } = siteConfig;
  const companyLine = [
    company.legalName,
    company.address,
    company.nip && `NIP ${company.nip}`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-card border-t">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Program do umawiania wizyt dla firm usługowych
            </p>
          </div>
          <nav
            aria-label="Stopka"
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium"
          >
            {productLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </Link>
            ))}
            <a href={siteConfig.loginUrl} className={linkClass}>
              Zaloguj się
            </a>
            <a
              href={siteConfig.registerUrl}
              className="text-primary hover:underline"
            >
              Załóż konto
            </a>
          </nav>
        </div>

        <nav
          aria-label="Branże"
          className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-6 text-sm"
        >
          <span className="text-foreground font-medium">Branże:</span>
          {industries.map((i) => (
            <Link key={i.slug} href={`/dla/${i.slug}`} className={linkClass}>
              {i.name}
            </Link>
          ))}
        </nav>

        <div className="text-muted-foreground flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Saloonik
            {companyLine && `, ${companyLine}`}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href={siteConfig.termsUrl} className={linkClass}>
              Regulamin
            </a>
            <a href={siteConfig.privacyUrl} className={linkClass}>
              Polityka prywatności
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`} className={linkClass}>
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
