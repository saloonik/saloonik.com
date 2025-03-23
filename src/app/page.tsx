"use client"

import { useState, useEffect } from "react"
import { ArrowRight, BarChart3, Check, Clock, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Zwiększona efektywność</h3>
                <p className="text-sm text-muted-foreground">
                  Automatyzuj powtarzalne zadania i usprawnij przepływ pracy dzięki potężnym narzędziom automatyzacji.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Analiza w czasie rzeczywistym</h3>
                <p className="text-sm text-muted-foreground">
                  Podejmuj decyzje oparte na danych dzięki rozbudowanym funkcjom analitycznym i raportowym.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Bezpieczeństwo na poziomie przedsiębiorstwa</h3>
                <p className="text-sm text-muted-foreground">
                  Chroń swoje dane dzięki zabezpieczeniom i funkcjom zgodności na poziomie przedsiębiorstwa.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Wsparcie 24/7</h3>
                <p className="text-sm text-muted-foreground">
                  Uzyskaj pomoc, kiedy jej potrzebujesz, dzięki naszemu dedykowanemu zespołowi wsparcia dostępnemu przez całą dobę.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Proste, przejrzyste ceny</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Dostosuj swój plan do potrzeb Twojego biznesu beauty
            </p>
          </div>
          <PricingCalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Zaufali nam liderzy branży</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              Zobacz, co nasi klienci mówią o swoich doświadczeniach z naszą platformą.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="rounded-full"
                      width={48}
                      height={48}
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/50 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Gotowy, aby zacząć?</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-lg">
            Dołącz do tysięcy firm beauty, które już korzystają z naszej platformy, aby uprościć swoje operacje.
          </p>
          <Button size="lg" className="mt-8">
            Rozpocznij bezpłatny okres próbny
          </Button>
        </div>
      </section>
    </div>
  )
}

function PricingCalculator() {
  const [staffCount, setStaffCount] = useState("1")
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  const basePrice = 29
  const pricePerStaff = 10

  const addons = [
    { id: "sms", name: "Powiadomienia SMS", price: 15 },
    { id: "loyalty", name: "Program lojalnościowy", price: 20 },
    { id: "marketing", name: "Narzędzia marketingowe", price: 25 },
    { id: "branding", name: "Indywidualna marka", price: 30 },
  ]

  useEffect(() => {
    const staffPrice = basePrice + (Number.parseInt(staffCount) - 1) * pricePerStaff

    const addonsPrice = selectedAddons.reduce((total, addonId) => {
      const addon = addons.find((a) => a.id === addonId)
      return total + (addon?.price || 0)
    }, 0)

    setTotalPrice(staffPrice + addonsPrice)
  }, [staffCount, selectedAddons])

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => (prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]))
  }

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl">Zbuduj swój plan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Standard Features */}
        <div>
          <h3 className="font-medium text-lg mb-3">Wszystkie plany obejmują</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {standardFeatures.map((feature, index) => (
              <div key={index} className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Staff Selection */}
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Ilu pracowników?</h3>
          <p className="text-sm text-muted-foreground">
            Cena podstawowa obejmuje 1 pracownika. Dodatkowi pracownicy to PLN{pricePerStaff}/miesiąc za każdego.
          </p>
          <div className="flex items-center gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="staff-count">Liczba pracowników</Label>
              <Select value={staffCount} onValueChange={setStaffCount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wybierz liczbę pracowników" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} {count === 1 ? "pracownik" : "pracowników"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Cena</p>
              <p className="font-medium">PLN{basePrice + (Number.parseInt(staffCount) - 1) * pricePerStaff}/miesiąc</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Additional Features */}
        <div className="space-y-3">
          <h3 className="font-medium text-lg">Dodatkowe funkcje</h3>
          <p className="text-sm text-muted-foreground">Ulepsz swój plan o te funkcje premium</p>
          <div className="space-y-3">
            {addons.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={addon.id}
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={() => toggleAddon(addon.id)}
                  />
                  <Label htmlFor={addon.id} className="text-sm font-normal cursor-pointer">
                    {addon.name}
                  </Label>
                </div>
                <span className="text-sm font-medium">+PLN{addon.price}/miesiąc</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Total */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-lg">Razem</h3>
            <p className="text-sm text-muted-foreground">Fakturowane miesięcznie</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">PLN{totalPrice}/miesiąc</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Rozpocznij swój niestandardowy plan</Button>
      </CardFooter>
    </Card>
  )
}

const standardFeatures = [
  "Zarządzanie rezerwacjami klientów",
  "Kalendarz i harmonogramowanie",
  "Podstawowe śledzenie zapasów",
  "Powiadomienia e-mail",
  "Przetwarzanie płatności",
  "Baza danych klientów",
  "Przypomnienia o wizytach",
  "Podstawowe raportowanie",
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO w TechCorp",
    content:
      "Ta platforma zmieniła sposób zarządzania naszymi operacjami. Tylko funkcje automatyzacji zaoszczędziły nam niezliczoną ilość godzin tygodniowo.",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Michael Chen",
    role: "Dyrektor Operacyjny",
    content:
      "Analiza w czasie rzeczywistym dostarczyła nam informacji, których wcześniej nie mieliśmy. Pomogło nam to podejmować lepsze decyzje i szybciej rozwijać biznes.",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Emily Rodriguez",
    role: "Właścicielka małego biznesu",
    content:
      "Jako właścicielka małej firmy, ta platforma była prawdziwą rewolucją. To jak mieć dodatkowego członka zespołu, który zajmuje się wszystkimi naszymi operacjami.",
    avatar: "/placeholder.svg?height=48&width=48",
  },
]
