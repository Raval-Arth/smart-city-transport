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
import { TransportModesManager } from './TransportModesManager'

interface TransportMode {
    id: number
    mode: string
    count: number
    location: string
    timestamp: string
}

export function TransportModesTable() {
    const [transportModes, setTransportModes] = useState<TransportMode[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [editingData, setEditingData] = useState<TransportMode | undefined>()

    const fetchTransportModes = async () => {
        try {
            const response = await fetch('/api/transport-modes')
            if (!response.ok) throw new Error('Failed to fetch transport modes data')
            const data = await response.json()
            setTransportModes(data)
        } catch (error) {
            toast.error('Failed to fetch transport modes data')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTransportModes()
    }, [])

    const handleDelete = async (id: number) => {
        try {
            const response = await fetch(`/api/transport-modes?id=${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete transport mode data')

            toast.success('Transport mode data deleted successfully')
            fetchTransportModes()
        } catch (error) {
            toast.error('Failed to delete transport mode data')
        }
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Transport Modes Data</h2>
                <div className="space-x-2">
                    <TransportModesManager onSuccess={fetchTransportModes} />
                    {editingData && (
                        <TransportModesManager
                            onSuccess={() => {
                                fetchTransportModes()
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
                            <TableHead>Mode</TableHead>
                            <TableHead>Count</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transportModes.map((data) => (
                            <TableRow key={data.id}>
                                <TableCell>{data.mode}</TableCell>
                                <TableCell>{data.count}</TableCell>
                                <TableCell>{data.location}</TableCell>
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