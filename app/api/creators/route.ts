import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const parsed = limitParam ? parseInt(limitParam, 10) : 10
    const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 50) : 10

    const creators = await prisma.creator.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        username: true,
        name: true,
        profileImage: true,
      }
    })

    return NextResponse.json(creators)
  } catch (error) {
    console.error('Failed to list creators:', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { username, bio, name, profileImage } = body

    // Check if username is already taken by a Creator
    const existingCreator = await prisma.creator.findUnique({
      where: { username }
    })

    if (existingCreator) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Upsert creator for this user
    const creator = await prisma.creator.upsert({
      where: { userId: session.user.id },
      update: { username, bio, name, profileImage },
      create: {
        userId: session.user.id,
        username,
        bio,
        name,
        profileImage,
        email: null
      }
    })

    return NextResponse.json(creator)
  } catch (error) {
    console.error('Failed to create creator:', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 