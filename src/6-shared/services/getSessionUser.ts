import { getSession } from 'next-auth/react'


export const getSessionUser = async () => {
  const session = await getSession()
  
  if (!session) {
    throw new Error('User not found in session')
  }
  
  return session.user
}
