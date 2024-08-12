import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

// Определяем типы для пользователя и JWT токена
interface CustomUser {
  id: string;
  token: string;
  service: 'github' | 'forgejo';
}

interface CustomJWT extends JWT {
  token: string;
  service: 'github' | 'forgejo';
}

// Типизируем пользователя в сессии
export interface CustomSessionUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  token: string;
  service: 'github' | 'forgejo';
}

const createCredentialsProvider = (id: string, name: string, service: 'github' | 'forgejo') =>
  CredentialsProvider({
    id: `${id}-token`,
    name: `${name} Token`,
    credentials: {
      token: { label: `${name} Token`, type: "text" }
    },
    authorize: async (credentials) => {
      const token = credentials?.token ?? '';
      if (token) {
        const user: CustomUser = { id: '1', token, service };
        return user;
      }
      return null;
    }
  });

const options: NextAuthOptions = {
  providers: [
    createCredentialsProvider('github', 'GitHub', 'github'),
    createCredentialsProvider('forgejo', 'Forgejo', 'forgejo')
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as CustomUser;
        token = {
          ...token,
          token: customUser.token,
          service: customUser.service,
        } as CustomJWT;
      }
      return token;
    },
    async session({ session, token }) {
      // Расширяем session.user типом CustomSessionUser
      session.user = {
        ...session.user,
        token: (token as CustomJWT).token,
        service: (token as CustomJWT).service,
      } as CustomSessionUser;
      return session;
    }
  }
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
