'use client';

import { signOut, useSession } from 'next-auth/react';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header>
      {session && <button onClick={() => signOut()}>Sign Out</button>}
    </header>
  );
};

export default Header;
