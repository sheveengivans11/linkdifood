'use client'

import Image from 'next/image'
import { Star, Clock, MapPin, Heart, Minus, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FoodItem } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'

interface FoodDetailSheetProps {
  item: FoodItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrder: (item: FoodItem, quantity: number) => void
  onToggleFavorite: (itemId: string) => void
  isFavorite: boolean
}

export function FoodDetailSheet({ 
  item, 
  open, 
  onOpenChange, 
  onOrder, 
  onToggleFavorite,
  isFavorite 
}: FoodDetailSheetProps) {
  const [quantity, setQuantity] = useState(1)

  if (!item) return null

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

  const handleOrder = () => {
    onOrder(item, quantity)
    setQuantity(1)
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0">
        <div className="relative h-56">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-5 h-5" />
          </Button>
          <div className={cn(
            'absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium',
            statusColors[item.status]
          )}>
            {statusLabels[item.status]}
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(85vh-14rem)]">
          <SheetHeader className="text-left space-y-1">
            <div className="flex items-start justify-between">
              <SheetTitle className="text-2xl font-bold text-foreground">{item.name}</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleFavorite(item.id)}
                className={cn(isFavorite && 'text-destructive')}
              >
                <Heart className={cn('w-6 h-6', isFavorite && 'fill-current')} />
              </Button>
            </div>
            <p className="text-muted-foreground">{item.vendor}</p>
          </SheetHeader>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{item.rating}</span>
              <span className="text-muted-foreground">({item.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{item.time}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{item.distance}</span>
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="font-semibold text-foreground mb-2">About this dish</h4>
            <p className="text-muted-foreground text-sm">
              A delicious authentic Jamaican {item.name.toLowerCase()} prepared fresh by {item.vendor}. 
              Made with traditional recipes passed down through generations.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-2xl font-bold text-primary">JMD ${item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-semibold text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <Button 
            className="w-full h-12 text-lg font-semibold"
            onClick={handleOrder}
            disabled={item.status === 'sold-out'}
          >
            {item.status === 'sold-out' 
              ? 'Sold Out' 
              : `Add to Order - JMD $${(item.price * quantity).toLocaleString()}`
            }
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
