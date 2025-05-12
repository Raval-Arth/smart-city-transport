import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

// This would be replaced with actual ML model predictions in production
async function predictTrafficFlow(area: string, time: string) {
  // Simulate ML model prediction
  const baseVolume = 2000
  const randomFactor = Math.random() * 1000 - 500

  // Different areas have different baseline traffic
  const areaMultiplier =
    {
      downtown: 1.5,
      northside: 0.8,
      eastside: 1.2,
      westside: 1.0,
      southside: 0.9,
    }[area] || 1.0

  // Time of day affects traffic volume
  const timeMultiplier =
    {
      morning: 1.8, // Morning rush hour
      midday: 1.0, // Midday
      evening: 1.7, // Evening rush hour
      night: 0.4, // Night
    }[time] || 1.0

  const trafficVolume = Math.round((baseVolume + randomFactor) * areaMultiplier * timeMultiplier)

  // Calculate congestion level (0-100)
  const congestionLevel = Math.min(100, Math.round(trafficVolume / 40))

  return {
    volume: trafficVolume,
    congestion: congestionLevel,
    predictedDuration: Math.round(15 + congestionLevel / 10),
    recommendations: generateRecommendations(congestionLevel),
  }
}

function generateRecommendations(congestionLevel: number) {
  if (congestionLevel > 80) {
    return [
      "Consider using public transportation",
      "Delay travel by 30 minutes if possible",
      "Use alternative routes via side streets",
    ]
  } else if (congestionLevel > 50) {
    return ["Expect moderate delays", "Consider carpooling", "Check for road construction"]
  } else {
    return ["Traffic flowing smoothly", "Good time for travel", "No significant delays expected"]
  }
}

// GET /api/traffic
export async function GET() {
  try {
    const trafficData = await prisma.trafficData.findMany({
      orderBy: {
        timestamp: 'desc'
      },
      take: 100
    })
    return NextResponse.json(trafficData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch traffic data' }, { status: 500 })
  }
}

// POST /api/traffic
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const trafficData = await prisma.trafficData.create({
      data: {
        location: body.location,
        vehicleType: body.vehicleType,
        count: body.count,
        speed: body.speed,
        congestion: body.congestion
      }
    })
    return NextResponse.json(trafficData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create traffic data' }, { status: 500 })
  }
}

// PUT /api/traffic
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()

    if (!id) {
      return NextResponse.json({ error: 'Traffic data ID is required' }, { status: 400 })
    }

    const trafficData = await prisma.trafficData.update({
      where: { id: parseInt(id) },
      data: {
        location: body.location,
        vehicleType: body.vehicleType,
        count: body.count,
        speed: body.speed,
        congestion: body.congestion
      }
    })
    return NextResponse.json(trafficData)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update traffic data' }, { status: 500 })
  }
}

// DELETE /api/traffic
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Traffic data ID is required' }, { status: 400 })
    }

    await prisma.trafficData.delete({
      where: { id: parseInt(id) }
    })

    return NextResponse.json({ message: 'Traffic data deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete traffic data' }, { status: 500 })
  }
}

