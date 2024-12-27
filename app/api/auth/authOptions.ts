// app/api/auth/authOptions.ts

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { GitHostingType } from '@/shared/types'; // Убедитесь, что здесь правильный путь

// Базовая информация о пользователе
interface BaseUserInfo {
  token: string;
  login: string;
  name?: string | null;
  image?: string | null;
  gitHosting: GitHostingType; // Убедитесь, что это правильный тип
  instanceUrl?: string | null;
}

type CredentialsInput = Partial<Omit<BaseUserInfo, 'gitHosting'>>;

// Кастомизированный интерфейс пользователя
interface CustomUser extends BaseUserInfo {
  id: string;
}

interface CustomJWT extends JWT, BaseUserInfo {}

export interface CustomSessionUser extends BaseUserInfo {}

// Функция для маппинга данных
const mapUserData = (
  data: Partial<BaseUserInfo>,
  gitHosting: GitHostingType
): BaseUserInfo => ({
  token: data.token || '',
  login: data.login || '',
  name: data.name ?? null,
  image: data.image ?? null,
  instanceUrl: data.instanceUrl ?? null,
  gitHosting,
});

// Функция для получения пользователя
const getUser = (
  credentials: CredentialsInput | undefined,
  gitHosting: GitHostingType
): CustomUser | null => {
  if (!credentials || !credentials.token) {
    return null; // Проверка на наличие credentials и токена
  }

  const userInfo = mapUserData(credentials, gitHosting);
  return { id: '1', ...userInfo }; // Возвращаем пользователя с ID
};

// Функция для создания провайдера
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
    authorize: (credentials) => getUser(credentials, gitHosting), // Убираем as
  });

export const authOptions: NextAuthOptions = {
  providers: [
    createCredentialsProvider('github', 'GitHub', 'github'),
    createCredentialsProvider('forgejo', 'Forgejo', 'forgejo'),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Проверяем наличие user и его свойство gitHosting
      if (user && 'gitHosting' in user) {
        // Убедимся, что user соответствует CustomUser
        const customUser: CustomUser = user; // Не используем as, просто приводим
        token = {
          ...token,
          ...mapUserData(customUser, customUser.gitHosting), // Убираем as
        };
      }
      return token; // Возвращаем токен
    },
    async session({ session, token }) {
      // Проверяем, что token является JWT и имеет свойство gitHosting
      if ('gitHosting' in token) {
        const gitHosting = token.gitHosting as GitHostingType; // Это единственное место, где используем as
        session.user = mapUserData(token, gitHosting); // Убираем as
      }
      return session; // Возвращаем сессию
    },
  },
};
