import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { mainNav, siteConfig } from "@/config/site";
import { industries } from "@/content/industries";
import { IndustriesMenu } from "./industries-menu";
import { MobileNav } from "./mobile-nav";
import { ScrollProgress } from "./scroll-progress";
import { ThemeToggle } from "./theme";

export function SiteHeader() {
  const [features, ...rest] = mainNav;
  return (
    <header className="bg-background/80 supports-backdrop-filter:bg-background/70 sticky top-0 z-40 border-b backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Logo animate />

        <nav
          aria-label="Główna nawigacja"
          className="ml-6 hidden items-center lg:flex"
        >
          <NavItem href={features.href}>{features.label}</NavItem>
          <IndustriesMenu
            items={industries.map(({ slug, name, photo }) => ({
              slug,
              name,
              photo: photo?.src,
            }))}
          />
          {rest.map((link) => (
            <NavItem key={link.href} href={link.href}>
              {link.label}
            </NavItem>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          {/* on phones the toggle lives in the menu to leave room for the CTA */}
          <ThemeToggle className="hidden sm:grid" />
          <Button asChild variant="ghost" className="hidden lg:inline-flex">
            <a href={siteConfig.loginUrl}>Zaloguj się</a>
          </Button>
          <Button asChild className="h-8 px-3 sm:h-9 sm:px-4">
            <a href={siteConfig.registerUrl}>
              <span>
                Wypróbuj<span className="hidden sm:inline"> za darmo</span>
              </span>
            </a>
          </Button>
          <MobileNav
            links={mainNav}
            industries={industries.map(({ slug, name }) => ({ slug, name }))}
            registerUrl={siteConfig.registerUrl}
            loginUrl={siteConfig.loginUrl}
          />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none focus-visible:ring-[3px]"
    >
      {children}
    </Link>
  );
}
