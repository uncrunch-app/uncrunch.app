'use server'

import { cookies } from 'next/headers'
import { Locale, defaultLocale } from '@/src/i18n/config'
import { COOKIE_LOCALE } from '../constants/constants'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.

export async function getUserLocale() {
  return cookies().get(COOKIE_LOCALE)?.value || defaultLocale
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_LOCALE, locale)
}
