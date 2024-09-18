import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { JWT } from 'next-auth/jwt'
import { GitServiceType } from '@/src/6-shared/types'

// Общие поля для пользователя, JWT и сессии, включая token и instanceUrl
interface BaseUserInfo {
  name?: string | null
  login?: string | null // Убираем email, добавляем login
  image?: string | null
  service: GitServiceType
  token: string
  instanceUrl?: string | null // Добавляем instanceUrl как необязательный параметр
}

// Пользователь с id
interface CustomUser extends BaseUserInfo {
  id: string // id уникален только для пользователя
}

// JWT, которое включает базовую информацию
interface CustomJWT extends JWT, BaseUserInfo {}

// Типизируем пользователя в сессии
export interface CustomSessionUser extends BaseUserInfo {}

// Вспомогательная функция для обработки пользователя
const getUser = (
  credentials: any,
  service: GitServiceType
): CustomUser | null => {
  const token = credentials?.token ?? ''
  const name = credentials?.name ?? null
  const login = credentials?.login ?? null // Используем login вместо email
  const image = credentials?.image ?? null
  const instanceUrl = credentials?.instanceUrl ?? null // Обрабатываем instanceUrl

  return token ? { id: '1', token, service, name, login, image, instanceUrl } : null
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
      login: { label: 'Login', type: 'text' }, // Заменяем на login
      image: { label: 'Image', type: 'text' },
      instanceUrl: { label: 'Instance URL', type: 'text', optional: true }, // Добавляем instanceUrl
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
          instanceUrl, // Добавляем instanceUrl
        } = user as CustomUser
        token = {
          ...token,
          token: userToken,
          service,
          name,
          login,
          image,
          instanceUrl, // Добавляем в токен
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
        instanceUrl, // Добавляем instanceUrl в сессию
      } = token as CustomJWT

      // Добавляем instanceUrl и login в session.user
      session.user = {
        token: userToken,
        service,
        name,
        login,
        image,
        instanceUrl, // Добавляем в сессию
      } as CustomSessionUser

      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
