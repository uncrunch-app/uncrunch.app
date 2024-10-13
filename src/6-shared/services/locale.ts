'use server'

import { cookies } from 'next/headers'
import { Locale, defaultLocale } from '@/src/i18n/config'
import { COOKIE_LOCALE } from '../constants/constants'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.

export async function fetchUserLocale() {
  return cookies().get(COOKIE_LOCALE)?.value || defaultLocale
}

export async function saveUserLocale(locale: Locale) {
  const currentLocale = cookies().get(COOKIE_LOCALE)?.value

  if (currentLocale === locale) {
    return
  }

  if (!locale) {
    console.error(
      `ERROR: Attempting to save an empty 'locale' value in cookie '${COOKIE_LOCALE}'.`
    )
    return
  }

  cookies().set(COOKIE_LOCALE, locale)
}
