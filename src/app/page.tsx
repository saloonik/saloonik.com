import { ArrowRight, BarChart3, Clock, Shield, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-8 px-4 py-24 text-center md:py-32">
        <div className="space-y-4 flex justify-center flex-col place-items-center">
            <Image alt="logo" width={300} height={300} src="logo.svg"/>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            the best managment app for beauty business
          </p>
        </div>
        <div className="flex flex-col gap-4 min-[400px]:flex-row">
          <Button size="lg" asChild>
            <Link href="/signup"> 
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-4xl rounded-lg border bg-muted/50 shadow-lg">
          <Image
            src="/app.jpg"
            alt="Platform preview"
            className="rounded-lg object-cover"
            fill
            priority
          />
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
                <h3 className="font-semibold">Increased Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Automate repetitive tasks and streamline your workflow with powerful automation tools.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Real-time Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Make data-driven decisions with comprehensive analytics and reporting features.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">
                  Keep your data safe with enterprise-grade security and compliance features.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Get help when you need it with our dedicated support team available around the clock.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trusted by Industry Leaders</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              See what our customers have to say about their experience with our platform.
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-lg">
            Join thousands of businesses already using our platform to streamline their operations.
          </p>
          <Button size="lg" className="mt-8">
            Start Your Free Trial
          </Button>
        </div>
      </section>
    </div>
  )
}

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO at TechCorp",
    content:
      "This platform has transformed how we manage our operations. The automation features alone have saved us countless hours every week.",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    content:
      "The real-time analytics have given us insights we never had before. It's helped us make better decisions and grow our business faster.",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content:
      "As a small business owner, this platform has been a game-changer. It's like having an extra team member handling all our operations.",
    avatar: "/placeholder.svg?height=48&width=48",
  },
]

