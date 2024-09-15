import LogoutButton from '@/src/6-shared/ui/buttons/SignOutButton'
import { FC, memo } from 'react'
//import { LogoutButton } from '@/4-features/logout';
import { UserCard } from '@/src/5-entities/user'
import { Logo } from '@/src/6-shared/ui/logo'
//import { RepoInfo } from '@/src/3-widgets/repos';
import styles from './Header.module.scss'
import {
  authOptions,
  CustomSessionUser,
} from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const Header: FC = async () => {
  const session = await getServerSession(authOptions)

  const customUser = session?.user as CustomSessionUser

  return (
    <div className={styles.headerContainer}>
      <Logo width="48px" height="48px" />
      <div className={styles.userInfo}>
        <LogoutButton />
      </div>

      {customUser && (
        <UserCard
          login={customUser.login!}
          avatar_url={customUser.image!}
          name={customUser.name!}
        />
      )}
    </div>
  )
}

export default memo(Header)
