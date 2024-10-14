import { CustomSessionUser } from '@/app/api/auth/authOptions'
import { useSession } from 'next-auth/react'

export function useUsername() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return { username: null, isLoading: true }
  }

  if (status === 'authenticated' && session?.user) {
    const customUser = session.user as CustomSessionUser
    return { username: customUser.login, isLoading: false }
  }

  return { username: null, isLoading: false }
}
