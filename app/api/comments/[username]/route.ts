import { NextResponse } from 'next/server'
import { CommentRepository } from '@/lib/repositories/comment-repository'

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
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