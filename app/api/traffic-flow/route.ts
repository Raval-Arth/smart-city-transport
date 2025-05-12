import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

// GET /api/traffic-flow
export async function GET() {
    try {
        const trafficFlow = await prisma.trafficFlow.findMany({
            orderBy: {
                timestamp: 'desc'
            },
            take: 100
        })
        return NextResponse.json(trafficFlow)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch traffic flow data' }, { status: 500 })
    }
}

// POST /api/traffic-flow
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const trafficFlow = await prisma.trafficFlow.create({
            data: {
                location: body.location,
                flowRate: body.flowRate,
                direction: body.direction,
                laneCount: body.laneCount
            }
        })
        return NextResponse.json(trafficFlow)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create traffic flow data' }, { status: 500 })
    }
}

// PUT /api/traffic-flow
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const body = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Traffic flow ID is required' }, { status: 400 })
        }

        const trafficFlow = await prisma.trafficFlow.update({
            where: { id: parseInt(id) },
            data: {
                location: body.location,
                flowRate: body.flowRate,
                direction: body.direction,
                laneCount: body.laneCount
            }
        })
        return NextResponse.json(trafficFlow)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update traffic flow data' }, { status: 500 })
    }
}

// DELETE /api/traffic-flow
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Traffic flow ID is required' }, { status: 400 })
        }

        await prisma.trafficFlow.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'Traffic flow data deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete traffic flow data' }, { status: 500 })
    }
} 