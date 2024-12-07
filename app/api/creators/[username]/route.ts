import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: params.username }
    })

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
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
        return new NextResponse("Username already taken", { status: 400 })
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