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
import { EmissionsManager } from './EmissionsManager'

interface EmissionData {
    id: number
    location: string
    co2Level: number
    noxLevel: number
    pmLevel: number
    vehicleType: string
    timestamp: string
}

export function EmissionsTable() {
    const [emissionsData, setEmissionsData] = useState<EmissionData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingData, setEditingData] = useState<EmissionData | undefined>()

    const fetchEmissionsData = async () => {
        try {
            const response = await fetch('/api/emissions')
            if (!response.ok) throw new Error('Failed to fetch emissions data')
            const data = await response.json()
            setEmissionsData(data)
        } catch (error) {
            toast.error('Failed to fetch emissions data')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchEmissionsData()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/emissions?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete emissions data')

            toast.success('Emissions data deleted successfully')
            fetchEmissionsData()
        } catch (error) {
            toast.error('Failed to delete emissions data')
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Emissions Data</h2>
                <div className="space-x-2">
                    <EmissionsManager onSuccess={fetchEmissionsData} />
                    {editingData && (
                        <EmissionsManager
                            onSuccess={() => {
                                fetchEmissionsData()
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
                            <TableHead>CO2 Level (ppm)</TableHead>
                            <TableHead>NOx Level (ppm)</TableHead>
                            <TableHead>PM Level (μg/m³)</TableHead>
                            <TableHead>Vehicle Type</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {emissionsData.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.location}</TableCell>
                                <TableCell>{data.co2Level}</TableCell>
                                <TableCell>{data.noxLevel}</TableCell>
                                <TableCell>{data.pmLevel}</TableCell>
                                <TableCell>{data.vehicleType}</TableCell>
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