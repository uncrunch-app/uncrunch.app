import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { GitServiceType } from '@/src/6-shared/types'

interface BaseUserInfo {
  name?: string | null
  login?: string | null
  image?: string | null
  service: GitServiceType
  token: string
  instanceUrl?: string | null
}

interface CustomUser extends BaseUserInfo {
  id: string
}

interface CustomJWT extends JWT, BaseUserInfo {}

export interface CustomSessionUser extends BaseUserInfo {}

const getUser = (
  credentials: any,
  service: GitServiceType
): CustomUser | null => {
  const token = credentials?.token ?? ''
  const name = credentials?.name ?? null
  const login = credentials?.login ?? null
  const image = credentials?.image ?? null
  const instanceUrl = credentials?.instanceUrl ?? null

  return token
    ? { id: '1', token, service, name, login, image, instanceUrl }
    : null
}

const createCredentialsProvider = (
  id: string,
  name: string,
  service: GitServiceType
) =>
  CredentialsProvider({
    id: `${id}-token`,
    name: `${name} Token`,
    credentials: {
      token: { label: `${name} Token`, type: 'text' },
      name: { label: 'Name', type: 'text' },
      login: { label: 'Login', type: 'text' },
      image: { label: 'Image', type: 'text' },
      instanceUrl: { label: 'Instance URL', type: 'text', optional: true },
    },
    authorize: (credentials) => getUser(credentials, service),
  })

export const authOptions: NextAuthOptions = {
  providers: [
    createCredentialsProvider('github', 'GitHub', 'github'),
    createCredentialsProvider('forgejo', 'Forgejo', 'forgejo'),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const {
          token: userToken,
          service,
          name,
          login,
          image,
          instanceUrl,
        } = user as CustomUser
        token = {
          ...token,
          token: userToken,
          service,
          name,
          login,
          image,
          instanceUrl,
        } as CustomJWT
      }
      return token
    },
    async session({ session, token }) {
      const {
        token: userToken,
        service,
        name,
        login,
        image,
        instanceUrl,
      } = token as CustomJWT

      session.user = {
        token: userToken,
        service,
        name,
        login,
        image,
        instanceUrl,
      } as CustomSessionUser

      return session
    },
  },
}
