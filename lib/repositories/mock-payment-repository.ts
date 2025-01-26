import prisma from '@/lib/prisma'

export const createPayment = async (data: {
  amount: number
  currency: string
  paymentIntentId: string
  status: string
  creatorId: number
  name?: string
  message?: string
}) => {
  return prisma.payment.create({
    data: {
      ...data,
      amount: data.amount / 100
    }
  })
} 