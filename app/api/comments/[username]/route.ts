import { NextResponse } from 'next/server'
import { CommentRepository } from '@/lib/repositories/comment-repository'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    // ensure creator exists with this username
    const creator = await prisma.creator.findUnique({ where: { username: params.username } })
    if (!creator) {
      return NextResponse.json({ error: 'Creator not found' }, { status: 404 })
    }
    const comments = await CommentRepository.fetchComments(params.username)
    return NextResponse.json(comments)
  } catch (error) {
    console.error('Failed to fetch comments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
} 