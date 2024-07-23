'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const LoginPage = () => {
  const [token, setToken] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn('credentials', { token, callbackUrl: '/' });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Enter your GitHub token"
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
