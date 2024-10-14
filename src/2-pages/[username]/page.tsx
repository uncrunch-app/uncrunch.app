//// app/home/page.tsx
////'use client';

//import { useGetUserDataQuery, UserCard } from '@/src/5-entities/user';
//import { SignOutButton } from '@/src/6-shared/ui';
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
//          <SignOutButton />
//        </div>
//      ) : (
//        <div>Loading</div>
//      )}*/}
//    </div>
//  );
//}

// app/[username]/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions, CustomSessionUser } from '@/app/api/auth/authOptions'
import { notFound, redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

interface HomePageProps {
  params: {
    username: string
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const session = await getServerSession(authOptions)
  const t = await getTranslations('HomePage');
  const customUser = session?.user as CustomSessionUser

  const { username } = params
  const sessionUsername = `~${customUser.login}`
  
  if (sessionUsername !== username) {
    return redirect('/')
  }

  return (
    <div style={{ margin: '20px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '900' }}>
        {t('welcome', {username})}
      </h1>
      <p>{t('message')}</p>
    </div>
  )
}
