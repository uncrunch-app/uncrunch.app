// middleware.ts

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextFetchEvent } from 'next/server';

const authMiddleware = withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
});

export default function middleware(req: NextRequestWithAuth, event: NextFetchEvent) {
  // Применяем мидлвар аутентификации
  const authResponse = authMiddleware(req, event);

  // Возвращаем ответ
  return authResponse;
}

export const config = {
  matcher: [
    '/((?!login|locales|favicons|api).*)', // Защищаем все маршруты, кроме указанных
  ],
};
