// components/Features.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Zap, BarChart3, Shield, Clock } from "lucide-react"

const features = [
    {
        icon: <Zap className="h-6 w-6 text-primary" />,
        title: "Zwiększona efektywność",
        description:
            "Automatyzuj powtarzalne zadania i usprawnij przepływ pracy dzięki potężnym narzędziom automatyzacji.",
    },
    {
        icon: <BarChart3 className="h-6 w-6 text-primary" />,
        title: "Analiza w czasie rzeczywistym",
        description:
            "Podejmuj decyzje oparte na danych dzięki rozbudowanym funkcjom analitycznym i raportowym.",
    },
    {
        icon: <Shield className="h-6 w-6 text-primary" />,
        title: "Bezpieczeństwo na poziomie przedsiębiorstwa",
        description:
            "Chroń swoje dane dzięki zabezpieczeniom i funkcjom zgodności na poziomie przedsiębiorstwa.",
    },
    {
        icon: <Clock className="h-6 w-6 text-primary" />,
        title: "Wsparcie 24/7",
        description:
            "Uzyskaj pomoc, kiedy jej potrzebujesz, dzięki naszemu dedykowanemu zespołowi wsparcia dostępnemu przez całą dobę.",
    },
]

export default function Features() {
    return (
        <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <Card key={index}>
                        <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                            <div className="rounded-full bg-primary/10 p-3">
                                {feature.icon}
                            </div>
                            <h3 className="font-semibold">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
