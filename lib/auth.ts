export type AccountType = 'customer' | 'business'

export interface AppAccount {
  type: AccountType
  email: string
  password: string
  name: string
  businessName?: string
  location?: string
  phoneNumber?: string
}

export interface AppSession {
  email: string
  type: AccountType
}

const ACCOUNTS_KEY = 'linkdifood_accounts'
const SESSION_KEY = 'linkdifood_session'

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getAccounts(): AppAccount[] {
  if (!canUseStorage()) return []

  const raw = window.localStorage.getItem(ACCOUNTS_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw) as AppAccount[]
  } catch {
    return []
  }
}

export function saveAccount(account: AppAccount) {
  if (!canUseStorage()) return

  const accounts = getAccounts()
  const next = accounts.filter(
    (entry) => !(entry.email === account.email && entry.type === account.type),
  )
  next.push(account)
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(next))
}

export function findAccount(email: string, type: AccountType) {
  return getAccounts().find((account) => account.email === email && account.type === type) || null
}

export function setSession(session: AppSession) {
  if (!canUseStorage()) return
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function getSession(): AppSession | null {
  if (!canUseStorage()) return null

  const raw = window.localStorage.getItem(SESSION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as AppSession
  } catch {
    return null
  }
}

export function clearSession() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(SESSION_KEY)
}
