'use client'

import Image from 'next/image'
import { Bell, Flag, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  onNotificationsClick?: () => void
  onReportClick?: () => void
  onBrandClick?: () => void
  onLocationClick?: () => void
  locationLabel?: string
  locationDescription?: string
}

export function Header({
  onNotificationsClick,
  onReportClick,
  onBrandClick,
  onLocationClick,
  locationLabel = 'Kingston, Jamaica',
  locationDescription = 'Fast lunch picks and evening link-up spots',
}: HeaderProps) {
  return (
    <header className="sticky top-4 z-40">
      <div className="glass-panel flex items-start justify-between gap-3 px-3 py-3 sm:items-center sm:gap-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onBrandClick}
            aria-label="Go to home"
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] bg-white shadow-[0_18px_35px_-22px_rgba(15,23,42,0.18)] ring-1 ring-emerald-100 sm:h-12 sm:w-12 sm:rounded-[1.35rem]"
          >
            <Image
              src="/icon.svg"
              alt="Linkdifood logo"
              width={48}
              height={48}
              className="h-full w-full object-cover"
              priority
            />
          </button>
          <button
            type="button"
            onClick={onLocationClick}
            className="min-w-0 text-left"
            aria-label="Jump to nearby restaurants"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 sm:text-[11px] sm:tracking-[0.24em]">Current vibe</p>
            <div className="mt-1 flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0 text-emerald-700" />
              <span className="truncate text-sm font-semibold text-slate-900">{locationLabel}</span>
            </div>
            <p className="hidden text-sm text-slate-500 sm:block">{locationDescription}</p>
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" onClick={onReportClick} aria-label="Report an issue">
            <Flag className="h-5 w-5 text-slate-700" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={onNotificationsClick}
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5 text-slate-700" />
            <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-amber-400 ring-4 ring-white" />
          </Button>
        </div>
      </div>
    </header>
  )
}
