import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapIcon, BarChart3Icon, CarIcon, LeafIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground">
                Home
              </Link>
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                Dashboard
              </Link>
              <Link href="/commuter" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                Commuter App
              </Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80 text-muted-foreground">
                About
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  AI-Powered Transportation for Smarter Cities
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Reducing congestion, optimizing routes, and decreasing carbon emissions through intelligent traffic
                  management and predictive analytics.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    View Dashboard
                  </Button>
                  <Button size="lg" variant="outline">
                    Commuter App
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 lg:ml-auto">
                <div className="aspect-video overflow-hidden rounded-xl">
                  <img
                    alt="Smart city traffic visualization"
                    className="object-cover w-full h-full"
                    src="/placeholder.svg?height=500&width=800"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-driven platform offers comprehensive solutions for transportation challenges in urban
                  environments
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <Card>
                <CardHeader className="pb-2">
                  <MapIcon className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Real-time Traffic Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Process data from sensors, cameras, and connected vehicles to create a real-time traffic map.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <BarChart3Icon className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Predictive Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Forecast traffic patterns using historical data and machine learning algorithms.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CarIcon className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Dynamic Routing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Optimize commuter routes in real-time based on current traffic conditions and predictions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <LeafIcon className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Emissions Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Track and reduce carbon emissions through optimized traffic flow and reduced idling time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Smart City Transportation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

