import { FC, memo } from 'react'
import { Logo } from '@/src/6-shared/ui/logo'
import styles from './Header.module.scss'
import { authOptions, CustomSessionUser } from '@/app/api/auth/authOptions'
import { getServerSession } from 'next-auth'
import UserMenu from '@/src/5-entities/user/ui/UserMenu/UserMenu'
import Link from 'next/link'
import { routePaths } from '@/src/6-shared/services/routePaths'

const Header: FC = async () => {
  const session = await getServerSession(authOptions)

  const customUser = session?.user as CustomSessionUser
  const usernameRoute = routePaths.root(customUser.login!)

  return (
    <div className="flex justify-between bg-primary-200 px-5 py-[10px] shadow-medium">
      <Link href={usernameRoute}>
        <Logo
          width="48px"
          height="48px"
        />
      </Link>
      <div className={styles.userInfo}>
        {customUser && <UserMenu customUser={customUser} />}
      </div>
    </div>
  )
}

export default memo(Header)
