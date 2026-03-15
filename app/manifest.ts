import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Linkdifood - Lighten Di Mood',
    short_name: 'Linkdifood',
    description:
      'Discover local food near you with fast browsing, map previews, and vendor sign-up.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f3fdf6',
    theme_color: '#009b3a',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
