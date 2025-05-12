import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/alerts
export async function GET() {
    try {
        const alerts = await prisma.trafficAlert.findMany({
            where: {
                status: 'ACTIVE'
            },
            orderBy: {
                timestamp: 'desc'
            }
        })
        return NextResponse.json(alerts)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 })
    }
}

// POST /api/alerts
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const alert = await prisma.trafficAlert.create({
            data: {
                location: body.location,
                type: body.type,
                severity: body.severity,
                description: body.description
            }
        })
        return NextResponse.json(alert)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 })
    }
}

// PATCH /api/alerts/:id
export async function PATCH(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const body = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Alert ID is required' }, { status: 400 })
        }

        const alert = await prisma.trafficAlert.update({
            where: { id: parseInt(id) },
            data: {
                status: body.status
            }
        })
        return NextResponse.json(alert)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update alert' }, { status: 500 })
    }
} 