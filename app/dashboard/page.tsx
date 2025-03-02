"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapIcon, CarIcon, LeafIcon, AlertCircleIcon } from "lucide-react"

// Sample data for charts
const trafficData = [
  { time: "6 AM", volume: 1200, congestion: 30 },
  { time: "8 AM", volume: 2800, congestion: 85 },
  { time: "10 AM", volume: 1800, congestion: 45 },
  { time: "12 PM", volume: 2000, congestion: 50 },
  { time: "2 PM", volume: 1900, congestion: 48 },
  { time: "4 PM", volume: 2500, congestion: 75 },
  { time: "6 PM", volume: 2700, congestion: 80 },
  { time: "8 PM", volume: 1500, congestion: 40 },
]

const emissionsData = [
  { month: "Jan", actual: 1200, predicted: 1400, reduced: 200 },
  { month: "Feb", actual: 1100, predicted: 1350, reduced: 250 },
  { month: "Mar", actual: 1300, predicted: 1500, reduced: 200 },
  { month: "Apr", actual: 1000, predicted: 1300, reduced: 300 },
  { month: "May", actual: 1150, predicted: 1400, reduced: 250 },
  { month: "Jun", actual: 1000, predicted: 1300, reduced: 300 },
]

const transportModeData = [
  { name: "Car", value: 55 },
  { name: "Public Transit", value: 25 },
  { name: "Bicycle", value: 10 },
  { name: "Walking", value: 8 },
  { name: "Other", value: 2 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const hotspotData = [
  { id: 1, location: "Main St & 5th Ave", congestion: 85, trend: "increasing" },
  { id: 2, location: "Broadway & 7th", congestion: 78, trend: "stable" },
  { id: 3, location: "Park Rd & Market St", congestion: 72, trend: "decreasing" },
  { id: 4, location: "University Ave", congestion: 65, trend: "increasing" },
]

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <h1 className="text-xl font-bold">Smart City Transportation Dashboard</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Select defaultValue="downtown">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downtown">Downtown</SelectItem>
                <SelectItem value="northside">North Side</SelectItem>
                <SelectItem value="eastside">East Side</SelectItem>
                <SelectItem value="westside">West Side</SelectItem>
                <SelectItem value="southside">South Side</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
            <Button>Settings</Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Traffic Analytics</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={selectedTimeframe === "today" ? "default" : "outline"}
                onClick={() => setSelectedTimeframe("today")}
              >
                Today
              </Button>
              <Button
                variant={selectedTimeframe === "week" ? "default" : "outline"}
                onClick={() => setSelectedTimeframe("week")}
              >
                This Week
              </Button>
              <Button
                variant={selectedTimeframe === "month" ? "default" : "outline"}
                onClick={() => setSelectedTimeframe("month")}
              >
                This Month
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Traffic Volume</CardTitle>
                <CarIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-muted-foreground">+5.2% from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
                <MapIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 mph</div>
                <p className="text-xs text-muted-foreground">-3.1% from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Congestion Level</CardTitle>
                <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">65%</div>
                <p className="text-xs text-muted-foreground">+12% from last hour</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CO2 Reduction</CardTitle>
                <LeafIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">248 kg</div>
                <p className="text-xs text-muted-foreground">+18.2% from yesterday</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="traffic" className="mb-6">
            <TabsList>
              <TabsTrigger value="traffic">Traffic Flow</TabsTrigger>
              <TabsTrigger value="emissions">Emissions</TabsTrigger>
              <TabsTrigger value="transport">Transport Modes</TabsTrigger>
              <TabsTrigger value="hotspots">Congestion Hotspots</TabsTrigger>
            </TabsList>
            <TabsContent value="traffic">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Flow Analysis</CardTitle>
                  <CardDescription>Hourly traffic volume and congestion levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={trafficData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="volume" stroke="#0088FE" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="congestion" stroke="#FF8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="emissions">
              <Card>
                <CardHeader>
                  <CardTitle>Carbon Emissions Analysis</CardTitle>
                  <CardDescription>Actual vs. predicted emissions and reduction achieved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={emissionsData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="predicted" fill="#8884d8" name="Predicted Emissions (kg)" />
                        <Bar dataKey="actual" fill="#82ca9d" name="Actual Emissions (kg)" />
                        <Bar dataKey="reduced" fill="#ffc658" name="Emissions Reduced (kg)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="transport">
              <Card>
                <CardHeader>
                  <CardTitle>Transport Mode Distribution</CardTitle>
                  <CardDescription>Breakdown of transportation methods used by commuters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={transportModeData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {transportModeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="hotspots">
              <Card>
                <CardHeader>
                  <CardTitle>Congestion Hotspots</CardTitle>
                  <CardDescription>Current traffic congestion hotspots and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 bg-muted p-4 text-sm font-medium">
                      <div className="col-span-1">#</div>
                      <div className="col-span-6">Location</div>
                      <div className="col-span-3">Congestion Level</div>
                      <div className="col-span-2">Trend</div>
                    </div>
                    {hotspotData.map((hotspot) => (
                      <div key={hotspot.id} className="grid grid-cols-12 border-t p-4 text-sm">
                        <div className="col-span-1">{hotspot.id}</div>
                        <div className="col-span-6">{hotspot.location}</div>
                        <div className="col-span-3">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                hotspot.congestion > 70
                                  ? "bg-red-600"
                                  : hotspot.congestion > 50
                                    ? "bg-yellow-400"
                                    : "bg-green-500"
                              }`}
                              style={{ width: `${hotspot.congestion}%` }}
                            ></div>
                          </div>
                          <span className="text-xs mt-1 inline-block">{hotspot.congestion}%</span>
                        </div>
                        <div className="col-span-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              hotspot.trend === "increasing"
                                ? "bg-red-100 text-red-800"
                                : hotspot.trend === "decreasing"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {hotspot.trend}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

