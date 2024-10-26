import { getSession } from 'next-auth/react'
import error from './errorMessages'

export const getSessionUser = async () => {
  const session = await getSession() 

  if (!session) {
    throw new Error(error.session.userNotFound)
  }

  return session.user
}
