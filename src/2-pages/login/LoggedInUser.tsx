import { LogOutButton } from '@/src/6-shared/ui'

interface LoggedInUserProps {
  username: string
}

export const LoggedInUser: React.FC<LoggedInUserProps> = ({ username }) => {
  return (
    <div>
      <h1>Вы уже авторизованы как @{username}</h1>
      <LogOutButton />
    </div>
  )
}
