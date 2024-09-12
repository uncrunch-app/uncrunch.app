'use client';

//import { getServerSession } from 'next-auth';
import LogoutButton from '@/src/6-shared/ui/buttons/SignOutButton';
//import { authOptions } from '@/app/api/auth/[...nextauth]/route';

//export default async function Header() {
//  const session = await getServerSession(authOptions);

//  return (
//    <header>{session?.user ? <SignOutButton /> : <p>Please log in</p>}</header>
//  );
//}

import { FC, memo } from 'react';
//import styled from 'styled-components';
//import { LogoutButton } from '@/4-features/logout';
//import { COLOR_CREAM, COLOR_GREEN } from '@/src/6-shared/constants';
//import { UserCard } from '@/src/5-entities/user';
//import { useGetUserQuery } from '@/src/5-entities/user';
import { Logo } from '@/src/6-shared/ui/logo';
//import { RepoInfo } from '@/src/3-widgets/repos';
import styles from './Header.module.scss';

const Header: FC = () => {
  //const { data } = useGetUserQuery();

  return (
    <div className={styles.headerContainer}>
      <Logo width="48px" height="48px" />
      <div className={styles.userInfo}>
        {/*<RepoInfo />*/}
        {/*{data && <UserCard user={data} />}*/}
        <LogoutButton />
      </div>
    </div>
  );
};

export default memo(Header);
