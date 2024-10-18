// app/login/page.tsx (серверный компонент)
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/authOptions'
import LoginPage from './LoginPage'
import { CustomSessionUser } from '@/app/api/auth/authOptions'
import { LoggedInUser } from './LoggedInUser'

export default async function Login() {
  const session = await getServerSession(authOptions)
  const user = session?.user as CustomSessionUser | null

  if (user) {
    // Если пользователь авторизован
    return <LoggedInUser username={user.login} />
  }

  // Если пользователь не авторизован
  return <LoginPage />
}
