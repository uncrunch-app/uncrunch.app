import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { GitServiceType } from '@/src/6-shared/types';

// Общие поля для пользователя, JWT и сессии, включая token
interface BaseUserInfo {
  name?: string | null;
  email?: string | null;
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
const getUser = (credentials: any, service: 'github' | 'forgejo'): CustomUser | null => {
  const token = credentials?.token ?? '';
  const name = credentials?.name ?? null;
  const email = credentials?.email ?? null;
  const image = credentials?.image ?? null;

  return token ? { id: '1', token, service, name, email, image } : null;
};

// Фабрика провайдеров для авторизации через токен
const createCredentialsProvider = (id: string, name: string, service: GitServiceType) =>
  CredentialsProvider({
    id: `${id}-token`,
    name: `${name} Token`,
    credentials: {
      token: { label: `${name} Token`, type: "text" },
      name: { label: "Name", type: "text" },
      email: { label: "Email", type: "text" },
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
        const { token: userToken, service, name, email, image } = user as CustomUser;
        token = { ...token, token: userToken, service, name, email, image } as CustomJWT;
      }
      return token;
    },
    async session({ session, token }) {
      const { token: userToken, service, name, email, image } = token as CustomJWT;
      session.user = { token: userToken, service, name, email, image } as CustomSessionUser;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
