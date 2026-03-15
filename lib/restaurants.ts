export type Category = 'all' | 'breakfast' | 'lunch' | 'dinner'

export type Restaurant = {
  slug: string
  name: string
  category: Exclude<Category, 'all'>
  img: string
  location: string
  parish: string
  description: string
  specialties: string[]
  eta: string
  price: string
  featuredNote: string
}

export type VendorSignupPayload = {
  businessName: string
  location: string
  phoneNumber: string
}

export const restaurants: Restaurant[] = [
  {
    slug: 'peppathyme-constant-spring',
    name: 'PeppaThyme',
    category: 'lunch',
    img: '/images/jerk-chicken.jpg',
    location: '152 Constant Spring Road, Kingston, Jamaica',
    parish: 'Kingston',
    description:
      'Modern jerk stop known for smoky jerk chicken, jerk pork, wings, festival, bammy, and Jamaican puddings.',
    specialties: ['Jerk chicken', 'Jerk pork', 'Festival'],
    eta: '15-22 min',
    price: '$$',
    featuredNote: 'Strong lunch pick for jerk chicken on Constant Spring Road.',
  },
  {
    slug: 'porridge-shoppe-oaklands',
    name: 'Porridge Shoppe',
    category: 'breakfast',
    img: '/images/ackee-saltfish.jpg',
    location: 'Oaklands Plaza, 114-116 Constant Spring Road, Kingston, Jamaica',
    parish: 'Kingston',
    description:
      'Breakfast-focused cookshop serving Jamaican porridges, ackee and saltfish plates, dumplings, and saltfish fritters.',
    specialties: ['Peanut porridge', 'Hominy porridge', 'Ackee and saltfish'],
    eta: '8-14 min',
    price: '$',
    featuredNote: 'Best fit for early-morning porridge runs in the Constant Spring area.',
  },
  {
    slug: 'triple-tz-eatery-kingston',
    name: 'Triple T’z Eatery',
    category: 'dinner',
    img: '/images/oxtail-stew.jpg',
    location: '1 Annette Crescent, Kingston 10, Jamaica',
    parish: 'Kingston',
    description:
      'All-day Jamaican diner with breakfast staples and heavier plates like oxtail, curry goat, jerk chicken, and tripe.',
    specialties: ['Oxtail', 'Curry goat', 'Ackee and saltfish'],
    eta: '18-28 min',
    price: '$$',
    featuredNote: 'Known for wide menu coverage from breakfast through dinner.',
  },
  {
    slug: 'charmaines-cook-shop-port-antonio',
    name: 'Charmaine’s Cook Shop',
    category: 'lunch',
    img: '/images/curry-goat.jpg',
    location: '39 West Street, Port Antonio, Portland, Jamaica',
    parish: 'Portland',
    description:
      'Roadside homestyle cookshop serving curried goat, fried chicken, curried chicken, stewed pork, beef, and turkey neck.',
    specialties: ['Curried goat', 'Fried chicken', 'Stewed turkey neck'],
    eta: '16-24 min',
    price: '$$',
    featuredNote: 'A strong Port Antonio local-stop option for traditional cooked lunches.',
  },
  {
    slug: 'aunt-merls-fish-and-lobster-hellshire',
    name: 'Aunt Merl’s Fish & Lobster',
    category: 'lunch',
    img: '/images/escovitch-fish.jpg',
    location: 'Hellshire Beach, St. Catherine, Jamaica',
    parish: 'St. Catherine',
    description:
      'Beachside seafood shack where customers choose fish or lobster and it is cooked fresh over wood fire.',
    specialties: ['Fried fish', 'Lobster', 'Pickled onions'],
    eta: '20-35 min',
    price: '$$$',
    featuredNote: 'Best when you want fresh seaside seafood rather than a fixed lunch menu.',
  },
  {
    slug: 'northside-pan-chicken-kingston',
    name: 'Northside Pan Chicken',
    category: 'dinner',
    img: '/images/festival.jpg',
    location: '11 Northside Drive, Kingston, Jamaica',
    parish: 'Kingston',
    description:
      'Night-time street-food stop serving spicy pan chicken from drum grills with hardough bread and fast roadside service.',
    specialties: ['Pan chicken', 'Hardough bread', 'Pepper sauce'],
    eta: '10-18 min',
    price: '$',
    featuredNote: 'Good late-evening option when you want quick roadside chicken in Kingston.',
  },
  {
    slug: 'hellshire-fish-shacks',
    name: 'Hellshire Fish Shacks',
    category: 'breakfast',
    img: '/images/mannish-water.jpg',
    location: 'Hellshire Beach strip, St. Catherine, Jamaica',
    parish: 'St. Catherine',
    description:
      'Local beach strip known for small family-run seafood spots and strong weekend demand.',
    specialties: ['Fried fish', 'Soup', 'Festival'],
    eta: '18-30 min',
    price: '$',
    featuredNote: 'Useful as a discovery cluster when customers want local Hellshire seafood options.',
  },
]

export const filterButtons: Category[] = ['all', 'breakfast', 'lunch', 'dinner']

export function getRestaurantBySlug(slug: string) {
  return restaurants.find((restaurant) => restaurant.slug === slug)
}
