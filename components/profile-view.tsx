'use client'

import Link from 'next/link'
import { User, Settings, CreditCard, MapPin, Bell, HelpCircle, LogOut, ChevronRight, Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { AccountType } from '@/lib/auth'

interface ProfileViewProps {
  accountType?: AccountType | null
  name: string
  email: string
  isLoggedIn?: boolean
  onEditProfile: () => void
  onSavedAddresses: () => void
  onPaymentMethods: () => void
  onNotifications: () => void
  onVendorDashboard: () => void
  onHelpSupport: () => void
  onSettings: () => void
  onLogout: () => void
}

export function ProfileView({
  accountType,
  name,
  email,
  isLoggedIn,
  onEditProfile,
  onSavedAddresses,
  onPaymentMethods,
  onNotifications,
  onVendorDashboard,
  onHelpSupport,
  onSettings,
  onLogout,
}: ProfileViewProps) {
  const menuItems = [
    { icon: User, label: 'Edit Profile', action: onEditProfile },
    { icon: MapPin, label: 'Saved Addresses', action: onSavedAddresses },
    { icon: CreditCard, label: 'Payment Methods', action: onPaymentMethods },
    { icon: Bell, label: 'Notifications', action: onNotifications },
    { icon: HelpCircle, label: 'Help & Support', action: onHelpSupport },
    { icon: Settings, label: 'Settings', action: onSettings },
  ]

  if (accountType === 'business') {
    menuItems.splice(4, 0, {
      icon: Store,
      label: 'Vendor Dashboard',
      action: onVendorDashboard,
      highlight: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="glass-panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-slate-900 text-xl font-bold text-white">
            {name
              .split(' ')
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase() || '')
              .join('') || 'JB'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="section-kicker">Profile</p>
          <h2 className="text-lg font-bold text-slate-900">{name}</h2>
          <p className="text-sm text-slate-500">{email}</p>
          <p className="mt-1 text-xs text-emerald-700">Premium Member</p>
        </div>
        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={onEditProfile}>Edit</Button>
      </div>

      {!isLoggedIn && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-panel min-w-0 overflow-hidden p-5">
            <p className="section-kicker">Customer Account</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Check food before you travel.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create an account to see nearby cook shops, availability, wait times, and report when something sells out.
            </p>
            <Button asChild variant="outline" className="mt-4 w-full min-w-0 shrink sm:w-auto">
              <Link href="/auth?type=customer&mode=login">Customer Log In</Link>
            </Button>
          </div>
          <div className="glass-panel min-w-0 overflow-hidden p-5 text-left">
            <p className="section-kicker">Business Account</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">Run a simple cook-shop dashboard.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Register your business and tap item statuses like Available, Low, and Sold Out without typing.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-col">
              <Button asChild className="w-full min-w-0 shrink">
                <Link href="/auth?type=business&mode=signup">Business Sign Up</Link>
              </Button>
              <Button asChild variant="outline" className="w-full min-w-0 shrink">
                <Link href="/auth?type=business&mode=login">Business Log In</Link>
              </Button>
              <Button variant="outline" className="w-full min-w-0 shrink" onClick={onVendorDashboard}>
                Open Dashboard
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel overflow-hidden p-0">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.label}
              onClick={item.action}
              className={`flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-emerald-50/60 ${
                index !== menuItems.length - 1 ? 'border-b border-emerald-100' : ''
              } ${item.highlight ? 'bg-emerald-50/70' : ''}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                item.highlight ? 'bg-emerald-100' : 'bg-slate-100'
              }`}>
                <Icon className={`h-5 w-5 ${item.highlight ? 'text-emerald-700' : 'text-slate-700'}`} />
              </div>
              <span className={`flex-1 font-medium ${item.highlight ? 'text-emerald-700' : 'text-slate-900'}`}>
                {item.label}
              </span>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>
          )
        })}
      </div>

      <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={onLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  )
}
