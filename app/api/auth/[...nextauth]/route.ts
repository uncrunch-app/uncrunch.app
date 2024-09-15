import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { GitServiceType } from '@/src/6-shared/types';

// Общие поля для пользователя, JWT и сессии, включая token
interface BaseUserInfo {
  name?: string | null;
  login?: string | null; // Убираем email, добавляем login
  image?: string | null;
  service: GitServiceType;
  token: string;
}

// Пользователь с id
interface CustomUser extends BaseUserInfo {
  id: string;  // id уникален только для пользователя
}

// JWT, которое включает базовую информацию
interface CustomJWT extends JWT, BaseUserInfo {}

// Типизируем пользователя в сессии
export interface CustomSessionUser extends BaseUserInfo {}

// Вспомогательная функция для обработки пользователя
const getUser = (credentials: any, service: GitServiceType): CustomUser | null => {
  const token = credentials?.token ?? '';
  const name = credentials?.name ?? null;
  const login = credentials?.login ?? null;  // Используем login вместо email
  const image = credentials?.image ?? null;

  return token ? { id: '1', token, service, name, login, image } : null;
};

const createCredentialsProvider = (id: string, name: string, service: GitServiceType) =>
  CredentialsProvider({
    id: `${id}-token`,
    name: `${name} Token`,
    credentials: {
      token: { label: `${name} Token`, type: "text" },
      name: { label: "Name", type: "text" },
      login: { label: "Login", type: "text" }, // Заменяем на login
      image: { label: "Image", type: "text" }
    },
    authorize: (credentials) => getUser(credentials, service)
  });

export const authOptions: NextAuthOptions = {
  providers: [
    createCredentialsProvider('github', 'GitHub', 'github'),
    createCredentialsProvider('forgejo', 'Forgejo', 'forgejo')
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { token: userToken, service, name, login, image } = user as CustomUser;
        token = { ...token, token: userToken, service, name, login, image } as CustomJWT;
      }
      return token;
    },
    async session({ session, token }) {
      const { token: userToken, service, name, login, image } = token as CustomJWT;

      // Добавляем login в session.user
      session.user = { token: userToken, service, name, login, image } as CustomSessionUser;

      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
