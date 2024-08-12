'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';

const LoginPage = () => {
  const [token, setToken] = useState('');
  const [service, setService] = useState<'github' | 'forgejo'>('github');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const provider = service === 'github' ? 'github-token' : 'forgejo-token';
    await signIn(provider, { token, callbackUrl: '/' });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="service"
              value="github"
              checked={service === 'github'}
              onChange={() => setService('github')}
            />
            GitHub
          </label>
          <label>
            <input
              type="radio"
              name="service"
              value="forgejo"
              checked={service === 'forgejo'}
              onChange={() => setService('forgejo')}
            />
            Forgejo
          </label>
        </div>
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={`Enter your ${service === 'github' ? 'GitHub' : 'Forgejo'} token`}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
