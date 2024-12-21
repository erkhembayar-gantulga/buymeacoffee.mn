import prisma from '@/lib/prisma'

export interface Comment {
  id: number
  username: string
  content: string
  createdAt: string
  author: {
    username: string
    name: string | null
    profileImage: string | null
  }
  creator: {
    username: string
    name: string | null
    profileImage: string | null
  }
}

export class CommentRepository {
  static async fetchComments(username: string): Promise<Comment[]> {
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
            username: true,
            name: true,
            profileImage: true
          }
        },
        author: {
          select: {
            username: true,
            name: true,
            profileImage: true
          }
        }
      }
    })

    return comments.map(comment => ({
      id: comment.id,
      username: comment.creator.username,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      author: comment.author,
      creator: comment.creator
    }))
  }

  static async getLatest(limit = 10): Promise<Comment[]> {
    const comments = await prisma.comment.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            username: true,
            name: true,
            profileImage: true
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

    return comments.map(comment => ({
      id: comment.id,
      username: comment.creator.username,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      author: comment.author,
      creator: comment.creator
    }))
  }
} 