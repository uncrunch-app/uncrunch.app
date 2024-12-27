// app/login/page.tsx (серверный компонент)
import LoginPage from './LoginPage'
import { LoggedInUser } from './LoggedInUser'
import { getServerSessionUser } from '@/shared/utils/getServerSessionUser'

export default async function Login() {
  const user = await getServerSessionUser()

  if (user) {
    // Если пользователь авторизован
    return <LoggedInUser username={user.login} />
  }

  // Если пользователь не авторизован
  return <LoginPage />
}
