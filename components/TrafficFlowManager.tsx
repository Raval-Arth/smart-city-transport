"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface TrafficFlow {
    id?: number
    location: string
    flowRate: number
    direction: string
    laneCount: number
}

interface TrafficFlowManagerProps {
    onSuccess: () => void
    editData?: TrafficFlow
}

export function TrafficFlowManager({ onSuccess, editData }: TrafficFlowManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<TrafficFlow>({
        location: '',
        flowRate: 0,
        direction: '',
        laneCount: 1
    })

    useEffect(() => {
        if (editData) {
            setFormData(editData)
        }
    }, [editData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editData?.id ? `/api/traffic-flow?id=${editData.id}` : '/api/traffic-flow'
            const method = editData?.id ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error(`Failed to ${editData?.id ? 'update' : 'create'} traffic flow data`)

            toast.success(`Traffic flow data ${editData?.id ? 'updated' : 'created'} successfully`)
            setIsOpen(false)
            setFormData({
                location: '',
                flowRate: 0,
                direction: '',
                laneCount: 1
            })
            onSuccess()
        } catch (error) {
            toast.error(`Failed to ${editData?.id ? 'update' : 'create'} traffic flow data`)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={editData ? "outline" : "default"}>
                    {editData ? 'Edit Traffic Flow' : 'Add Traffic Flow'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? 'Edit Traffic Flow' : 'Add Traffic Flow'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="flowRate">Flow Rate (vehicles/hour)</Label>
                        <Input
                            id="flowRate"
                            type="number"
                            value={formData.flowRate}
                            onChange={(e) => setFormData({ ...formData, flowRate: parseFloat(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="direction">Direction</Label>
                        <Input
                            id="direction"
                            value={formData.direction}
                            onChange={(e) => setFormData({ ...formData, direction: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="laneCount">Lane Count</Label>
                        <Input
                            id="laneCount"
                            type="number"
                            min="1"
                            value={formData.laneCount}
                            onChange={(e) => setFormData({ ...formData, laneCount: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 