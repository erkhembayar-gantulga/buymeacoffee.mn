import { NextResponse } from 'next/server'
import { UserRepository } from '@/app/repositories/userRepository'
import { auth } from '@/auth'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await UserRepository.findByUsername(params.username)
    const session = await auth()

    if (!user) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: user.id,
      username: user.username,
      email: user.email,
      bio: user.bio || `${user.username} is a creator based in Mongolia.`,
      profileImage: user.profileImage,
      name: user.name,
      isOwnProfile: session?.user?.email === user.email
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
    
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { username, bio } = body

    // Verify user owns this profile
    const currentUser = await prisma.user.findUnique({
      where: { username: params.username }
    })

    if (!currentUser || currentUser.email !== session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check if new username is already taken (if changed)
    if (username !== params.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username }
      })

      if (existingUser) {
        return NextResponse.json({ error: "Username already taken" }, { status: 400 })
      }
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { username, bio }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to update user:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 