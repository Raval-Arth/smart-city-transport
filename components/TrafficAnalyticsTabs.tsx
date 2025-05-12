"use client"

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrafficFlowTable } from './TrafficFlowTable'
import { EmissionsTable } from './EmissionsTable'
import { TransportModesTable } from './TransportModesTable'
import { CongestionHotspotsTable } from './CongestionHotspotsTable'

export function TrafficAnalyticsTabs() {
    const [activeTab, setActiveTab] = useState("traffic-flow")

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="traffic-flow">Traffic Flow</TabsTrigger>
                <TabsTrigger value="emissions">Emissions</TabsTrigger>
                {/* <TabsTrigger value="transport-modes">Transport Modes</TabsTrigger>
                <TabsTrigger value="congestion">Congestion Hotspots</TabsTrigger> */}
            </TabsList>
            <TabsContent value="traffic-flow">
                <TrafficFlowTable />
            </TabsContent>
            <TabsContent value="emissions">
                <EmissionsTable />
            </TabsContent>
            <TabsContent value="transport-modes">
                <TransportModesTable />
            </TabsContent>
            <TabsContent value="congestion">
                <CongestionHotspotsTable />
            </TabsContent>
        </Tabs>
    )
} 