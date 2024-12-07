import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { username, bio } = body

    // Check if username is already taken
    const existingUser = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUser) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Update user record with creator info
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        username,
        bio,
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Failed to create creator:', error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
} 