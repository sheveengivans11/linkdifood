import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock3, MapPin, Sparkles, UtensilsCrossed } from 'lucide-react'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { getRestaurantBySlug, restaurants } from '@/lib/restaurants'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return restaurants.map((restaurant) => ({ slug: restaurant.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const restaurant = getRestaurantBySlug(slug)

  if (!restaurant) {
    return {
      title: 'Restaurant Not Found',
    }
  }

  return {
    title: `${restaurant.name} | Linkdifood`,
    description: `${restaurant.name} in ${restaurant.location}. ${restaurant.description}`,
  }
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params
  const restaurant = getRestaurantBySlug(slug)

  if (!restaurant) {
    notFound()
  }

  const mapQuery = encodeURIComponent(`${restaurant.name} ${restaurant.location}`)

  return (
    <main className="page-shell">
      <div className="page-frame max-w-6xl space-y-6 pb-20">
        <Button asChild variant="outline" className="hidden sm:inline-flex">
          <Link href="/">Back to restaurants</Link>
        </Button>

        <section className="glass-panel overflow-hidden p-0">
          <div className="relative h-[26rem] overflow-hidden sm:h-[26rem]">
            <Image
              src={restaurant.img}
              alt={restaurant.name}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.12),rgba(15,23,42,0.74))]" />
            <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
              <div className="max-w-3xl">
                <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100 backdrop-blur-md sm:text-xs sm:tracking-[0.24em]">
                  <Sparkles className="h-3.5 w-3.5" />
                  {restaurant.category}
                </div>
                <h1 className="mt-4 font-display text-[2.5rem] leading-none text-white sm:text-5xl">
                  {restaurant.name}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/82 sm:text-base">
                  {restaurant.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-emerald-100 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Location</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{restaurant.parish}</p>
                  <p className="mt-1 text-sm text-slate-600">{restaurant.location}</p>
                </div>
                <div className="rounded-[1.5rem] border border-emerald-100 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Pickup ETA</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{restaurant.eta}</p>
                  <p className="mt-1 text-sm text-slate-600">Based on current prep traffic</p>
                </div>
                <div className="rounded-[1.5rem] border border-emerald-100 bg-white/85 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{restaurant.price}</p>
                  <p className="mt-1 text-sm text-slate-600">Estimated spend per visit</p>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-emerald-100 bg-white/85 p-5">
                <p className="section-kicker">What stands out</p>
                <p className="mt-3 text-base leading-7 text-slate-700">{restaurant.featuredNote}</p>
              </div>

              <div className="rounded-[1.75rem] border border-emerald-100 bg-white/85 p-5">
                <p className="section-kicker">Specialties</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {restaurant.specialties.map((specialty) => (
                    <div
                      key={specialty}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800"
                    >
                      {specialty}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[1.9rem] bg-slate-950 p-6 text-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.85)]">
                <p className="text-xs uppercase tracking-[0.24em] text-emerald-200/85">Plan your stop</p>
                <h2 className="mt-2 text-2xl font-semibold">Move with less guesswork.</h2>
                <div className="mt-5 space-y-4 text-sm text-slate-200">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-emerald-300" />
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 text-emerald-300" />
                    <span>{restaurant.eta} estimated pickup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed className="h-4 w-4 text-emerald-300" />
                    <span>{restaurant.specialties[0]} is one of the strongest picks here.</span>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MapPin className="h-4 w-4" />
                      Open in Maps
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/">
                      <UtensilsCrossed className="h-4 w-4" />
                      Browse More
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  )
}
