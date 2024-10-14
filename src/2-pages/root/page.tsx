// app/page.tsx
import { redirect } from 'next/navigation'
import { getUsername } from '@/src/6-shared/services/getUsername'

export default async function RootPage() {
  const username = await getUsername()
  const usernamePath = `/~${username}`

  redirect(usernamePath)
}
