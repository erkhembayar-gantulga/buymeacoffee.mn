import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { content, creatorId, amount } = body

    if (!content?.trim() || content.length > 500) {
      return NextResponse.json(
        { error: "Invalid comment content" }, 
        { status: 400 }
      )
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        amount,
        authorId: session.user.id,
        creatorId,
      },
    })

    return NextResponse.json(comment)
  } catch (error) {
    console.error('Failed to create comment:', error)
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    )
  }
}