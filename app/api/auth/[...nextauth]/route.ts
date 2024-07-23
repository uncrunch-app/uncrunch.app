import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface CustomUser extends User {
  token: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      token: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
  }
}

const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        token: { label: "Token", type: "text" }
      },
      authorize: async (credentials) => {
        const token = credentials?.token ?? '';
        if (token) {
          const user: CustomUser = { id: '1', token };
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = (user as CustomUser).token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { token: token.token };
      return session;
    }
  }
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
