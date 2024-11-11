import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export class UserRepository {
  static async getCreators(limit: number = 10): Promise<User[]> {
    try {
      const users = await prisma.user.findMany({
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      })
      return users
    } catch (error) {
      console.error('Failed to fetch users:', error)
      return []
    }
  }
} 