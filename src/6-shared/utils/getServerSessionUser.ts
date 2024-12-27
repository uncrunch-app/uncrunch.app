'use server'

import { authOptions } from '@/next-app/api/auth/authOptions'
import { getServerSession } from 'next-auth/next'
import { ERRORS } from '../config'

export async function getServerSessionUser() {
  const session = await getServerSession(authOptions)

  if (!session) {
    console.error(ERRORS.session.userNotFound)
    return null
  }

  return session.user
}
