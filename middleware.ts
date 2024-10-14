// middleware.ts

import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextFetchEvent } from 'next/server'

const authMiddleware = withAuth({
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export default function middleware(
  req: NextRequestWithAuth,
  event: NextFetchEvent
) {
  
  const authResponse = authMiddleware(req, event)

  return authResponse
}

export const config = {
  matcher: [
    '/((?!login|locales|favicons|api).*)',
  ],
}
