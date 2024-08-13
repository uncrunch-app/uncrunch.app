/* eslint-disable @next/next/no-img-element */

'use client';

import { useSession, signOut } from 'next-auth/react';

const HomePage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Welcome</h1>
      {session?.user && (
        <div>
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name || ''}
              width={50}
              height={50}
            />
          )}
          <p>{session.user.name}</p>
          <p>{session.user.email}</p>
        </div>
      )}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default HomePage;
