# saloonik.com

Strona marketingowa Saloonika (Next.js 16, Tailwind CSS 4) w design systemie „Atelier Plum” z `system.saloonik.com`.

```bash
npm run dev     # http://localhost:3000
npm run build   # wszystkie strony generowane statycznie
npm test        # testy kalkulatora cen (vitest)
npm run lint
```

## Gdzie co jest

- `src/config/site.ts`: adresy aplikacji, e-mail kontaktowy, dane firmy (puste pola nie są renderowane).
- `src/content/`: cała treść (funkcje, branże, FAQ), oddzielona od komponentów.
- `src/lib/pricing.ts`: port 1:1 `SubscriptionPricing.cs` + `SubscriptionPlanSeedData.cs` z API. **Przy zmianie cennika w backendzie zaktualizuj ten plik i testy.**
- `src/lib/seo.ts`: `buildMetadata()` i generatory JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList).
- `src/components/mockups/`: mockupy UI aplikacji budowane w kodzie (bez screenshotów).
- `src/app/globals.css`: tokeny kolorów skopiowane z `@saloonik/app-core/tokens.css`.

## Podstrony branżowe

Nowa branża = nowy wpis w `src/content/industries.ts`. Strona `/dla/<slug>`, obraz OG, sitemap i linki w nawigacji generują się automatycznie.

## Zmienne środowiskowe

- `NEXT_PUBLIC_GSC_VERIFICATION`: kod weryfikacji Google Search Console (opcjonalny).
