import { FC, memo } from 'react'
import { Logo } from '@/src/6-shared/ui/logo'
import styles from './Header.module.scss'
import { authOptions, CustomSessionUser } from '@/app/api/auth/authOptions'
import { getServerSession } from 'next-auth'
import UserMenu from '@/src/5-entities/user/ui/UserMenu/UserMenu'
import Link from 'next/link'
import { routes } from '@/src/6-shared/services/routes'
import { getServerSessionUser } from '@/src/6-shared/services/getServerSessionUser'

const Header: FC = async () => {
  const user = await getServerSessionUser()

  const usernameRoute = routes.home(user ? user.login : '/')

  return (
    <div className="flex justify-between bg-secondary-200 px-5 py-[10px] shadow-medium">
      <Link href={usernameRoute}>
        <Logo width="48px" height="48px" />
      </Link>
      <div className={styles.userInfo}>
        {user && <UserMenu user={user} />}
      </div>
    </div>
  )
}

export default memo(Header)
