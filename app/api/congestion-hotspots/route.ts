import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

// GET /api/congestion-hotspots
export async function GET() {
    try {
        const hotspots = await prisma.congestionHotspot.findMany({
            orderBy: {
                timestamp: 'desc'
            },
            take: 100
        })
        return NextResponse.json(hotspots)
    } catch (error) {
        console.error('Error fetching congestion hotspots:', error)
        return NextResponse.json({ error: 'Failed to fetch congestion hotspots data' }, { status: 500 })
    }
}

// POST /api/congestion-hotspots
export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.location || !body.severity || body.duration === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const hotspot = await prisma.congestionHotspot.create({
            data: {
                location: body.location,
                severity: body.severity,
                duration: parseInt(body.duration),
                cause: body.cause || null,
                status: body.status || 'ACTIVE'
            }
        })
        return NextResponse.json(hotspot)
    } catch (error) {
        console.error('Error creating congestion hotspot:', error)
        return NextResponse.json({ error: 'Failed to create congestion hotspot data' }, { status: 500 })
    }
}

// PUT /api/congestion-hotspots
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const body = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Congestion hotspot ID is required' }, { status: 400 })
        }

        // Validate required fields
        if (!body.location || !body.severity || body.duration === undefined) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const hotspot = await prisma.congestionHotspot.update({
            where: { id: parseInt(id) },
            data: {
                location: body.location,
                severity: body.severity,
                duration: parseInt(body.duration),
                cause: body.cause || null,
                status: body.status || 'ACTIVE'
            }
        })
        return NextResponse.json(hotspot)
    } catch (error) {
        console.error('Error updating congestion hotspot:', error)
        return NextResponse.json({ error: 'Failed to update congestion hotspot data' }, { status: 500 })
    }
}

// DELETE /api/congestion-hotspots
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Congestion hotspot ID is required' }, { status: 400 })
        }

        await prisma.congestionHotspot.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'Congestion hotspot data deleted successfully' })
    } catch (error) {
        console.error('Error deleting congestion hotspot:', error)
        return NextResponse.json({ error: 'Failed to delete congestion hotspot data' }, { status: 500 })
    }
} 