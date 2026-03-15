'use client'

import { CreditCard, HelpCircle, MapPin, Settings, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export type ProfileActionKey =
  | 'edit-profile'
  | 'saved-addresses'
  | 'payment-methods'
  | 'help-support'
  | 'settings'

interface ProfileActionSheetProps {
  action: ProfileActionKey | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave?: () => void
}

const contentMap = {
  'edit-profile': {
    icon: User,
    title: 'Edit Profile',
    description: 'Update the basic customer profile shown in the app.',
  },
  'saved-addresses': {
    icon: MapPin,
    title: 'Saved Addresses',
    description: 'Manage pickup and delivery locations connected to this account.',
  },
  'payment-methods': {
    icon: CreditCard,
    title: 'Payment Methods',
    description: 'View or update the cards and cash preferences used for checkout.',
  },
  'help-support': {
    icon: HelpCircle,
    title: 'Help & Support',
    description: 'Get support for customer issues, order questions, or business onboarding.',
  },
  settings: {
    icon: Settings,
    title: 'Settings',
    description: 'Control app alerts, location access, and account preferences.',
  },
} satisfies Record<ProfileActionKey, { icon: React.ComponentType<{ className?: string }>; title: string; description: string }>

export function ProfileActionSheet({
  action,
  open,
  onOpenChange,
  onSave,
}: ProfileActionSheetProps) {
  if (!action) return null

  const current = contentMap[action]
  const Icon = current.icon

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <SheetTitle className="text-xl">{current.title}</SheetTitle>
              <SheetDescription>{current.description}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-5 overflow-y-auto p-5">
          {action === 'edit-profile' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="profile-name">Display Name</Label>
                <Input id="profile-name" defaultValue="Jamaican Foodie" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input id="profile-email" defaultValue="kingston@linkdifood.com" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-tier">Membership</Label>
                <Input id="profile-tier" defaultValue="Premium Member" />
              </div>
            </>
          )}

          {action === 'saved-addresses' && (
            <>
              {[
                ['Home', '8 Oaklands Plaza, Constant Spring Road, Kingston'],
                ['Work', '1 Annette Crescent, Kingston 10'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                  <p className="font-semibold text-slate-900">{label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{value}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full">Add Address</Button>
            </>
          )}

          {action === 'payment-methods' && (
            <>
              <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                <p className="font-semibold text-slate-900">Visa ending in 4421</p>
                <p className="mt-2 text-sm text-slate-600">Default payment method</p>
              </div>
              <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                <p className="font-semibold text-slate-900">Cash on pickup</p>
                <p className="mt-2 text-sm text-slate-600">Enabled for roadside cook-shop orders</p>
              </div>
              <Button variant="outline" className="w-full">Add Payment Method</Button>
            </>
          )}

          {action === 'help-support' && (
            <>
              <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                <p className="font-semibold text-slate-900">Customer support</p>
                <p className="mt-2 text-sm text-slate-600">Get help with wait times, menu accuracy, or app issues.</p>
              </div>
              <div className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                <p className="font-semibold text-slate-900">Business onboarding</p>
                <p className="mt-2 text-sm text-slate-600">Support for business sign up, dashboard access, and POS sync questions.</p>
              </div>
              <Separator />
              <Button className="w-full">Contact Support</Button>
            </>
          )}

          {action === 'settings' && (
            <>
              {[
                ['Push notifications', 'Enabled for order updates and inside-shop surveys'],
                ['Location access', 'Enabled for nearby cook-shop discovery and geofence prompts'],
                ['Crowd verification', 'Enabled so you can help confirm live availability'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.25rem] border border-emerald-100 bg-white/80 p-4">
                  <p className="font-semibold text-slate-900">{label}</p>
                  <p className="mt-2 text-sm text-slate-600">{value}</p>
                </div>
              ))}
            </>
          )}
        </div>

        <SheetFooter className="border-t border-border bg-background/95">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          {action !== 'help-support' && (
            <Button onClick={onSave}>Save Changes</Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
