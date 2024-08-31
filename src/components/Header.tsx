// app/components/Header.tsx

import { getServerSession } from 'next-auth';
import SignOutButton from './SignOutButton'; // Импортируем клиентский компонент
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Header() {
  // Получаем данные сессии на сервере
  const session = await getServerSession(authOptions);

  return (
    <header>
      {session?.user ? (
        // Если есть сессия, рендерим клиентский компонент
        <SignOutButton />
      ) : (
        <p>Please log in</p>
      )}
    </header>
  );
}
