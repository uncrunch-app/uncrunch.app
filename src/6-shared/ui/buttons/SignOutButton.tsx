'use client'; // Указываем, что это клиентский компонент

import { signOut } from 'next-auth/react';

const SignOutButton = () => {
  return (
    <button onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
