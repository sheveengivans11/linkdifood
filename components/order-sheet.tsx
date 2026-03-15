'use client'

import Image from 'next/image'
import { Trash2, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react'
import type { FoodItem } from '@/lib/data'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useState } from 'react'

export interface OrderItem {
  item: FoodItem
  quantity: number
}

interface OrderSheetProps {
  items: OrderItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  onCheckout: () => void
}

export function OrderSheet({ 
  items, 
  open, 
  onOpenChange, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout 
}: OrderSheetProps) {
  const [isLoading, setIsLoading] = useState(false)
  const total = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0)

  const handleCheckout = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    onCheckout()
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[75vh] rounded-t-3xl">
        <SheetHeader className="text-left pb-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="w-6 h-6 text-primary" />
            Your Order
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100%-8rem)] text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground">Your cart is empty</h3>
            <p className="text-muted-foreground mt-1">Add some delicious Jamaican food!</p>
            <Button 
              className="mt-4"
              onClick={() => onOpenChange(false)}
            >
              Browse Food
            </Button>
          </div>
        ) : (
          <>
            <div className="py-4 space-y-4 overflow-y-auto max-h-[calc(75vh-12rem)]">
              {items.map(({ item, quantity }) => (
                <div key={item.id} className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                  <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.vendor}</p>
                    <p className="text-primary font-bold mt-1">JMD ${item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.id, quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">JMD ${total.toLocaleString()}</span>
              </div>
              <Button 
                className="w-full h-12 text-lg font-semibold active:scale-[0.98] transition-transform"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Checkout'
                )}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
