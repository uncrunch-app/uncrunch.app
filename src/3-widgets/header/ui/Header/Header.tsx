import { FC, memo } from 'react'
import { Logo } from '@/shared/ui/logo'
import styles from './Header.module.scss'
import { authOptions, CustomSessionUser } from '@/next-app/api/auth/authOptions'
import { getServerSession } from 'next-auth'
import UserMenu from '@/entities/user/ui/UserMenu/UserMenu'
import Link from 'next/link'
import { ROUTES } from '@/shared/config'
import { getServerSessionUser } from '@/shared/utils/getServerSessionUser'

const Header: FC = async () => {
  const user = await getServerSessionUser()

  const usernameRoute = ROUTES.home(user ? user.login : ROUTES.root)

  return (
    <div className="flex justify-between bg-secondary-200 px-5 py-[10px] shadow-medium">
      <Link href={usernameRoute}>
        <Logo width="48px" height="48px" />
      </Link>
      <div className={styles.userInfo}>{user && <UserMenu user={user} />}</div>
    </div>
  )
}

export default memo(Header)
