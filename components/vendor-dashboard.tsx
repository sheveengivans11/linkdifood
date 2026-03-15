'use client'

import Image from 'next/image'
import { ArrowLeft, Check, AlertTriangle, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export type VendorInventoryStatus = 'available' | 'low' | 'sold-out'

export interface VendorInventoryItem {
  id: string
  name: string
  image: string
  status: VendorInventoryStatus
}

interface VendorDashboardProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shopName: string
  items: VendorInventoryItem[]
  onUpdateStatus: (itemId: string, status: VendorInventoryStatus) => void
}

export function VendorDashboard({
  open,
  onOpenChange,
  shopName,
  items,
  onUpdateStatus,
}: VendorDashboardProps) {
  const statusButtons = [
    {
      status: 'available' as const,
      label: 'Available',
      icon: Check,
      color: 'bg-primary hover:bg-primary/90 text-primary-foreground',
    },
    {
      status: 'low' as const,
      label: 'Low',
      icon: AlertTriangle,
      color: 'bg-amber-400 hover:bg-amber-300 text-amber-950',
    },
    {
      status: 'sold-out' as const,
      label: 'Sold Out',
      icon: X,
      color: 'bg-destructive hover:bg-destructive/90 text-destructive-foreground',
    },
  ]

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg p-0">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <SheetTitle className="text-xl">{shopName}</SheetTitle>
              <p className="text-sm text-muted-foreground">Simple business dashboard</p>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
          <div className="rounded-xl bg-primary/10 p-4">
            <h3 className="font-semibold text-primary">Tap to update food status</h3>
            <p className="text-sm text-muted-foreground mt-1">
              No typing. Change each item to Available, Low, or Sold Out with one tap.
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-700">
              <Zap className="h-4 w-4" />
              POS and AI automation can sync these statuses in real time.
            </div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="flex gap-3 p-3">
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground">{item.name}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Current status:{' '}
                    <span className="font-semibold text-foreground">
                      {item.status === 'sold-out'
                        ? 'Sold Out'
                        : item.status === 'low'
                          ? 'Low'
                          : 'Available'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex border-t border-border">
                {statusButtons.map((btn) => {
                  const Icon = btn.icon
                  const isActive = item.status === btn.status
                  return (
                    <button
                      key={btn.status}
                      onClick={() => onUpdateStatus(item.id, btn.status)}
                      className={cn(
                        'flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors border-r last:border-r-0 border-border',
                        isActive ? btn.color : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {btn.label}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
