'use server'

import { authOptions } from '@/app/api/auth/authOptions'
import type { CustomSessionUser } from '@/app/api/auth/authOptions'
import { getServerSession } from 'next-auth/next'

export async function getUsername() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return null
  }

  const customUser = session.user as CustomSessionUser

  return customUser.login
}
