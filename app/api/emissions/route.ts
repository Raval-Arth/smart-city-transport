import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

// GET /api/emissions
export async function GET() {
    try {
        const emissions = await prisma.emissionData.findMany({
            orderBy: {
                timestamp: 'desc'
            },
            take: 100
        })
        return NextResponse.json(emissions)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch emissions data' }, { status: 500 })
    }
}

// POST /api/emissions
export async function POST(request: Request) {
    try {
        const body = await request.json()
        const emission = await prisma.emissionData.create({
            data: {
                location: body.location,
                co2Level: body.co2Level,
                noxLevel: body.noxLevel,
                pmLevel: body.pmLevel,
                vehicleType: body.vehicleType
            }
        })
        return NextResponse.json(emission)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create emissions data' }, { status: 500 })
    }
}

// PUT /api/emissions
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')
        const body = await request.json()

        if (!id) {
            return NextResponse.json({ error: 'Emission ID is required' }, { status: 400 })
        }

        const emission = await prisma.emissionData.update({
            where: { id: parseInt(id) },
            data: {
                location: body.location,
                co2Level: body.co2Level,
                noxLevel: body.noxLevel,
                pmLevel: body.pmLevel,
                vehicleType: body.vehicleType
            }
        })
        return NextResponse.json(emission)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update emissions data' }, { status: 500 })
    }
}

// DELETE /api/emissions
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ error: 'Emission ID is required' }, { status: 400 })
        }

        await prisma.emissionData.delete({
            where: { id: parseInt(id) }
        })

        return NextResponse.json({ message: 'Emission data deleted successfully' })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete emissions data' }, { status: 500 })
    }
} 