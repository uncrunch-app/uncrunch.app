// app/components/Header.tsx

import { getServerSession } from 'next-auth';
import SignOutButton from './SignOutButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header>
      {session?.user ? (
        <SignOutButton />
      ) : (
        <p>Please log in</p>
      )}
    </header>
  );
}
