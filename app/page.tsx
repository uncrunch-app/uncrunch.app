// app/home/page.tsx

import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SignOutButton from '@/src/components/SignOutButton';
import Image from 'next/image';

export default async function HomePage() {
  // Получение данных сессии на сервере
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Welcome</h1>
      {session?.user && (
        <div>
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || ''}
              width={50}
              height={50}
            />
          )}
          <p>{session.user.name}</p>
          {session.user.email && <p>{session.user.email}</p>}
          {/* Вставляем клиентский компонент */}
          <SignOutButton />
        </div>
      )}
    </div>
  );
}