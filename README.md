# Linkdifood - linkdifood-g7zv.vercel.app - https://youtu.be/eso-v7kQgMw

Linkdifood is a Next.js app for discovering Jamaican cook shops, checking food availability, estimating wait times, and supporting separate customer and business flows.

## What This Project Does

- Customers can browse cook shops, food items, and restaurant details.
- Customers can sign up and log in through the `/auth` flow.
- Business users can sign up and log in, then land in a simple business dashboard where they can tap item statuses between `Available`, `Low`, and `Sold Out`.
- The app also demonstrates product concepts like POS sync, geofencing, crowd verification, sell-out prediction, and wait-time intelligence.

## Important Note About Data

This project currently uses mock and local client-side data.

- Restaurant and menu content is stored in:
  - `lib/restaurants.ts`
  - `lib/data.ts`
- Business dashboard inventory state is currently managed in client state inside:
  - `app/page.tsx`
- Authentication is mock/local only:
  - accounts are stored in `localStorage`
  - the current session is stored in `localStorage`
  - auth helpers live in `lib/auth.ts`
- Business signup posts to `/api/vendor-signups`, but this endpoint is currently a mock API response and does not persist to a database.

This means:

- refreshing the page keeps the logged-in session if `localStorage` still exists in the browser
- account data is browser-local, not shared across devices
- inventory changes are not backed by a real database yet
- this is suitable for demo, prototype, and hackathon use, but not production persistence

## Main App Flows

### Customer Flow

1. Open the app and browse cook shops and menu items.
2. Use `/auth?type=customer&mode=signup` or `/auth?type=customer&mode=login`.
3. Logged-in customers see the customer experience, including the inside-shop prompt and customer notifications.

### Business Flow

1. Open `/auth?type=business&mode=signup` or `/auth?type=business&mode=login`.
2. After login, the business account lands on the business dashboard view on `/`.
3. The dashboard allows one-tap updates for item status:
   - `Available`
   - `Low`
   - `Sold Out`

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Production Build

Run the production build:

```bash
npm run build
```

Start the production server locally:

```bash
npm run start
```

## Vercel Deployment

This app is suitable for deployment on Vercel.

### Recommended Vercel Setup

- Framework preset: `Next.js`
- Build command: `npm run build`
- Install command: `npm install`
- Output setting: default Next.js output

No environment variables are currently required for the mock version.

## Current Limitations

- No real database
- No real authentication provider
- No real POS integration
- No real push notification infrastructure
- No real geofencing runtime integration yet

These features are represented in the UI and flow, but remain mock/demo logic until connected to backend services.

## Verification

The project should be verified with:

```bash
npm run build
```

If you want linting, note that `eslint` is referenced in `package.json` but is not currently installed in this workspace.
