import { CONSTANTS } from '../6-shared/config'

export type Locale = (typeof locales)[number]

export const locales = ['en-US', 'ru-RU'] as const
export const defaultLocale: Locale = CONSTANTS.default.locale
