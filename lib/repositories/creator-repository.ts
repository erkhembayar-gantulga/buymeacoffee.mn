import prisma from '@/lib/prisma'

export const getCreatorById = async (id: number) => {
  return prisma.creator.findUnique({
    where: { id }
  })
} 