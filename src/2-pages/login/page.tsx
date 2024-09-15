'use client';

import { signIn, useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GitServiceType } from '@/src/6-shared/types';
import { useLazyGetUserDataQuery } from '@/src/5-entities/user';
import { CustomSessionUser } from '../../../app/api/auth/[...nextauth]/route';
import { SignOutButton } from '@/src/6-shared/ui';

const LoginPage = () => {
  const [token, setToken] = useState('');
  const [service, setService] = useState<GitServiceType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [triggerGetUserData] = useLazyGetUserDataQuery();

  const { data: session, status } = useSession();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    let name = null;
    let login = null;
    let image = null;

    if (service === 'github') {
      const { data, error: githubError } = await triggerGetUserData({ token });

      if (githubError) {
        setError((githubError as any).data?.message || 'Invalid GitHub token');
        return;
      }

      name = data?.name || null;
      login = data?.login || null;
      image = data?.avatar_url || null;
    }

    const provider = service === 'github' ? 'github-token' : 'forgejo-token';
    const result = await signIn(provider, {
      token,
      redirect: false,
      callbackUrl,
      name,
      login,
      image,
    });

    if (result?.error) {
      setError(result.error || 'Invalid token or login failed');
    } else {
      router.push(callbackUrl);
    }
  };

  // Показываем индикатор загрузки, пока сессия не определена
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  // Если пользователь уже авторизован, рендерим сообщение
  if (status === 'authenticated' && session?.user) {
    const user = session.user as CustomSessionUser;
    return (
      <div>
        <h1>Вы уже авторизованы как {user.name || user.login}</h1>
        <SignOutButton />
      </div>
    );
  }

  // Если пользователь не авторизован, рендерим форму авторизации
  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {service === null ? (
        <div>
          <button onClick={() => setService('github')}>
            Authorize with GitHub Token
          </button>
          <button onClick={() => setService('forgejo')}>
            Authorize with Forgejo Token
          </button>
        </div>
      ) : (
        <div>
          <h2>
            {service === 'github'
              ? 'GitHub Authorization'
              : 'Forgejo Authorization'}
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={`Enter your ${
                service === 'github' ? 'GitHub' : 'Forgejo'
              } token`}
            />
            <button type="submit">Sign In</button>
            <button type="button" onClick={() => setService(null)}>
              Back
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
