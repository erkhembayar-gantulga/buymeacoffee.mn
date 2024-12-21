import prisma from '@/lib/prisma'

export interface Comment {
  id: number
  username: string
  content: string
  createdAt: string
}

export class CommentRepository {
  static async fetchComments(username: string): Promise<Comment[]> {
    console.log('fetching comments for', username)
    const comments = await prisma.comment.findMany({
      where: {
        creator: {
          username: username
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        creator: {
          select: {
            username: true
          }
        }
      }
    })

    return comments.map(comment => ({
      id: comment.id,
      username: comment.creator.username,
      content: comment.content,
      createdAt: comment.createdAt.toISOString()
    }))
  }
} 