import { useSession } from 'next-auth/react'

export function useUsername() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return { username: null, isLoading: true }
  }

  if (status === 'authenticated' && session?.user) {
    const customUser = session.user
    return { username: customUser.login, isLoading: false }
  }

  return { username: null, isLoading: false }
}
