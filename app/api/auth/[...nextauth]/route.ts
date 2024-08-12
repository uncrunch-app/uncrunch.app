// app/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const createCredentialsProvider = (id: string, name: string, service: 'github' | 'forgejo') =>
  CredentialsProvider({
    id: `${id}-token`,
    name: `${name} Token`,
    credentials: {
      token: { label: `${name} Token`, type: "text" }
    },
    authorize: async (credentials) => {
      const token = credentials?.token ?? '';
      return token ? { id: '1', token, service } : null;
    }
  });

const options: NextAuthOptions = {
  providers: [
    createCredentialsProvider('github', 'GitHub', 'github'),
    createCredentialsProvider('forgejo', 'Forgejo', 'forgejo')
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'token' in user && 'service' in user) {
        return {
          ...token,
          token: (user as any).token,
          service: (user as any).service,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          token: (token as any).token,
          service: (token as any).service,
        },
      };
    }
  }
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
