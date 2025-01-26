import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { amount, creatorId, name, message } = await request.json()

    // Validation (mirror Stripe's client-side validation)
    if (!amount || typeof amount !== 'number' || amount < 50) {
      return NextResponse.json(
        { error: 'Amount must be at least $0.50' },
        { status: 400 }
      )
    }

    if (!creatorId) {
      return NextResponse.json(
        { error: 'Creator ID is required' },
        { status: 400 }
      )
    }

    // Verify creator exists
    const creator = await prisma.creator.findUnique({
      where: { id: creatorId }
    })

    if (!creator) {
      return NextResponse.json(
        { error: 'Creator not found' },
        { status: 404 }
      )
    }

    // Create mock payment intent
    const mockPaymentIntent = {
      id: `mock_pi_${uuidv4()}`,
      client_secret: `mock_${uuidv4()}`,
      amount,
      status: 'succeeded',
      currency: 'usd',
      creator_id: creatorId,
      metadata: {
        name,
        message
      }
    }

    // Store mock transaction in database
    await prisma.payment.create({
      data: {
        amount: amount / 100, // Store in dollars
        currency: 'USD',
        paymentIntentId: mockPaymentIntent.id,
        status: 'SUCCEEDED',
        creatorId: creatorId,
        name,
        message
      }
    })

    return NextResponse.json(
      { clientSecret: mockPaymentIntent.client_secret },
      { status: 201 }
    )

  } catch (error) {
    console.error('Mock payment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
