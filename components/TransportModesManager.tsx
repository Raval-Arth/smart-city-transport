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

interface TransportMode {
    id?: number
    mode: string
    count: number
    location: string
}

interface TransportModesManagerProps {
    onSuccess: () => void
    editData?: TransportMode
}

export function TransportModesManager({ onSuccess, editData }: TransportModesManagerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<TransportMode>({
        mode: '',
        count: 0,
        location: ''
    })

    useEffect(() => {
        if (editData) {
            setFormData(editData)
        }
    }, [editData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const url = editData?.id ? `/api/transport-modes?id=${editData.id}` : '/api/transport-modes'
            const method = editData?.id ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) throw new Error(`Failed to ${editData?.id ? 'update' : 'create'} transport mode data`)

            toast.success(`Transport mode data ${editData?.id ? 'updated' : 'created'} successfully`)
            setIsOpen(false)
            setFormData({
                mode: '',
                count: 0,
                location: ''
            })
            onSuccess()
        } catch (error) {
            toast.error(`Failed to ${editData?.id ? 'update' : 'create'} transport mode data`)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={editData ? "outline" : "default"}>
                    {editData ? 'Edit Transport Mode' : 'Add Transport Mode'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{editData ? 'Edit Transport Mode' : 'Add Transport Mode'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="mode">Mode</Label>
                        <Input
                            id="mode"
                            value={formData.mode}
                            onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="count">Count</Label>
                        <Input
                            id="count"
                            type="number"
                            min="0"
                            value={formData.count}
                            onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) })}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            required
                        />
                    </div>
                    <Button type="submit">{editData ? 'Update' : 'Submit'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
} 