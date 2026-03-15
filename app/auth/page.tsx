import { AuthScreen, type AccountType, type AuthMode } from '@/components/auth-screen'

type AuthPageProps = {
  searchParams: Promise<{
    type?: string
    mode?: string
  }>
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams

  const initialType: AccountType = params.type === 'business' ? 'business' : 'customer'
  const initialMode: AuthMode = params.mode === 'login' ? 'login' : 'signup'

  return <AuthScreen initialType={initialType} initialMode={initialMode} />
}
