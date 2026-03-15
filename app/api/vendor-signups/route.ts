import { NextResponse } from 'next/server'

import type { VendorSignupPayload } from '@/lib/restaurants'

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<VendorSignupPayload>

  if (!body.businessName || !body.location || !body.phoneNumber) {
    return NextResponse.json(
      { error: 'Business name, location, and phone number are required.' },
      { status: 400 },
    )
  }

  return NextResponse.json({
    ok: true,
    queued: false,
    receivedAt: new Date().toISOString(),
    signup: body,
  })
}
