export interface FoodItem {
  id: string
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  time: string
  status: 'ready' | 'cooking' | 'sold-out'
  category: string
  vendor: string
  distance: string
  popularity: 'quiet' | 'moderate' | 'busy'
}

export interface Category {
  id: string
  name: string
  icon: string
}

export const categories: Category[] = [
  { id: 'jerk', name: 'Jerk', icon: '🍗' },
  { id: 'patties', name: 'Patties', icon: '🥟' },
  { id: 'rice', name: 'Rice & Peas', icon: '🍚' },
  { id: 'soup', name: 'Soup', icon: '🍲' },
  { id: 'seafood', name: 'Seafood', icon: '🦐' },
  { id: 'dessert', name: 'Dessert', icon: '🍰' },
]

export const foodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Jerk Chicken',
    price: 1100,
    rating: 4.8,
    reviews: 420,
    image: '/images/jerk-chicken.jpg',
    time: '15 min',
    status: 'ready',
    category: 'jerk',
    vendor: 'PeppaThyme',
    distance: 'Constant Spring Rd',
    popularity: 'busy',
  },
  {
    id: '2',
    name: 'Ackee & Saltfish Plate',
    price: 850,
    rating: 4.7,
    reviews: 310,
    image: '/images/ackee-saltfish.jpg',
    time: '12 min',
    status: 'ready',
    category: 'seafood',
    vendor: 'Porridge Shoppe',
    distance: 'Oaklands Plaza',
    popularity: 'moderate',
  },
  {
    id: '3',
    name: 'Curry Goat',
    price: 1200,
    rating: 4.9,
    reviews: 320,
    image: '/images/curry-goat.jpg',
    time: '20 min',
    status: 'cooking',
    category: 'rice',
    vendor: 'Charmaine’s Cook Shop',
    distance: 'West Street',
    popularity: 'busy',
  },
  {
    id: '4',
    name: 'Fried Fish',
    price: 2200,
    rating: 4.6,
    reviews: 280,
    image: '/images/escovitch-fish.jpg',
    time: '22 min',
    status: 'ready',
    category: 'seafood',
    vendor: 'Aunt Merl’s Fish & Lobster',
    distance: 'Hellshire Beach',
    popularity: 'moderate',
  },
  {
    id: '5',
    name: 'Oxtail Stew',
    price: 1500,
    rating: 4.9,
    reviews: 560,
    image: '/images/oxtail-stew.jpg',
    time: '25 min',
    status: 'cooking',
    category: 'rice',
    vendor: 'Triple T’z Eatery',
    distance: 'Annette Crescent',
    popularity: 'busy',
  },
  {
    id: '6',
    name: 'Festival',
    price: 100,
    rating: 4.5,
    reviews: 720,
    image: '/images/festival.jpg',
    time: '8 min',
    status: 'ready',
    category: 'dessert',
    vendor: 'PeppaThyme',
    distance: 'Constant Spring Rd',
    popularity: 'quiet',
  },
  {
    id: '7',
    name: 'Pan Chicken',
    price: 600,
    rating: 4.4,
    reviews: 190,
    image: '/images/jerk-chicken.jpg',
    time: '10 min',
    status: 'ready',
    category: 'jerk',
    vendor: 'Northside Pan Chicken',
    distance: 'Northside Drive',
    popularity: 'quiet',
  },
  {
    id: '8',
    name: 'Escovitch Fish',
    price: 1800,
    rating: 4.7,
    reviews: 340,
    image: '/images/escovitch-fish.jpg',
    time: '18 min',
    status: 'ready',
    category: 'seafood',
    vendor: 'Hellshire Fish Shacks',
    distance: 'Hellshire Beach',
    popularity: 'moderate',
  },
]

export const trendingItems = foodItems.filter(item => item.reviews > 300)
export const popularItems = foodItems.filter(item => item.rating >= 4.7)
