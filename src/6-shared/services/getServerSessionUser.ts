'use server'

import { authOptions } from '@/app/api/auth/authOptions'
import { getServerSession } from 'next-auth/next'

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions)

  if (!session) {
    console.error('User not found in session')
    return null
  }

  return session.user
}
