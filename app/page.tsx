/* eslint-disable @next/next/no-img-element */

'use client';

import { useSession, signOut } from 'next-auth/react';
import { useGetUserDataQuery } from './services/github';

const HomePage = () => {
  const { data: session } = useSession();
  const { data: userData, error, isLoading } = useGetUserDataQuery();

  console.log(session);

  return (
    <div>
      <h1>Welcome</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching data</p>}
      {userData && (
        <div>
          <img
            src={userData.avatar_url}
            alt={userData.name}
            width={50}
            height={50}
          />
          <p>{userData.name}</p>
        </div>
      )}
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default HomePage;
