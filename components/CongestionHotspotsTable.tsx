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
import { CongestionHotspotsManager } from './CongestionHotspotsManager'

interface CongestionHotspot {
    id: number
    location: string
    severity: string
    description: string
    timestamp: string
}

export function CongestionHotspotsTable() {
    const [hotspots, setHotspots] = useState<CongestionHotspot[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingData, setEditingData] = useState<CongestionHotspot | undefined>()

    const fetchHotspots = async () => {
        try {
            const response = await fetch('/api/congestion-hotspots')
            if (!response.ok) throw new Error('Failed to fetch congestion hotspots data')
            const data = await response.json()
            setHotspots(data)
        } catch (error) {
            toast.error('Failed to fetch congestion hotspots data')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchHotspots()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/congestion-hotspots?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete congestion hotspot data')

            toast.success('Congestion hotspot data deleted successfully')
            fetchHotspots()
        } catch (error) {
            toast.error('Failed to delete congestion hotspot data')
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Congestion Hotspots Data</h2>
                <div className="space-x-2">
                    <CongestionHotspotsManager onSuccess={fetchHotspots} />
                    {editingData && (
                        <CongestionHotspotsManager
                            onSuccess={() => {
                                fetchHotspots()
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
                            <TableHead>Severity</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hotspots.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>{data.severity}</TableCell>
                                <TableCell>{data.description}</TableCell>
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