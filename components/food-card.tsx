'use client'

import Image from 'next/image'
import { Star, Clock, Heart, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FoodItem } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface FoodCardProps {
  item: FoodItem
  variant?: 'default' | 'compact'
  isFavorite?: boolean
  onFavoriteClick?: () => void
}

export function FoodCard({ item, variant = 'default', isFavorite = false, onFavoriteClick }: FoodCardProps) {
  const [isHeartAnimating, setIsHeartAnimating] = useState(false)
  const statusColors = {
    ready: 'bg-primary text-primary-foreground',
    cooking: 'bg-accent text-accent-foreground',
    'sold-out': 'bg-destructive text-destructive-foreground',
  }

  const statusLabels = {
    ready: 'Ready Now',
    cooking: 'Cooking',
    'sold-out': 'Sold Out',
  }

  const popularityColors = {
    quiet: 'text-primary',
    moderate: 'text-amber-600',
    busy: 'text-destructive',
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsHeartAnimating(true)
    setTimeout(() => setIsHeartAnimating(false), 300)
    onFavoriteClick?.()
  }

  if (variant === 'compact') {
    return (
      <div className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/86 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_26px_50px_-30px_rgba(15,23,42,0.55)] active:scale-[0.98]">
        <div className="relative aspect-[4/3]">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
          <button 
            onClick={handleFavoriteClick}
            className={cn(
              'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-all duration-150 hover:bg-white active:scale-90',
              isFavorite && 'text-destructive'
            )}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn(
              'w-4 h-4 transition-transform duration-300', 
              isFavorite && 'fill-current',
              isHeartAnimating && 'scale-125'
            )} />
          </button>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-slate-950/80 px-2.5 py-1 text-white backdrop-blur-sm">
            <Clock className="h-3 w-3 text-emerald-200" />
            <span className="text-xs font-medium">{item.time}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="truncate font-semibold text-slate-900">{item.name}</h3>
          <div className="mt-1 flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-900">{item.rating}</span>
            <span className="text-xs text-slate-500">({item.reviews} reviews)</span>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-emerald-700">JMD ${item.price.toLocaleString()}</span>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-emerald-50">
              <ExternalLink className="h-4 w-4 text-emerald-700" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/88 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.42)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_26px_50px_-28px_rgba(15,23,42,0.55)] active:scale-[0.99]">
      <div className="relative w-32 h-32 shrink-0">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
        <div className={cn(
          'absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium shadow-sm',
          statusColors[item.status]
        )}>
          {statusLabels[item.status]}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-slate-900">{item.name}</h3>
            <button 
              onClick={handleFavoriteClick}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 transition-all duration-150 hover:bg-rose-100 active:scale-90',
                isFavorite && 'text-destructive'
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={cn(
                'w-4 h-4 transition-transform duration-300', 
                isFavorite && 'fill-current',
                isHeartAnimating && 'scale-125'
              )} />
            </button>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">{item.vendor}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-slate-900">{item.rating}</span>
            </div>
            <span className="text-xs text-slate-500">• {item.distance}</span>
            <span className={cn('text-xs font-medium', popularityColors[item.popularity])}>
              • {item.popularity.charAt(0).toUpperCase() + item.popularity.slice(1)}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-500">Wait: {item.time}</span>
          </div>
          <span className="font-bold text-emerald-700">JMD ${item.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
