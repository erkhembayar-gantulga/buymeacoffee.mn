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

  static async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { username }
      });
      return user;
    } catch (error) {
      console.error('Failed to fetch creator data:', error);
      return null;
    }
  }
} 