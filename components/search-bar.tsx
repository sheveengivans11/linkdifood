'use client'

import { Search, Mic } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-full">
      <div className="glass-panel flex w-full max-w-full items-center gap-3 overflow-hidden rounded-[1.75rem] px-3 py-3 sm:px-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Search className="h-5 w-5 shrink-0" />
        </div>
        <Input
          type="text"
          placeholder="Search food, vendor, or try: mi want jerk chicken"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 border-0 bg-transparent px-0 text-sm text-slate-900 shadow-none focus-visible:ring-0 sm:text-base placeholder:text-slate-400"
        />
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-2xl bg-amber-100 text-amber-700 hover:bg-amber-200"
          aria-label="Voice search"
        >
          <Mic className="h-5 w-5" />
        </Button>
      </div>
      <p className="mt-2 px-2 text-xs text-slate-500">
        Try speaking in patois: &quot;mi want jerk chicken near mi&quot;
      </p>
    </div>
  )
}
