"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MapIcon, CarIcon, BusIcon, BikeIcon, ClockIcon, LeafIcon, AlertCircleIcon, ArrowRightIcon } from "lucide-react"

// Sample route options
const routeOptions = [
  {
    id: 1,
    mode: "car",
    duration: 28,
    distance: 8.2,
    emissions: 2.1,
    congestion: "moderate",
    departureTime: "Now",
    arrivalTime: "8:28 AM",
  },
  {
    id: 2,
    mode: "transit",
    duration: 35,
    distance: 8.5,
    emissions: 0.8,
    congestion: "low",
    departureTime: "8:05 AM",
    arrivalTime: "8:40 AM",
    transitDetails: [
      { type: "walk", duration: 5, description: "Walk to bus stop" },
      { type: "bus", duration: 15, description: "Bus 42 - 10 stops" },
      { type: "walk", duration: 2, description: "Transfer" },
      { type: "train", duration: 8, description: "Blue Line - 3 stops" },
      { type: "walk", duration: 5, description: "Walk to destination" },
    ],
  },
  {
    id: 3,
    mode: "bike",
    duration: 42,
    distance: 7.8,
    emissions: 0,
    congestion: "none",
    departureTime: "Now",
    arrivalTime: "8:42 AM",
  },
]

export default function CommuterPage() {
  const [origin, setOrigin] = useState("123 Home St")
  const [destination, setDestination] = useState("456 Work Ave")
  const [selectedRoute, setSelectedRoute] = useState(1)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Smart Commuter</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost">History</Button>
            <Button variant="ghost">Favorites</Button>
            <Button variant="outline">Profile</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <div className="container max-w-5xl">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Plan Your Journey</CardTitle>
              <CardDescription>Find the most efficient route to your destination</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="origin">Origin</Label>
                    <div className="flex">
                      <Input
                        id="origin"
                        placeholder="Enter starting point"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                      />
                      <Button variant="ghost" className="ml-2">
                        <MapIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="flex">
                      <Input
                        id="destination"
                        placeholder="Enter destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                      <Button variant="ghost" className="ml-2">
                        <MapIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button>Depart Now</Button>
                  <Button variant="outline">Schedule</Button>
                  <div className="ml-auto flex gap-2">
                    <Button variant="outline" size="icon">
                      <CarIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <BusIcon className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <BikeIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Route Options</CardTitle>
                  <CardDescription>AI-optimized routes based on current conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    defaultValue={selectedRoute.toString()}
                    onValueChange={(value) => setSelectedRoute(Number.parseInt(value))}
                  >
                    {routeOptions.map((route) => (
                      <div key={route.id} className="flex items-center space-x-2 mb-4">
                        <RadioGroupItem value={route.id.toString()} id={`route-${route.id}`} />
                        <Label htmlFor={`route-${route.id}`} className="flex-1 cursor-pointer">
                          <div className="flex items-center">
                            {route.mode === "car" && <CarIcon className="h-4 w-4 mr-2" />}
                            {route.mode === "transit" && <BusIcon className="h-4 w-4 mr-2" />}
                            {route.mode === "bike" && <BikeIcon className="h-4 w-4 mr-2" />}
                            <span className="font-medium">
                              {route.mode === "car" ? "Drive" : route.mode === "transit" ? "Transit" : "Bike"}
                            </span>
                            <span className="ml-auto text-sm text-muted-foreground">{route.duration} min</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {route.distance} miles • {route.departureTime} → {route.arrivalTime}
                          </div>
                          <div className="flex items-center mt-1">
                            <LeafIcon className="h-3 w-3 mr-1 text-green-600" />
                            <span className="text-xs text-green-600">{route.emissions} kg CO₂</span>
                            {route.congestion !== "none" && (
                              <>
                                <AlertCircleIcon
                                  className={`h-3 w-3 ml-2 mr-1 ${
                                    route.congestion === "high"
                                      ? "text-red-600"
                                      : route.congestion === "moderate"
                                        ? "text-yellow-600"
                                        : "text-blue-600"
                                  }`}
                                />
                                <span
                                  className={`text-xs ${
                                    route.congestion === "high"
                                      ? "text-red-600"
                                      : route.congestion === "moderate"
                                        ? "text-yellow-600"
                                        : "text-blue-600"
                                  }`}
                                >
                                  {route.congestion} traffic
                                </span>
                              </>
                            )}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Route Details</CardTitle>
                  <CardDescription>
                    {routeOptions.find((r) => r.id === selectedRoute)?.mode === "car"
                      ? "Driving"
                      : routeOptions.find((r) => r.id === selectedRoute)?.mode === "transit"
                        ? "Public Transit"
                        : "Cycling"}{" "}
                    directions
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] relative">
                  <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="text-center">
                        <MapIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">Interactive map would display here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex-col items-start">
                  <div className="w-full">
                    <h3 className="font-medium mb-2">Journey Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          Total Time
                        </span>
                        <span>{routeOptions.find((r) => r.id === selectedRoute)?.duration} minutes</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <MapIcon className="h-4 w-4 mr-2" />
                          Distance
                        </span>
                        <span>{routeOptions.find((r) => r.id === selectedRoute)?.distance} miles</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <LeafIcon className="h-4 w-4 mr-2" />
                          CO₂ Emissions
                        </span>
                        <span>{routeOptions.find((r) => r.id === selectedRoute)?.emissions} kg</span>
                      </div>
                    </div>

                    {routeOptions.find((r) => r.id === selectedRoute)?.mode === "transit" && (
                      <div className="mt-4">
                        <h3 className="font-medium mb-2">Transit Details</h3>
                        <div className="space-y-2">
                          {routeOptions
                            .find((r) => r.id === selectedRoute)
                            ?.transitDetails?.map((step, index) => (
                              <div key={index} className="flex items-start">
                                {step.type === "walk" && (
                                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 mt-0.5">
                                    🚶
                                  </div>
                                )}
                                {step.type === "bus" && (
                                  <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">
                                    B
                                  </div>
                                )}
                                {step.type === "train" && (
                                  <div className="h-6 w-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mr-2 mt-0.5 text-xs font-bold">
                                    T
                                  </div>
                                )}
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{step.description}</div>
                                  <div className="text-xs text-muted-foreground">{step.duration} min</div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    <Button className="w-full mt-4">
                      Start Navigation
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

