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
import { TrafficDataManager } from './TrafficDataManager'
import { toast } from "sonner"
import { Pencil, Trash2 } from "lucide-react"

interface TrafficData {
    id: number
    location: string
    vehicleType: string
    count: number
    speed?: number
    congestion?: number
    timestamp: string
}

export function TrafficDataTable() {
    const [trafficData, setTrafficData] = useState<TrafficData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingData, setEditingData] = useState<TrafficData | undefined>()

    const fetchTrafficData = async () => {
        try {
            const response = await fetch('/api/traffic')
            if (!response.ok) throw new Error('Failed to fetch traffic data')
            const data = await response.json()
            setTrafficData(data)
        } catch (error) {
            toast.error('Failed to fetch traffic data')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTrafficData()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/traffic?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete traffic data')

            toast.success('Traffic data deleted successfully')
            fetchTrafficData() // Refresh the data
        } catch (error) {
            toast.error('Failed to delete traffic data')
        }
    }

    const handleEdit = (data: TrafficData) => {
        setEditingData(data)
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Traffic Data</h2>
                <div className="space-x-2">
                    <TrafficDataManager onSuccess={fetchTrafficData} />
                    {editingData && (
                        <TrafficDataManager
                            onSuccess={() => {
                                fetchTrafficData()
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
                            <TableHead>Vehicle Type</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Speed (km/h)</TableHead>
                            <TableHead>Congestion</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {trafficData.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>{data.vehicleType}</TableCell>
                                <TableCell>{data.count}</TableCell>
                                <TableCell>{data.speed || 'N/A'}</TableCell>
                                <TableCell>{data.congestion || 'N/A'}</TableCell>
                                <TableCell>{new Date(data.timestamp).toLocaleString()}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleEdit(data)}
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