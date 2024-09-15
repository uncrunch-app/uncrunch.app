// middleware.ts

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
});

export const config = {
  matcher: [
    /*
     * Используем регулярное выражение для исключения маршрута /login.
     * Защищаем все маршруты, кроме /login и любых его дочерних маршрутов.
     */
    '/((?!login).*)',
  ],
};
