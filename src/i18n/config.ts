export type Locale = (typeof locales)[number];

export const locales = ['en', 'ru'] as const;
export const defaultLocale: Locale = 'en';
