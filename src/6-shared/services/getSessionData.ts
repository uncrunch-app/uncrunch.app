import type { CustomSessionUser } from '@/app/api/auth/authOptions'
import { getSession } from 'next-auth/react'


export const getSessionData = async () => {
  const session = await getSession()
  const user = session?.user as CustomSessionUser
  
  if (!user) {
    throw new Error('User not found in session')
  }
  
  return user
}
