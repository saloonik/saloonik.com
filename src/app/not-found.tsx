import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Section className="text-center">
      <p className="text-primary font-mono text-sm font-semibold">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Nie znaleźliśmy tej strony</h1>
      <p className="text-muted-foreground mt-4">Mogła zostać przeniesiona albo adres zawiera literówkę.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild size="lg">
          <Link href="/">Strona główna</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/funkcje">Funkcje</Link>
        </Button>
      </div>
    </Section>
  );
}
