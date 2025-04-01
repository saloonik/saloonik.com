// components/Testimonials.tsx
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

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

const Testimonials = () => {
    return (
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
    )
}

export default Testimonials
