'use server'

import { authOptions } from '@/app/api/auth/authOptions'
import type { CustomSessionUser } from '@/app/api/auth/authOptions'
import { getServerSession } from 'next-auth/next'

export async function getServerSessionData() {
  const session = await getServerSession(authOptions)
  const user = session?.user as CustomSessionUser
  
  if (!user) {
    throw new Error('User not found in session')
  }

  return user
}
