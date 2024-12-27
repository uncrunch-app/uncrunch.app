//// app/home/page.tsx
////'use client';

//import { useGetUserDataQuery, UserCard } from '@/entities/user';
//import { LogOutButton } from '@/shared/ui';
//import { useSession } from 'next-auth/react';
//import Image from 'next/image';
//import { useEffect, useState } from 'react';
//import { getServerSession } from 'next-auth/next';
//import { authOptions, CustomSessionUser } from '@/app/api/auth/authOptions';

//export default async function HomePage() {
//  //const { data: session } = useSession();
//  //const [token, setToken] = useState('');

//  //const { data, isLoading } = useGetUserDataQuery({ token });

//  //useEffect(() => {
//  //  if (session?.user) {
//  //    const user = session.user as CustomSessionUser;
//  //    setToken(user.token); // Теперь тип уже должен быть правильно определен
//  //  }
//  //}, [session]);

//  //// Печатаем данные после получения
//  //useEffect(() => {
//  //  if (data) {
//  //    console.log('fgdgdfg', data);
//  //  }
//  //}, [data]);

//  const session = await getServerSession(authOptions);

//  const customUser = session?.user as CustomSessionUser;

//  return (
//    <div>
//      <h1>Welcome</h1>
//      {customUser && (
//        <UserCard
//          login={customUser.login!}
//          avatar_url={customUser.image!}
//          name={customUser.name!}
//        />
//      )}
//      {/*{data && !isLoading ? (
//        <div>
//          <Image
//            src={data.avatar_url}
//            alt={data.name || ''}
//            width={50}
//            height={50}
//          />

//          <p>{data.name}</p>
//          <p>{data.email}</p>
//          <p>@{data.login}</p>
//          <LogOutButton />
//        </div>
//      ) : (
//        <div>Loading</div>
//      )}*/}
//    </div>
//  );
//}

// app/[username]/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions, CustomSessionUser } from '@/next-app/api/auth/authOptions'
import { notFound, redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import LocaleSwitcher from '@/shared/ui/LocaleSwitcher'
import ThemeSelector from '@/shared/ui/ThemeSelector'
import Link from 'next/link'
import { ROUTES } from '@/shared/config'
import { getServerSessionUser } from '@/shared/utils/getServerSessionUser'

interface HomePageProps {
  params: {
    username: string
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const t = await getTranslations('Pages.home')
  const sessionUser = await getServerSessionUser()

  if (!sessionUser) return

  const { username } = params

  return (
    <div style={{ margin: '20px' }}>
      <Link href={ROUTES.teapot}>418</Link>
      <h1
        className="text-foreground-800"
        style={{ fontSize: '2rem', fontWeight: '900' }}
      >
        {t('welcome', { username })}
      </h1>
      <p className="text-foreground-900">{t('message')}</p>
      <LocaleSwitcher />
      <ThemeSelector />
    </div>
  )
}
