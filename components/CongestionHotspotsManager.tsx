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

interface CongestionHotspot {
    id?: number
    location: string
    severity: string
    description: string
}

interface CongestionHotspotsManagerProps {
    onSuccess: () => void
    editData?: CongestionHotspot
}

export function CongestionHotspotsManager({ onSuccess, editData }: CongestionHotspotsManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<CongestionHotspot>({
        location: '',
        severity: '',
        description: ''
    })

    useEffect(() => {
        if (editData) {
            setFormData(editData)
        }
    }, [editData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editData?.id ? `/api/congestion-hotspots?id=${editData.id}` : '/api/congestion-hotspots'
            const method = editData?.id ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error(`Failed to ${editData?.id ? 'update' : 'create'} congestion hotspot data`)

            toast.success(`Congestion hotspot data ${editData?.id ? 'updated' : 'created'} successfully`)
            setIsOpen(false)
            setFormData({
                location: '',
                severity: '',
                description: ''
            })
            onSuccess()
        } catch (error) {
            toast.error(`Failed to ${editData?.id ? 'update' : 'create'} congestion hotspot data`)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={editData ? "outline" : "default"}>
                    {editData ? 'Edit Congestion Hotspot' : 'Add Congestion Hotspot'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? 'Edit Congestion Hotspot' : 'Add Congestion Hotspot'}</DialogTitle>
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
                        <Label htmlFor="severity">Severity</Label>
                        <Input
                            id="severity"
                            value={formData.severity}
                            onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 