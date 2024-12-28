import LoginPage from './LoginPage'
import { LoggedInUser } from './LoggedInUser'
import { getServerSessionUser } from '@/shared/utils/getServerSessionUser'

export default async function Login() {
  const user = await getServerSessionUser()

  if (user) {
    return <LoggedInUser username={user.login} />
  }

  return <LoginPage />
}
