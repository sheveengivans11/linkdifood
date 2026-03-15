'use client'

import { Bell, MapPin, Package, Tag, Star, Users, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { AccountType } from '@/lib/auth'

interface NotificationsSheetProps {
  accountType?: AccountType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const baseNotifications = [
  {
    id: '1',
    type: 'order',
    icon: Package,
    title: 'Order Ready!',
    message: 'Your Jerk Chicken from Boston Bay is ready for pickup',
    time: '5 min ago',
    unread: true,
  },
  {
    id: '2',
    type: 'promo',
    icon: Tag,
    title: '20% Off Today!',
    message: 'Use code VIBES20 on your next order',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: '3',
    type: 'review',
    icon: Star,
    title: 'Rate your order',
    message: 'How was your Curry Goat from Miss Vie Kitchen?',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: '4',
    type: 'order',
    icon: Package,
    title: 'Order Confirmed',
    message: 'Your order #1234 has been confirmed',
    time: 'Yesterday',
    unread: false,
  },
]

export function NotificationsSheet({ accountType, open, onOpenChange }: NotificationsSheetProps) {
  const notifications =
    accountType === 'customer'
      ? [
          {
            id: '5',
            type: 'geofence',
            icon: MapPin,
            title: "You're inside PeppaThyme",
            message: 'Help update crowd level, available food, and wait time for other customers.',
            time: 'Now',
            unread: true,
          },
          ...baseNotifications,
        ]
      : baseNotifications

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </SheetTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        <div className="divide-y divide-border">
          {accountType === 'customer' && (
            <div className="bg-emerald-50/70 p-4">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <Users className="h-5 w-5 text-emerald-700" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground">Inside shop survey</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When a customer enters a cook-shop geofence, the app can trigger a quick survey for crowd level, food availability, and wait time.
                  </p>
                </div>
              </div>
            </div>
          )}
          {notifications.map((notification) => {
            const Icon = notification.icon
            return (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-secondary/50 transition-colors ${notification.unread ? 'bg-primary/5' : ''}`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    notification.unread ? 'bg-primary/20' : 'bg-secondary'
                  }`}>
                    <Icon className={`w-5 h-5 ${notification.unread ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`font-medium ${notification.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {notification.title}
                      </h4>
                      {notification.unread && (
                        <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}
