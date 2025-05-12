import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

// GET /api/transport-modes
export async function GET() {
    try {
        const transportModes = await prisma.transportMode.findMany({
            orderBy: {
                timestamp: 'desc'
            },
            take: 100
        })
        return NextResponse.json(transportModes)
    } catch (error) {
        console.error('Error fetching transport modes:', error)
        return NextResponse.json({ error: 'Failed to fetch transport modes data' }, { status: 500 })
    }
}

// POST /api/transport-modes
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.location || !body.mode || body.count === undefined || body.percentage === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const transportMode = await prisma.transportMode.create({
            data: {
                location: body.location,
                mode: body.mode,
                count: parseInt(body.count),
                percentage: parseFloat(body.percentage)
            }
        })
        return NextResponse.json(transportMode)
    } catch (error) {
        console.error('Error creating transport mode:', error)
        return NextResponse.json({ error: 'Failed to create transport mode data' }, { status: 500 })
    }
}

// PUT /api/transport-modes
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const body = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Transport mode ID is required' }, { status: 400 })
        }

        // Validate required fields
        if (!body.location || !body.mode || body.count === undefined || body.percentage === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const transportMode = await prisma.transportMode.update({
            where: { id: parseInt(id) },
            data: {
                location: body.location,
                mode: body.mode,
                count: parseInt(body.count),
                percentage: parseFloat(body.percentage)
            }
        })
        return NextResponse.json(transportMode)
    } catch (error) {
        console.error('Error updating transport mode:', error)
        return NextResponse.json({ error: 'Failed to update transport mode data' }, { status: 500 })
    }
}

// DELETE /api/transport-modes
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Transport mode ID is required' }, { status: 400 })
        }

        await prisma.transportMode.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'Transport mode data deleted successfully' })
    } catch (error) {
        console.error('Error deleting transport mode:', error)
        return NextResponse.json({ error: 'Failed to delete transport mode data' }, { status: 500 })
    }
} 