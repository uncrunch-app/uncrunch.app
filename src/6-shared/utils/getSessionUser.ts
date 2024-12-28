import { getSession } from 'next-auth/react'
import { ERRORS } from '@/shared/config'

export const getSessionUser = async () => {
  const session = await getSession()

  if (!session) {
    throw new Error(ERRORS.session.userNotFound)
  }

  return session.user
}
