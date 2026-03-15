'use client'

import { cn } from '@/lib/utils'
import { categories } from '@/lib/data'
import { useState } from 'react'

interface CategoryPillsProps {
  selected: string
  onSelect: (id: string) => void
}

export function CategoryPills({ selected, onSelect }: CategoryPillsProps) {
  const [tappedId, setTappedId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    setTappedId(id)
    setTimeout(() => setTappedId(null), 150)
    onSelect(id)
  }

  return (
    <div className="flex w-full max-w-full gap-3 overflow-x-auto pb-2 scrollbar-hide [overscroll-behavior-x:contain]">
      <button
        onClick={() => handleSelect('all')}
        className={cn(
          'shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
          selected === 'all'
            ? 'bg-slate-900 text-white shadow-[0_18px_30px_-20px_rgba(15,23,42,0.9)] sm:scale-105'
            : 'border border-emerald-200/80 bg-white/80 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50',
          tappedId === 'all' && 'scale-95 sm:scale-95'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleSelect(category.id)}
          className={cn(
            'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200',
            selected === category.id
              ? 'bg-slate-900 text-white shadow-[0_18px_30px_-20px_rgba(15,23,42,0.9)] sm:scale-105'
              : 'border border-emerald-200/80 bg-white/80 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50',
            tappedId === category.id && 'scale-95 sm:scale-95'
          )}
        >
          <span className={cn(
            'text-base transition-transform duration-200',
            selected === category.id ? 'scale-110' : 'drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]'
          )}>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  )
}
