'use client'
import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const PricingCalculator = () => {
  const [staffCount, setStaffCount] = useState("2")

  const basePrice = 39
  const pricePerStaff = 10
  const tierPricing: Record<string, number> = {
    "10+": basePrice + 80, // Example additional cost for 10+ staff
    "15+": basePrice + 130, // Example additional cost for 15+ staff
    "20+": basePrice + 180, // Example additional cost for 20+ staff
  }

  const totalPrice = tierPricing.hasOwnProperty(staffCount)
    ? tierPricing[staffCount]
    : basePrice + (Number.parseInt(staffCount) - 2) * pricePerStaff

  return (
    <Card className="mx-auto max-w-3xl" id="pricing">
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
            Cena podstawowa obejmuje 2 pracowników. Dodatkowi pracownicy to {pricePerStaff}zł/miesiąc za każdego.
          </p>
          <p className="text-sm text-muted-foreground font-semibold">
            Dodatkowa opcja automatycznych SMS-ów będzie płatna wewnątrz systemu podczas konfiguracji.
          </p>
          <div className="flex items-center gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="staff-count">Liczba pracowników</Label>
              <Select value={staffCount} onValueChange={setStaffCount}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Wybierz liczbę pracowników" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(8).keys()].map((count) => (
                    <SelectItem key={count + 2} value={(count + 2).toString()}>
                      {count + 2} pracowników
                    </SelectItem>
                  ))}
                  {Object.keys(tierPricing).map((tier) => (
                    <SelectItem key={tier} value={tier}>
                      {tier} pracowników
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Cena</p>
              <p className="font-medium">{totalPrice}zł/miesiąc</p>
            </div>
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
            <p className="text-3xl font-bold">{totalPrice}zł/miesiąc</p>
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

export default PricingCalculator