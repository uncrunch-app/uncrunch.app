// middleware.ts
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Добавляем авторизацию через next-auth
const authMiddleware = withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const { pathname } = req.nextUrl

  // Исключаем запросы к статике и Next.js путям
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/favicons')
  ) {
    return NextResponse.next() // Пропускаем запросы к статике и ресурсам Next.js
  }

  // Выполняем авторизацию с помощью next-auth
  const authResponse = authMiddleware(req, event)
  if (authResponse instanceof NextResponse) {
    return authResponse // Если требуется редирект по авторизации, выполняем его
  }

  // Проверяем, авторизован ли пользователь через токен
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Если токен отсутствует, пропускаем запрос дальше
  if (!token || !token.login) {
    return NextResponse.next()
  }

  const currentUsername = `~${token.login}`
  const requestedUsername = pathname.split('/')[1] // Получаем запрашиваемого пользователя

  // Если запрашиваемый пользователь не совпадает с текущим пользователем
  if (currentUsername !== requestedUsername) {
    const newPathname = pathname.replace(requestedUsername, currentUsername)
    const url = req.nextUrl.clone()
    url.pathname = newPathname
    return NextResponse.redirect(url) // Выполняем редирект на правильный путь
  }

  return NextResponse.next() // Продолжаем выполнение, если всё совпадает
}

export const config = {
  matcher: ['/((?!login|locales|favicons|api|_next|static).*)'],
}
