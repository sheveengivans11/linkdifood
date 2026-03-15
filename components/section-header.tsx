import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SectionHeaderProps {
  title: string
  onSeeAll?: () => void
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      {onSeeAll && (
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80" onClick={onSeeAll}>
          See All
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      )}
    </div>
  )
}
