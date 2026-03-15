'use client'

import { Heart } from 'lucide-react'
import { FoodCard } from '@/components/food-card'
import type { FoodItem } from '@/lib/data'

interface FavoritesViewProps {
  items: FoodItem[]
  onItemClick: (item: FoodItem) => void
}

export function FavoritesView({ items, onItemClick }: FavoritesViewProps) {
  if (items.length === 0) {
    return (
      <div className="glass-panel flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-rose-50">
          <Heart className="h-10 w-10 text-rose-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No favorites yet</h3>
        <p className="mt-1 max-w-xs text-slate-500">
          Tap the heart icon on any food item to save it to your favorites
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="glass-panel p-6">
        <p className="section-kicker">Saved Picks</p>
        <h2 className="mt-2 text-3xl font-display text-slate-900">Your favorites</h2>
        <p className="mt-2 text-sm text-slate-600">
          Keep the reliable spots close. These are the dishes you marked for quick access.
        </p>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} onClick={() => onItemClick(item)} className="cursor-pointer">
            <FoodCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}
