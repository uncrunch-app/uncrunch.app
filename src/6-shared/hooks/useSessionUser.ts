import { useSession } from 'next-auth/react'

const useSessionUser = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return { sessionUser: null, isLoading: true }
  }

  if (status === 'authenticated' && session?.user) {
    const sessionUser = session.user
    return { sessionUser, isLoading: false }
  }

  return { sessionUser: null, isLoading: false }
}

export default useSessionUser
