'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bot,
  Clock3,
  Cpu,
  Flame,
  MapPin,
  Navigation,
  ScanSearch,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  Users,
  Workflow,
} from 'lucide-react'
import { toast } from 'sonner'

import { BottomNav } from '@/components/bottom-nav'
import { CategoryPills } from '@/components/category-pills'
import { FavoritesView } from '@/components/favorites-view'
import { FoodCard } from '@/components/food-card'
import { FoodDetailSheet } from '@/components/food-detail-sheet'
import { Header } from '@/components/header'
import { NotificationsSheet } from '@/components/notifications-sheet'
import { OfferBanner } from '@/components/offer-banner'
import { OrderSheet, type OrderItem } from '@/components/order-sheet'
import { ProfileActionSheet, type ProfileActionKey } from '@/components/profile-action-sheet'
import { ProfileView } from '@/components/profile-view'
import { ReportDialog } from '@/components/report-dialog'
import { SearchBar } from '@/components/search-bar'
import { SectionHeader } from '@/components/section-header'
import { Button } from '@/components/ui/button'
import {
  VendorDashboard,
  type VendorInventoryItem,
  type VendorInventoryStatus,
} from '@/components/vendor-dashboard'
import { clearSession, findAccount, getSession, type AppAccount } from '@/lib/auth'
import { foodItems, type FoodItem, popularItems, trendingItems } from '@/lib/data'
import { filterButtons, restaurants } from '@/lib/restaurants'

type Tab = 'home' | 'favorites' | 'orders' | 'profile'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['1', '5'])
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isOrderOpen, setIsOrderOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [isVendorDashboardOpen, setIsVendorDashboardOpen] = useState(false)
  const [activeProfileAction, setActiveProfileAction] = useState<ProfileActionKey | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [restaurantFilter, setRestaurantFilter] = useState<(typeof filterButtons)[number]>('all')
  const [currentAccount, setCurrentAccount] = useState<AppAccount | null>(null)
  const [vendorItems, setVendorItems] = useState<VendorInventoryItem[]>([
    { id: 'vendor-1', name: 'Jerk Chicken', image: '/images/jerk-chicken.jpg', status: 'available' },
    { id: 'vendor-2', name: 'Curry Goat', image: '/images/curry-goat.jpg', status: 'low' },
    { id: 'vendor-3', name: 'Rice & Peas', image: '/images/oxtail-stew.jpg', status: 'sold-out' },
    { id: 'vendor-4', name: 'Festival', image: '/images/festival.jpg', status: 'available' },
  ])

  const filteredFood = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return foodItems.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.vendor.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesQuery
    })
  }, [query, selectedCategory])

  const filteredRestaurants = useMemo(() => {
    if (restaurantFilter === 'all') {
      return restaurants
    }

    return restaurants.filter((restaurant) => restaurant.category === restaurantFilter)
  }, [restaurantFilter])

  const favoriteItems = useMemo(
    () => foodItems.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds],
  )

  const orderCount = orderItems.reduce((sum, item) => sum + item.quantity, 0)
  const orderTotal = orderItems.reduce((sum, item) => sum + item.item.price * item.quantity, 0)
  const isBusinessAccount = currentAccount?.type === 'business'
  const isCustomerAccount = currentAccount?.type === 'customer'

  useEffect(() => {
    const session = getSession()
    if (!session) return

    const account = findAccount(session.email, session.type)
    if (account) {
      setCurrentAccount(account)
    }
  }, [])

  function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId)
    if (!section) return

    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function handleBrandClick() {
    setActiveTab('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleLocationClick() {
    setActiveTab('home')
    requestAnimationFrame(() => {
      scrollToSection('restaurant-picks')
    })
  }

  function handleToggleFavorite(itemId: string) {
    setFavoriteIds((current) =>
      current.includes(itemId) ? current.filter((id) => id !== itemId) : [...current, itemId],
    )
  }

  function handleOpenItem(item: FoodItem) {
    setSelectedItem(item)
    setIsDetailOpen(true)
  }

  function handleOrder(item: FoodItem, quantity: number) {
    setOrderItems((current) => {
      const existing = current.find((entry) => entry.item.id === item.id)
      if (existing) {
        return current.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        )
      }

      return [...current, { item, quantity }]
    })

    toast.success(`${item.name} added to order`)
    setActiveTab('orders')
    setIsOrderOpen(true)
  }

  function handleUpdateQuantity(itemId: string, quantity: number) {
    setOrderItems((current) =>
      current.map((entry) => (entry.item.id === itemId ? { ...entry, quantity } : entry)),
    )
  }

  function handleRemoveItem(itemId: string) {
    setOrderItems((current) => current.filter((entry) => entry.item.id !== itemId))
  }

  function handleCheckout() {
    setOrderItems([])
    setIsOrderOpen(false)
    toast.success('Order placed. Vendor is prepping your food now.')
  }

  function handleVendorStatusUpdate(itemId: string, status: VendorInventoryStatus) {
    setVendorItems((current) =>
      current.map((item) => (item.id === itemId ? { ...item, status } : item)),
    )
    toast.success('Cook-shop status updated')
  }

  function handleOpenVendorDashboard() {
    if (currentAccount?.type !== 'business') {
      toast.error('Vendor dashboard is only available to business accounts')
      return
    }

    setIsVendorDashboardOpen(true)
  }

  function openProfileAction(action: ProfileActionKey) {
    setActiveTab('profile')
    setActiveProfileAction(action)
  }

  function handleProfileActionSave() {
    setActiveProfileAction(null)
    toast.success('Changes saved')
  }

  function handleLogout() {
    clearSession()
    setCurrentAccount(null)
    setActiveProfileAction(null)
    setIsVendorDashboardOpen(false)
    setIsNotificationsOpen(false)
    setOrderItems([])
    setFavoriteIds([])
    setSelectedItem(null)
    setActiveTab('home')
    toast.success('Logged out')
  }

  function renderBusinessPortal() {
    return (
      <div className="w-full space-y-6 pb-28">
        <section className="glass-panel p-5 sm:p-6">
          <p className="section-kicker">Business Portal</p>
          <h1 className="mt-2 text-3xl font-display text-slate-900">
            {currentAccount?.businessName || currentAccount?.name || 'Mama P Cook Shop'}
          </h1>
          <p className="mt-2 text-sm text-slate-600">Simple business dashboard</p>
        </section>

        <section className="glass-panel p-5 sm:p-6">
          <h2 className="font-semibold text-primary">Tap to update food status</h2>
          <p className="mt-2 text-sm text-slate-600">
            No typing. Change each item to Available, Low, or Sold Out with one tap.
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-700">
            <Workflow className="h-4 w-4" />
            POS and AI automation can sync these statuses in real time.
          </div>
        </section>

        <section className="space-y-4">
          {vendorItems.map((item) => (
            <div key={item.id} className="glass-panel overflow-hidden p-0">
              <div className="flex gap-3 p-4 sm:p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Current status:{' '}
                    <span className="font-semibold text-slate-900">
                      {item.status === 'available'
                        ? 'Available'
                        : item.status === 'low'
                          ? 'Low'
                          : 'Sold Out'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex border-t border-emerald-100">
                {([
                  ['available', 'Available'],
                  ['low', 'Low'],
                  ['sold-out', 'Sold Out'],
                ] as const).map(([status, label]) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleVendorStatusUpdate(item.id, status)}
                    className={`flex-1 border-r border-emerald-100 px-3 py-3 text-sm font-medium last:border-r-0 ${
                      item.status === status
                        ? status === 'available'
                          ? 'bg-primary text-primary-foreground'
                          : status === 'low'
                            ? 'bg-amber-400 text-amber-950'
                            : 'bg-destructive text-white'
                        : 'bg-white/80 text-slate-600 hover:bg-emerald-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    )
  }

  function renderHome() {
    return (
      <div className="w-full space-y-8 pb-28">
        <section className="glass-panel p-4 sm:hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="section-kicker">Pickup now</p>
              <h1 className="mt-2 font-display text-3xl leading-none text-slate-900">
                Find food fast.
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Browse nearby dishes, save favorites, and order without the extra homepage clutter.
              </p>
            </div>
            <div className="rounded-[1.1rem] bg-emerald-100 p-3 text-emerald-700">
              <Sparkles className="size-5" />
            </div>
          </div>
        </section>

        <section className="glass-panel relative hidden overflow-hidden p-5 sm:block sm:p-8">
          <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(135deg,rgba(255,186,73,0.26),rgba(18,120,94,0.14),rgba(255,255,255,0))]" />
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-emerald-200/50 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700 sm:text-xs sm:tracking-[0.24em]">
                <Sparkles className="size-3.5" />
                Food discovery, reworked
              </div>
              <div className="space-y-3">
                <h1 className="max-w-2xl font-display text-[2.5rem] leading-none text-slate-900 sm:text-5xl">
                  Link up with real Jamaican food before the line gets long.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                  Track what is hot, what is moving fast, and which vendors fit the mood right now.
                  Built for street-food runs, lunch links, and quick pickup plans.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/80 bg-white/78 p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Nearby spots</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{restaurants.length}</p>
                  <p className="mt-1 text-sm text-slate-600">Curated across Kingston, Mobay, and Port Royal.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/78 p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Fast pickup</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">15m</p>
                  <p className="mt-1 text-sm text-slate-600">Average prep time for ready-now items.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/80 bg-white/78 p-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.45)]">
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Saved picks</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{favoriteItems.length}</p>
                  <p className="mt-1 text-sm text-slate-600">Your shortlist stays one tap away.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-slate-950 p-5 text-white shadow-[0_30px_70px_-35px_rgba(2,6,23,0.7)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/80">Live board</p>
                  <h2 className="mt-2 text-2xl font-semibold">Rush monitor</h2>
                </div>
                <div className="self-start rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200">
                  Updated now
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {popularItems.slice(0, 3).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleOpenItem(item)}
                    className="flex w-full items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-sm text-slate-300">{item.vendor}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-amber-300">{item.time}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-emerald-200">
                        {item.popularity}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-5 rounded-[1.5rem] bg-white px-4 py-4 text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                    <TrendingUp className="size-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Demand is climbing in New Kingston</p>
                    <p className="text-sm text-slate-600">Dinner vendors are moving 18% faster than earlier today.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid w-full gap-4 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-4">
            <SearchBar value={query} onChange={setQuery} />
            <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          <div className="glass-panel min-w-0 overflow-hidden flex flex-col items-start gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Current basket</p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {orderCount > 0 ? `JMD $${orderTotal.toLocaleString()}` : 'Empty'}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                {orderCount > 0 ? `${orderCount} item${orderCount > 1 ? 's' : ''} waiting in cart` : 'Start with a quick pickup order'}
              </p>
            </div>
            <Button onClick={() => setIsOrderOpen(true)} className="w-full sm:w-auto">
              <ShoppingBag className="size-4" />
              View Order
            </Button>
          </div>
        </div>

        {!isBusinessAccount && <OfferBanner onOrderClick={() => setIsOrderOpen(true)} />}

        {isCustomerAccount && (
          <section className="space-y-4">
            <SectionHeader title="Customer Push Alert" />
            <div className="glass-panel p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <Navigation className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">Inside Shop Prompt</p>
                  <h3 className="mt-1 text-2xl font-semibold text-slate-900">📍 You&apos;re inside PeppaThyme</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Help update the shop status: How busy is it right now?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Not busy', 'Moderate', 'Very crowded'].map((label) => (
                  <Button
                    key={label}
                    variant="outline"
                    className="min-w-0 shrink"
                    onClick={() => toast.success(`Response submitted: ${label}`)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="restaurant-picks" className="space-y-4">
          <SectionHeader title="Trending Right Now" />
          <div className="grid gap-4 xl:grid-cols-2">
            {filteredFood.slice(0, 6).map((item) => (
              <div key={item.id} className="space-y-3">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpenItem(item)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      handleOpenItem(item)
                    }
                  }}
                  className="block cursor-pointer text-left"
                >
                  <FoodCard
                    item={item}
                    isFavorite={favoriteIds.includes(item.id)}
                    onFavoriteClick={() => handleToggleFavorite(item.id)}
                  />
                </div>
                <div className="flex flex-col gap-3 px-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Clock3 className="size-4" />
                    Pickup in {item.time}
                  </div>
                  <Button size="sm" onClick={() => handleOrder(item, 1)} className="w-full sm:w-auto">
                    Add to cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <SectionHeader title="Restaurant Picks" />
            <div className="flex flex-wrap gap-2">
              {filterButtons.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setRestaurantFilter(filter)}
                  className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
                    restaurantFilter === filter
                      ? 'bg-slate-900 text-white'
                      : 'border border-emerald-200/80 bg-white/80 text-slate-700 hover:bg-emerald-50'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.slug}
                href={`/restaurants/${restaurant.slug}`}
                className="glass-panel group flex flex-col gap-5 p-5 transition duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-[1.25rem] bg-emerald-100 p-3 text-emerald-700">
                    <Store className="size-5" />
                  </div>
                  <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
                    {restaurant.category}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-900">{restaurant.name}</h3>
                  <p className="text-sm leading-6 text-slate-600">{restaurant.featuredNote}</p>
                </div>
                <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-emerald-700" />
                    <span>{restaurant.parish}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="size-4 text-emerald-700" />
                    <span>{restaurant.eta}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 border-t border-emerald-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium text-slate-500">{restaurant.price} price range</span>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    Open profile
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {isBusinessAccount && (
          <section className="space-y-4">
            <SectionHeader title="AI + POS Layer" />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="glass-panel p-5 md:col-span-2 xl:col-span-3">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <Navigation className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">Inside Shop System</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Geofencing turns customers into live shop sensors</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                When a customer enters a cook-shop radius, the app can send a push notification asking quick questions about crowd level, food availability, and wait time.
              </p>
              <div className="mt-5 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-[1.5rem] border border-emerald-100 bg-white/86 p-4">
                  <p className="font-semibold text-slate-900">Geofence example</p>
                  <div className="mt-4 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-3">
                      <span>Triple T’z Eatery</span>
                      <span className="font-medium text-slate-900">18.0175, -76.7921</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Radius</span>
                      <span className="font-medium text-slate-900">20 meters</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Trigger</span>
                      <span className="font-medium text-emerald-700">User enters zone</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] bg-slate-950 p-4 text-white">
                  <p className="text-sm font-semibold">Push notification</p>
                  <div className="mt-4 rounded-[1.25rem] bg-white/8 p-4">
                    <p className="text-sm text-emerald-200">📍 You&apos;re inside PeppaThyme</p>
                    <p className="mt-2 text-sm text-white/88">
                      Help update the shop status: How busy is it right now?
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">Not busy</span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">Moderate</span>
                      <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-800">Very crowded</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.2rem] border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
                  Availability survey: customers tap what they saw, like jerk chicken, curry goat, fish, or other.
                </div>
                <div className="rounded-[1.2rem] border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
                  Wait-time survey: quick answers like 5 min, 10 min, or 20+ min build a live average.
                </div>
                <div className="rounded-[1.2rem] border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
                  Other users then see real-time crowd intelligence before choosing where to stop.
                </div>
              </div>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-800">
                  <Workflow className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">POS Integration</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Real-time inventory sync</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Every sale from a Point-of-Sale system can lower inventory automatically so statuses move from Available to Low to Sold Out without manual typing.
              </p>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">
                  <Bot className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">Sell-Out Prediction</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">AI estimates when food will finish</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                The system learns order patterns and can show warnings like Running Low with estimated sell-out times before customers leave home.
              </p>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <ScanSearch className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">Crowd Verification</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Users help confirm stock</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                After a visit, customers can confirm if they got the item. AI collects those signals and updates questionable listings faster.
              </p>
            </div>

            <div className="glass-panel p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-100 p-3 text-cyan-800">
                  <Clock3 className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">Wait-Time AI</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Predict queues in minutes</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                Wait estimates combine people in line, average service time, and time of day so customers know whether a stop will take 8 minutes or 20.
              </p>
            </div>

            <div className="glass-panel p-5 md:col-span-2 xl:col-span-2">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-rose-100 p-3 text-rose-700">
                  <Cpu className="size-5" />
                </div>
                <div>
                  <p className="section-kicker">Smart Ranking</p>
                  <h3 className="mt-1 text-lg font-semibold text-slate-900">Trending cook shops ranked by live signal</h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">
                AI ranks nearby cook shops using availability, popularity, wait time, ratings, and customer confirmations so the best active shops surface first.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  'Availability comes first so empty kitchens do not rank high.',
                  'Lower wait times boost fast, reliable lunch spots.',
                  'Ratings and repeat demand surface trending cook shops.',
                ].map((line) => (
                  <div key={line} className="rounded-[1.2rem] border border-emerald-100 bg-white/80 px-4 py-3 text-sm text-slate-600">
                    {line}
                  </div>
                ))}
              </div>
            </div>
            </div>
          </section>
        )}

        {isBusinessAccount && (
          <section className="hidden gap-4 lg:grid-cols-[1.1fr_0.9fr] lg:grid">
          <div className="glass-panel p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                <Flame className="size-5" />
              </div>
              <div>
                <p className="section-kicker">Popular this week</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">Top repeat orders</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {trendingItems.slice(0, 4).map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 rounded-[1.25rem] border border-emerald-100 bg-white/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.vendor}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenItem(item)}
                    className="self-start text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 sm:p-6">
            <p className="section-kicker">Quick notes</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">Why this version is better</h3>
            <div className="mt-5 space-y-3">
              {[
                'The home route now exists and acts like a real product surface.',
                'Food, restaurants, favorites, and ordering all connect through one flow.',
                'The UI now uses one bold visual language instead of separate demo cards.',
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-[1.25rem] border border-white/80 bg-white/80 px-4 py-3 text-sm leading-6 text-slate-600 shadow-[0_15px_30px_-28px_rgba(15,23,42,0.55)]"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
          </section>
        )}
      </div>
    )
  }

  function renderOrders() {
    return (
      <div className="w-full space-y-6 pb-28">
        <section className="glass-panel p-6">
          <p className="section-kicker">Order Summary</p>
          <h1 className="mt-2 text-3xl font-display text-slate-900">Everything ready for pickup.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Review your live basket, adjust quantities, and open the checkout sheet when you are ready.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Items</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{orderCount}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">JMD ${orderTotal.toLocaleString()}</p>
            </div>
            <div className="rounded-[1.5rem] bg-white/80 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Status</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">{orderCount > 0 ? 'Live' : 'Idle'}</p>
            </div>
          </div>
          <Button className="mt-6 w-full sm:w-auto" onClick={() => setIsOrderOpen(true)}>
            <ShoppingBag className="size-4" />
            Open Order Sheet
          </Button>
        </section>

        {orderItems.length === 0 ? (
          <div className="glass-panel p-8 text-center">
            <ShoppingBag className="mx-auto size-12 text-slate-400" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">No active order yet</h2>
            <p className="mt-2 text-sm text-slate-600">Jump back home and add a few dishes to get the flow moving.</p>
            <Button className="mt-5" onClick={() => setActiveTab('home')}>
              Browse food
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {orderItems.map(({ item, quantity }) => (
              <div key={item.id} className="glass-panel flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="text-lg font-semibold text-slate-900">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.vendor}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-slate-500">Qty {quantity}</p>
                  <p className="mt-1 text-lg font-semibold text-emerald-700">
                    JMD ${(item.price * quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <main className="page-shell">
      <div className="page-frame">
        <Header
          onBrandClick={handleBrandClick}
          onLocationClick={handleLocationClick}
          onNotificationsClick={() => setIsNotificationsOpen(true)}
          onReportClick={() => setIsReportOpen(true)}
        />

        <div className="mx-auto mt-6 w-full max-w-4xl">
          {activeTab === 'home' && (isBusinessAccount ? renderBusinessPortal() : renderHome())}
          {activeTab === 'favorites' && (
            <div className="pb-28">
              <FavoritesView items={favoriteItems} onItemClick={handleOpenItem} />
            </div>
          )}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'profile' && (
            <div className="pb-28">
              <ProfileView
                accountType={currentAccount?.type}
                name={currentAccount?.name || 'Jamaican Foodie'}
                email={currentAccount?.email || 'kingston@linkdifood.com'}
                isLoggedIn={Boolean(currentAccount)}
                onEditProfile={() => openProfileAction('edit-profile')}
                onSavedAddresses={() => openProfileAction('saved-addresses')}
                onPaymentMethods={() => openProfileAction('payment-methods')}
                onNotifications={() => setIsNotificationsOpen(true)}
                onVendorDashboard={handleOpenVendorDashboard}
                onHelpSupport={() => openProfileAction('help-support')}
                onSettings={() => openProfileAction('settings')}
                onLogout={handleLogout}
              />
            </div>
          )}
        </div>
      </div>

      <BottomNav active={activeTab} onNavigate={(tab) => setActiveTab(tab as Tab)} />

      <FoodDetailSheet
        item={selectedItem}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        onOrder={handleOrder}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedItem ? favoriteIds.includes(selectedItem.id) : false}
      />

      <OrderSheet
        items={orderItems}
        open={isOrderOpen}
        onOpenChange={setIsOrderOpen}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <NotificationsSheet
        accountType={currentAccount?.type || null}
        open={isNotificationsOpen}
        onOpenChange={setIsNotificationsOpen}
      />

      <ReportDialog
        open={isReportOpen}
        onOpenChange={setIsReportOpen}
        onSubmit={() => toast.success('Report submitted. Thanks for flagging that.')}
      />

      <VendorDashboard
        open={isVendorDashboardOpen}
        onOpenChange={setIsVendorDashboardOpen}
        shopName="Mama P Cook Shop"
        items={vendorItems}
        onUpdateStatus={handleVendorStatusUpdate}
      />

      <ProfileActionSheet
        action={activeProfileAction}
        open={activeProfileAction !== null}
        onOpenChange={(open) => {
          if (!open) {
    clearSession()
    setCurrentAccount(null)
    setActiveProfileAction(null)
          }
        }}
        onSave={handleProfileActionSave}
      />
    </main>
  )
}
