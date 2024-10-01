//import SignOutButton from '@/src/6-shared/ui/buttons/SignOutButton'
import { FC, memo } from 'react'
//import { SignOutButton } from '@/4-features/logout';
import { UserCard } from '@/src/5-entities/user'
import { Logo } from '@/src/6-shared/ui/logo'
//import { RepoInfo } from '@/src/3-widgets/repos';
import styles from './Header.module.scss'
import { authOptions, CustomSessionUser } from '@/app/api/auth/authOptions'
import { getServerSession } from 'next-auth'
import UserMenu from '@/src/5-entities/user/ui/UserMenu/UserMenu'

const Header: FC = async () => {
  const session = await getServerSession(authOptions)

  const customUser = session?.user as CustomSessionUser

  return (
    <div className={styles.headerContainer}>
      <Logo width="48px" height="48px" />
      <div className={styles.userInfo}>
        {customUser && <UserMenu customUser={customUser} />}
        {/*<SignOutButton />*/}
      </div>
    </div>
  )
}

export default memo(Header)
