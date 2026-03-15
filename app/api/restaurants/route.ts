import { NextResponse } from 'next/server'

import { restaurants } from '@/lib/restaurants'

export async function GET() {
  return NextResponse.json(
    { restaurants },
    {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400',
      },
    },
  )
}
