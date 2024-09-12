'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLazyGetUserDataQuery } from '../services/github';
import { GitServiceType } from '@/src/6-shared/types';

const LoginPage = () => {
  const [token, setToken] = useState('');
  const [service, setService] = useState<GitServiceType | null>(null);
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

      {service === null ? (
        <div>
          <button onClick={() => setService('github')}>Authorize with GitHub Token</button>
          <button onClick={() => setService('forgejo')}>Authorize with Forgejo Token</button>
        </div>
      ) : (
        <div>
          <h2>{service === 'github' ? 'GitHub Authorization' : 'Forgejo Authorization'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={`Enter your ${service === 'github' ? 'GitHub' : 'Forgejo'} token`}
            />
            <button type="submit">Sign In</button>
            <button type="button" onClick={() => setService(null)}>Back</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
