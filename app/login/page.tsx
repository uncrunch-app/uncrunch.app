'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLazyGetUserDataQuery } from '../services/github';

const LoginPage = () => {
  const [token, setToken] = useState('');
  const [service, setService] = useState<'github' | 'forgejo'>('github');
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [triggerGetUserData] = useLazyGetUserDataQuery();

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    let name = null;
    let email = null;
    let image = null;

    if (service === 'github') {
      const { data, error: githubError } = await triggerGetUserData({ token });

      if (githubError) {
        setError((githubError as any).data?.message || 'Invalid GitHub token');
        return;
      }

      // Если запрос успешен, извлекаем данные пользователя
      name = data?.name || null;
      email = data?.email || null;
      image = data?.avatar_url || null;
    }

    const provider = service === 'github' ? 'github-token' : 'forgejo-token';
    const result = await signIn(provider, { token, redirect: false, callbackUrl, name, email, image });

    if (result?.error) {
      setError(result.error || 'Invalid token or login failed');
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
