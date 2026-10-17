# saloonik.com

Strona marketingowa Saloonika (Next.js 16, Tailwind CSS 4) w design systemie „Atelier Plum” z `system.saloonik.com`.

```bash
npm run dev     # http://localhost:3000
npm run build   # strony generowane statycznie, /api/kontakt działa po stronie serwera
npm test        # testy kalkulatora cen (vitest)
npm run lint
```

## Gdzie co jest

- `src/config/site.ts`: adresy aplikacji, e-mail kontaktowy, dane firmy (stopka, strona kontaktu, JSON-LD).
- `src/content/`: cała treść (funkcje, branże, FAQ), oddzielona od komponentów.
- `src/lib/pricing.ts`: port 1:1 `SubscriptionPricing.cs` + `SubscriptionPlanSeedData.cs` z API. **Przy zmianie cennika w backendzie zaktualizuj ten plik i testy.**
- `src/lib/seo.ts`: `buildMetadata()` i generatory JSON-LD (Organization, WebSite, SoftwareApplication, FAQPage, BreadcrumbList).
- `src/components/mockups/`: mockupy UI aplikacji budowane w kodzie (bez screenshotów).
- `src/app/globals.css`: tokeny kolorów skopiowane z `@saloonik/app-core/tokens.css`.

## Podstrony branżowe

Nowa branża = nowy wpis w `src/content/industries.ts`. Strona `/dla/<slug>`, obraz OG, sitemap i linki w nawigacji generują się automatycznie.

## Zmienne środowiskowe

- `NEXT_PUBLIC_GSC_VERIFICATION`: kod weryfikacji Google Search Console (opcjonalny).
- `NOCODB_CONTACT_FORM_URL`: adres publicznego formularza NocoDB tabeli „Kontakt ze strony” (baza Saloonik), do którego `/api/kontakt` zapisuje wiadomości z formularza kontaktowego (tak samo jak „Zgłoś uwagę” w `system.saloonik.com`). Kolumny: `Imię i nazwisko`, `Email`, `Telefon`, `Firma`, `Temat`, `Wiadomość`, `Przeglądarka`. Bez tej zmiennej formularz pokazuje komunikat z adresem e-mail.
