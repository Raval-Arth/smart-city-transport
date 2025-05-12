"use client"

import { useState } from 'react'
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

interface TrafficData {
    id?: number
    location: string
    vehicleType: string
    count: number
    speed?: number
    congestion?: number
}

interface TrafficDataManagerProps {
    onSuccess: () => void
    editData?: TrafficData
}

export function TrafficDataManager({ onSuccess, editData }: TrafficDataManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<TrafficData>({
        location: '',
        vehicleType: '',
        count: 0,
        speed: 0,
        congestion: 0
    })

    // Update form when editData changes
    useState(() => {
        if (editData) {
            setFormData(editData)
        }
    }, [editData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editData?.id ? `/api/traffic?id=${editData.id}` : '/api/traffic'
            const method = editData?.id ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error(`Failed to ${editData?.id ? 'update' : 'create'} traffic data`)

            toast.success(`Traffic data ${editData?.id ? 'updated' : 'created'} successfully`)
            setIsOpen(false)
            setFormData({
                location: '',
                vehicleType: '',
                count: 0,
                speed: 0,
                congestion: 0
            })
            onSuccess()
        } catch (error) {
            toast.error(`Failed to ${editData?.id ? 'update' : 'create'} traffic data`)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={editData ? "outline" : "default"}>
                    {editData ? 'Edit Traffic Data' : 'Add New Traffic Data'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? 'Edit Traffic Data' : 'Add Traffic Data'}</DialogTitle>
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
                        <Label htmlFor="vehicleType">Vehicle Type</Label>
                        <Input
                            id="vehicleType"
                            value={formData.vehicleType}
                            onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="count">Count</Label>
                        <Input
                            id="count"
                            type="number"
                            value={formData.count}
                            onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="speed">Speed (km/h)</Label>
                        <Input
                            id="speed"
                            type="number"
                            value={formData.speed}
                            onChange={(e) => setFormData({ ...formData, speed: parseFloat(e.target.value) })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="congestion">Congestion Level (0-100)</Label>
                        <Input
                            id="congestion"
                            type="number"
                            min="0"
                            max="100"
                            value={formData.congestion}
                            onChange={(e) => setFormData({ ...formData, congestion: parseFloat(e.target.value) })}
                        />
                    </div>
                    <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 