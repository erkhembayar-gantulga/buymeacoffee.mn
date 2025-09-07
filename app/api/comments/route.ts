import { auth } from "@/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const parsed = limitParam ? parseInt(limitParam, 10) : 10
    const limit = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 1), 50) : 10

    const comments = await prisma.comment.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            name: true,
            profileImage: true,
          }
        },
        creator: {
          select: {
            username: true,
            name: true,
            profileImage: true,
          }
        }
      }
    })

    const normalized = comments.map((c: {
      id: number
      content: string
      createdAt: Date
      author: { username: string; name: string | null; profileImage: string | null }
      creator: { username: string; name: string | null; profileImage: string | null }
    }) => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt.toISOString(),
      author: c.author,
      creator: c.creator,
    }))

    return NextResponse.json(normalized)
  } catch (error) {
    console.error('Failed to list latest comments:', error)
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
    const { content, creatorId, amount } = body

    if (!content?.trim() || content.length > 500) {
      return NextResponse.json(
        { error: "Invalid comment content" }, 
        { status: 400 }
      )
    }

    // creatorId now references Creator.id
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