import PricingCalculator from "./_components/pricingcalculator"
import Testimonials from "./_components/testimonials"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Features from "./_components/features"
import CTA from "./_components/cta"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-8 px-4 py-24 text-center md:py-32">
        <div className="space-y-4 flex justify-center flex-col place-items-center">
          <Image alt="logo" width={300} height={300} src="logo.svg" />
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            najlepsza aplikacja do zarządzania dla branży beauty
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup">
              Rozpocznij <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            Zobacz demo
          </Button>
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-4xl rounded-lg border bg-muted/50 shadow-lg">
          <Image src="/app.jpg" alt="Podgląd platformy" className="rounded-lg object-cover" fill priority />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Features />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <PricingCalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 px-4 py-16 md:py-24">
        <CTA />
      </section>
    </div>
  )
}
