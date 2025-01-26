import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { clientSecret } = await request.json()

  if (!clientSecret) {
    return NextResponse.json(
      { error: 'Client secret is required' },
      { status: 400 }
    )
  }

  // Mock confirmation response
  return NextResponse.json({
    paymentIntent: {
      id: clientSecret.replace('mock_', ''),
      status: 'succeeded',
      amount: 1000,
      currency: 'usd',
      client_secret: clientSecret
    }
  })
} 