"use client"

import { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { TrafficFlowManager } from './TrafficFlowManager'

interface TrafficFlow {
    id: number
    location: string
    flowRate: number
    direction: string
    laneCount: number
    timestamp: string
}

export function TrafficFlowTable() {
    const [trafficFlow, setTrafficFlow] = useState<TrafficFlow[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingData, setEditingData] = useState<TrafficFlow | undefined>()

    const fetchTrafficFlow = async () => {
        try {
            const response = await fetch('/api/traffic-flow')
            if (!response.ok) throw new Error('Failed to fetch traffic flow data')
            const data = await response.json()
            setTrafficFlow(data)
        } catch (error) {
            toast.error('Failed to fetch traffic flow data')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTrafficFlow()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/traffic-flow?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete traffic flow data')

            toast.success('Traffic flow data deleted successfully')
            fetchTrafficFlow()
        } catch (error) {
            toast.error('Failed to delete traffic flow data')
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Traffic Flow Data</h2>
                <div className="space-x-2">
                    <TrafficFlowManager onSuccess={fetchTrafficFlow} />
                    {editingData && (
                        <TrafficFlowManager
                            onSuccess={() => {
                                fetchTrafficFlow()
                                setEditingData(undefined)
                            }}
                            editData={editingData}
                        />
                    )}
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Location</TableHead>
                            <TableHead>Flow Rate (veh/hr)</TableHead>
                            <TableHead>Direction</TableHead>
                            <TableHead>Lane Count</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trafficFlow.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>{data.flowRate}</TableCell>
                                <TableCell>{data.direction}</TableCell>
                                <TableCell>{data.laneCount}</TableCell>
                                <TableCell>{new Date(data.timestamp).toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setEditingData(data)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleDelete(data.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
} 