export const CONSTANTS = {
  cookie: {
    locale: 'next-intl-locale',
    theme: 'nextui-theme',
  },
  default: {
    locale: 'en-US',
    theme: 'light',
    apiEndpoints: {
      forgejo: '/api/v1'
    }
  },
  license: 'AGPL-3.0',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const
