import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { GitHostingType } from '@/src/6-shared/types'

interface BaseUserInfo {
  name?: string | null
  login?: string | null
  image?: string | null
  gitHosting: GitHostingType
  token: string
  instanceUrl?: string | null
}

interface CustomUser extends BaseUserInfo {
  id: string
}

interface CustomJWT extends JWT, BaseUserInfo {}

export interface CustomSessionUser extends BaseUserInfo {}

const mapUserData = (data: any, gitHosting: GitHostingType): BaseUserInfo => ({
  token: data.token,
  name: data?.name ?? null,
  login: data?.login ?? null,
  image: data?.image ?? null,
  instanceUrl: data?.instanceUrl ?? null,
  gitHosting,
})

const getUser = (
  credentials: any,
  gitHosting: GitHostingType
): CustomUser | null => {
  const userInfo = mapUserData(credentials, gitHosting)

  return userInfo.token ? { id: '1', ...userInfo } : null
}

const createCredentialsProvider = (
  id: string,
  name: string,
  gitHosting: GitHostingType
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
    authorize: (credentials) => getUser(credentials, gitHosting),
  })

export const authOptions: NextAuthOptions = {
  providers: [
    createCredentialsProvider('github', 'GitHub', 'github'),
    createCredentialsProvider('forgejo', 'Forgejo', 'forgejo'),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...mapUserData(user, (user as CustomUser).gitHosting),
        } as CustomJWT
      }
      return token
    },
    async session({ session, token }) {
      session.user = mapUserData(
        token,
        (token as CustomJWT).gitHosting
      ) as CustomSessionUser
      return session
    },
  },
}
