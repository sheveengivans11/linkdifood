'use client'

import { Home, Heart, ClipboardList, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface BottomNavProps {
  active: string
  onNavigate: (tab: string) => void
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'favorites', label: 'Saved', icon: Heart },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
  { id: 'profile', label: 'Profile', icon: User },
]

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const [tappedId, setTappedId] = useState<string | null>(null)

  const handleTap = (id: string) => {
    setTappedId(id)
    setTimeout(() => setTappedId(null), 150)
    onNavigate(id)
  }

  return (
    <nav className="fixed bottom-2 left-2 right-2 z-50 mx-auto max-w-md rounded-[1.3rem] border border-white/80 bg-white/92 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:bottom-4 sm:left-1/2 sm:right-auto sm:w-[calc(100%-1.5rem)] sm:max-w-xl sm:-translate-x-1/2 sm:rounded-[1.75rem] sm:shadow-[0_26px_60px_-34px_rgba(15,23,42,0.55)]">
      <div className="px-1.5 sm:px-3">
        <div className="flex items-center justify-around py-1.5 sm:py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = active === item.id
            const isTapped = tappedId === item.id
            return (
              <button
                key={item.id}
                onClick={() => handleTap(item.id)}
                className={cn(
                  'relative flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-[0.95rem] px-1.5 py-1.5 transition-all duration-200 sm:flex-none sm:gap-1 sm:rounded-[1.2rem] sm:px-4 sm:py-2',
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900',
                  isTapped && 'scale-90'
                )}
              >
                <Icon className={cn(
                  'h-[18px] w-[18px] transition-transform duration-200 sm:h-6 sm:w-6',
                  isActive && 'scale-105 sm:scale-110'
                )} />
                <span className={cn(
                  'text-[9px] leading-none font-medium transition-all duration-200 sm:text-xs',
                  isActive && 'font-semibold'
                )}>{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 h-0.5 w-6 rounded-full bg-emerald-600 sm:-bottom-0.5 sm:h-1 sm:w-8" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
