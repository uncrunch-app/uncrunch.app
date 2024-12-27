// middleware.ts
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { ROUTES } from '@/shared/config'

const STATIC_PATHS = ['/_next', '/static', '/favicon', '/favicons']

const authMiddleware = withAuth({
  pages: {
    signIn: ROUTES.login,
    signOut: ROUTES.login,
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

const redirectToLoginRoute = (req: NextRequestWithAuth) => {
  const callbackUrl = `${req.nextUrl.pathname}${req.nextUrl.search}`
  const loginUrl = new URL(ROUTES.loginWithCallback(callbackUrl), req.url)

  return NextResponse.redirect(loginUrl)
}

const redirectToUsernameRoute = (
  req: NextRequestWithAuth,
  token: any
): NextResponse => {
  const { pathname } = req.nextUrl
  const currentUsername = `~${token.login}`
  const requestedUsername = pathname.split('/')[1] || ''

  if (currentUsername !== requestedUsername) {
    const newPathname = pathname.replace(requestedUsername, currentUsername)
    const url = req.nextUrl.clone()
    url.pathname = newPathname
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export default async function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const authResponse = authMiddleware(req, event)
  const pathname = req.nextUrl.pathname
  const isStaticPath = STATIC_PATHS.some((prefix) =>
    pathname.startsWith(prefix)
  )

  if (isStaticPath) {
    return NextResponse.next()
  }

  if (!token && pathname === ROUTES.root) {
    return NextResponse.next()
  }

  if (!token) {
    return redirectToLoginRoute(req)
  }

  return redirectToUsernameRoute(req, token)
}

export const config = {
  matcher: ['/((?!login|favicons|api|_next|static|bad_credentials|418).*)'],
}
