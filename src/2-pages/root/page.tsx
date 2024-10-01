// app/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import {
  authOptions,
  CustomSessionUser,
} from '@/app/api/auth/authOptions'

export default async function RootPage() {
  const session = await getServerSession(authOptions)

  const customUser = session?.user as CustomSessionUser
  const username = `/~${customUser.login}`

  redirect(username)

  return null
}
