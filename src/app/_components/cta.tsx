// components/CTA.tsx
import { Button } from "@/components/ui/button"

export default function CTA() {
    return (
        <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Gotowy, aby zacząć?</h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-lg">
                Dołącz do tysięcy firm beauty, które już korzystają z naszej platformy, aby uprościć swoje operacje.
            </p>
            <Button size="lg" className="mt-8">
                Rozpocznij bezpłatny okres próbny
            </Button>
        </div>
    )
}
