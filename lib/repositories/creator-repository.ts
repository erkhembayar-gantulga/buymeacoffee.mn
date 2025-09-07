import prisma from '@/lib/prisma'

export class CreatorRepository {
  static async getCreators(limit: number = 10) {
    return prisma.creator.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' }
    })
  }

  static async getById(id: number) {
    return prisma.creator.findUnique({ where: { id } })
  }

  static async findByUsername(username: string) {
    return prisma.creator.findUnique({ where: { username } })
  }

  static async findByUserId(userId: number) {
    return prisma.creator.findUnique({ where: { userId } })
  }
}