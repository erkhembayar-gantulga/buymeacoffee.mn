import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const creator = await prisma.creator.findUnique({
      where: { username: params.username }
    })
    const session = await auth()

    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: creator.id,
      username: creator.username,
      email: null,
      bio: creator.bio,
      profileImage: creator.profileImage,
      name: creator.name,
      isOwnProfile: !!session?.user?.id && session.user.id === creator.userId
    })
  } catch (error) {
    console.error('Failed to fetch creator data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch creator data' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { username, bio, name, profileImage } = body

    // Verify ownership via creator.userId
    const creator = await prisma.creator.findUnique({
      where: { username: params.username }
    })
    if (!creator || creator.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check username uniqueness if changed
    if (username && username !== params.username) {
      const existing = await prisma.creator.findUnique({ where: { username } })
      if (existing && existing.id !== creator.id) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 })
      }
    }

    const updated = await prisma.creator.update({
      where: { id: creator.id },
      data: { username: username ?? creator.username, bio, name, profileImage }
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error('Failed to update creator:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 