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

interface EmissionData {
    id?: number
    location: string
    co2Level: number
    noxLevel: number
    pmLevel: number
    vehicleType: string
}

interface EmissionsManagerProps {
    onSuccess: () => void
    editData?: EmissionData
}

export function EmissionsManager({ onSuccess, editData }: EmissionsManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<EmissionData>({
        location: '',
        co2Level: 0,
        noxLevel: 0,
        pmLevel: 0,
        vehicleType: ''
    })

    useEffect(() => {
        if (editData) {
            setFormData(editData)
        }
    }, [editData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editData?.id ? `/api/emissions?id=${editData.id}` : '/api/emissions'
            const method = editData?.id ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error(`Failed to ${editData?.id ? 'update' : 'create'} emissions data`)

            toast.success(`Emissions data ${editData?.id ? 'updated' : 'created'} successfully`)
            setIsOpen(false)
            setFormData({
                location: '',
                co2Level: 0,
                noxLevel: 0,
                pmLevel: 0,
                vehicleType: ''
            })
            onSuccess()
        } catch (error) {
            toast.error(`Failed to ${editData?.id ? 'update' : 'create'} emissions data`)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={editData ? "outline" : "default"}>
                    {editData ? 'Edit Emissions' : 'Add Emissions'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? 'Edit Emissions' : 'Add Emissions'}</DialogTitle>
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
                        <Label htmlFor="co2Level">CO2 Level (ppm)</Label>
                        <Input
                            id="co2Level"
                            type="number"
                            step="0.01"
                            value={formData.co2Level}
                            onChange={(e) => setFormData({ ...formData, co2Level: parseFloat(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="noxLevel">NOx Level (ppm)</Label>
                        <Input
                            id="noxLevel"
                            type="number"
                            step="0.01"
                            value={formData.noxLevel}
                            onChange={(e) => setFormData({ ...formData, noxLevel: parseFloat(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="pmLevel">PM Level (μg/m³)</Label>
                        <Input
                            id="pmLevel"
                            type="number"
                            step="0.01"
                            value={formData.pmLevel}
                            onChange={(e) => setFormData({ ...formData, pmLevel: parseFloat(e.target.value) })}
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
                    <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 