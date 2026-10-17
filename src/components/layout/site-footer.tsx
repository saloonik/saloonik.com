import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";

const productLinks = [
  { href: "/funkcje", label: "Funkcje" },
  { href: "/cennik", label: "Cennik" },
  { href: "/kontakt", label: "Kontakt" },
];

// extra vertical padding on phones gives each link a ~32px tap target
const linkClass =
  "hover:text-primary inline-block py-1.5 transition-colors sm:py-0.5";

export function SiteFooter() {
  const { company } = siteConfig;

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
            className="flex flex-wrap gap-x-5 text-sm font-medium sm:gap-y-1"
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
              className="text-primary inline-block py-1.5 hover:underline sm:py-0.5"
            >
              Załóż konto
            </a>
          </nav>
        </div>

        <nav
          aria-label="Branże"
          className="text-muted-foreground flex flex-wrap gap-x-4 border-t pt-6 text-sm sm:gap-y-1"
        >
          <span className="text-foreground py-1.5 font-medium sm:py-0.5">
            Branże:
          </span>
          {industries.map((i) => (
            <Link key={i.slug} href={`/dla/${i.slug}`} className={linkClass}>
              {i.name}
            </Link>
          ))}
        </nav>

        <div className="text-muted-foreground flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-0.5">
            <p>
              © {new Date().getFullYear()} {company.legalName}, {company.street}
              , {company.postalCode} {company.city}
            </p>
            <p>
              NIP {company.nip}, KRS {company.krs}, REGON {company.regon}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4">
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
