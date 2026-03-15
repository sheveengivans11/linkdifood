import Link from 'next/link'
import { WifiOff } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-emerald-50 via-white to-amber-50 px-4 py-10">
      <Card className="w-full max-w-md rounded-3xl border-0 py-0 text-center shadow-md">
        <CardContent className="space-y-5 p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <WifiOff className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-slate-900">You&apos;re offline</h1>
            <p className="text-sm text-slate-600">
              Linkdifood can&apos;t reach the network right now. Reconnect and try again, or head
              back to the home page once service returns.
            </p>
          </div>
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href="/">Go Home</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
