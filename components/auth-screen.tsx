'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, LockKeyhole, Store, UserRound } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { findAccount, saveAccount, setSession } from '@/lib/auth'

export type AccountType = 'customer' | 'business'
export type AuthMode = 'signup' | 'login'

interface AuthScreenProps {
  initialType: AccountType
  initialMode: AuthMode
}

export function AuthScreen({ initialType, initialMode }: AuthScreenProps) {
  const router = useRouter()
  const [accountType, setAccountType] = useState<AccountType>(initialType)
  const [authMode, setAuthMode] = useState<AuthMode>(initialMode)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const accountCopy = useMemo(
    () =>
      accountType === 'business'
        ? {
            title: 'Business account access',
            description:
              'Cook shops can register, log in, and manage live availability through the same lightweight flow.',
            icon: Store,
          }
        : {
            title: 'Customer account access',
            description:
              'Customers can sign up, check nearby cook shops, monitor availability, and report sold-out items.',
            icon: UserRound,
          },
    [accountType],
  )

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)

    try {
      if (accountType === 'business' && authMode === 'signup') {
        const payload = {
          businessName: String(formData.get('businessName') || ''),
          location: String(formData.get('location') || ''),
          phoneNumber: String(formData.get('phoneNumber') || ''),
        }

        const response = await fetch('/api/vendor-signups', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('Business signup failed')
        }

        saveAccount({
          type: 'business',
          name: payload.businessName,
          businessName: payload.businessName,
          location: payload.location,
          phoneNumber: payload.phoneNumber,
          email: String(formData.get('email') || ''),
          password: String(formData.get('password') || ''),
        })
        setSession({
          email: String(formData.get('email') || ''),
          type: 'business',
        })
        toast.success('Business signup submitted')
      } else if (authMode === 'signup') {
        saveAccount({
          type: 'customer',
          name: String(formData.get('fullName') || ''),
          email: String(formData.get('email') || ''),
          password: String(formData.get('password') || ''),
        })
        setSession({
          email: String(formData.get('email') || ''),
          type: 'customer',
        })
        toast.success(accountType === 'customer' ? 'Customer account created' : 'Business account ready')
      } else {
        const email = String(formData.get('loginEmail') || '')
        const password = String(formData.get('loginPassword') || '')
        const account = findAccount(email, accountType)

        if (!account || account.password !== password) {
          throw new Error('Invalid login')
        }

        setSession({ email, type: accountType })
        toast.success(accountType === 'customer' ? 'Customer login successful' : 'Business login successful')
      }

      router.push('/')
    } catch {
      toast.error('Unable to complete this request')
    } finally {
      setIsSubmitting(false)
    }
  }

  const AccountIcon = accountCopy.icon

  return (
    <main className="page-shell">
      <div className="page-frame max-w-4xl">
        <div className="mx-auto w-full max-w-2xl pb-16">
          <Button asChild variant="outline" className="mb-6">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Linkdifood
            </Link>
          </Button>

          <section className="glass-panel p-5 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-[1.25rem] bg-slate-950 p-3 text-white">
                <AccountIcon className="size-5" />
              </div>
              <div>
                <p className="section-kicker">Account Access</p>
                <h1 className="mt-2 font-display text-4xl leading-none text-slate-900">
                  {accountCopy.title}
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-600">{accountCopy.description}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setAccountType('customer')}
                className={`rounded-[1.5rem] border p-4 text-left transition ${
                  accountType === 'customer'
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-white/80 bg-white/80 hover:bg-slate-50'
                }`}
              >
                <p className="font-semibold text-slate-900">Customer</p>
                <p className="mt-2 text-sm text-slate-600">Check food availability, wait times, and nearby cook shops.</p>
              </button>
              <button
                type="button"
                onClick={() => setAccountType('business')}
                className={`rounded-[1.5rem] border p-4 text-left transition ${
                  accountType === 'business'
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-white/80 bg-white/80 hover:bg-slate-50'
                }`}
              >
                <p className="font-semibold text-slate-900">Business</p>
                <p className="mt-2 text-sm text-slate-600">Register your cook shop and manage live menu status.</p>
              </button>
            </div>

            <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as AuthMode)} className="mt-8">
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-[1rem] bg-slate-100 p-1">
                <TabsTrigger value="signup" className="rounded-[0.85rem] py-2">Sign Up</TabsTrigger>
                <TabsTrigger value="login" className="rounded-[0.85rem] py-2">Log In</TabsTrigger>
              </TabsList>

              <TabsContent value="signup" className="mt-6">
                <form
                  action={(formData) => {
                    void handleSubmit(formData)
                  }}
                  className="space-y-4"
                >
                  {accountType === 'business' ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" name="businessName" placeholder="Mama P Cook Shop" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" placeholder="Half-Way Tree, Kingston" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input id="phoneNumber" name="phoneNumber" placeholder="(876) 555-0199" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Business Email</Label>
                        <Input id="email" name="email" type="email" placeholder="shop@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="Create a password" required />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" name="fullName" placeholder="Janelle Brown" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" placeholder="Create a password" required />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {accountType === 'business' ? 'Create Business Account' : 'Create Customer Account'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="login" className="mt-6">
                <form
                  action={(formData) => {
                    void handleSubmit(formData)
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="loginEmail">{accountType === 'business' ? 'Business Email' : 'Email'}</Label>
                    <Input id="loginEmail" name="loginEmail" type="email" placeholder="you@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loginPassword">Password</Label>
                    <Input id="loginPassword" name="loginPassword" type="password" placeholder="Enter your password" required />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    <LockKeyhole className="h-4 w-4" />
                    {accountType === 'business' ? 'Log In as Business' : 'Log In as Customer'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </div>
    </main>
  )
}
