'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface OfferBannerProps {
  onOrderClick?: () => void
}

export function OfferBanner({ onOrderClick }: OfferBannerProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const seen = window.sessionStorage.getItem('linkdifood_offer_seen')
    if (!seen) {
      setOpen(true)
    }
  }, [])

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen)
    if (!nextOpen && typeof window !== 'undefined') {
      window.sessionStorage.setItem('linkdifood_offer_seen', 'true')
    }
  }

  function handleOrderClick() {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('linkdifood_offer_seen', 'true')
    }
    setOpen(false)
    onOrderClick?.()
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton
        className="max-w-[calc(100%-1.5rem)] overflow-hidden rounded-[2rem] border-0 bg-transparent p-0 shadow-none sm:max-w-xl"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#082f49_0%,#0f766e_38%,#16a34a_100%)] p-6 shadow-[0_28px_70px_-30px_rgba(8,47,73,0.8)]">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300/20" />
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />
          <div className="absolute right-4 top-4 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-amber-950">
            20% OFF
          </div>
          <div className="relative z-10">
            <p className="text-sm font-medium text-emerald-100">Today&apos;s Special</p>
            <h3 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Linkdifood, lighten di mood.
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-6 text-white/82">
              First-time linkups get a smoother start. Use code <span className="font-bold text-amber-200">VIBES20</span> for a launch-day discount on pickup orders.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="secondary"
                className="border-0 bg-white text-slate-900 hover:bg-white/90"
                onClick={handleOrderClick}
              >
                Order Now
              </Button>
              <Button
                variant="ghost"
                className="border border-white/20 bg-white/10 text-white hover:bg-white/15"
                onClick={() => handleOpenChange(false)}
              >
                Maybe later
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
