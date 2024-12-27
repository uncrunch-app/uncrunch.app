'use server'

import { cookies } from 'next/headers'
import { Locale, defaultLocale, locales } from '@/i18n/config'
import { CONSTANTS } from '@/shared/config'

// TODO: Переписать на общий класс FetchCookie
/**
 * Retrieves the user's preferred locale from a cookie.
 *
 * The cookie is only checked if it is set, and if it contains a value
 * that is in the list of known locales. If the cookie is not set,
 * or if the value is not in the list of known locales, the user's
 * locale is set to the default locale.
 *
 * @returns The user's preferred locale.
 */
export async function fetchUserLocale(): Promise<string> {
  const cookieValue = cookies().get(CONSTANTS.cookie.locale)?.value

  if (
    !cookieValue ||
    !locales.includes(cookieValue as (typeof locales)[number])
  ) {
    return defaultLocale
  }

  return cookieValue
}

// TODO: Переписать на общий класс SaveCookie
/**
 * Save the user's chosen locale to a cookie.
 *
 * The cookie is only set if the locale argument is not empty and is not
 * already set to the same value.
 *
 * @param locale The locale to save. If empty, the function will exit
 * immediately and not set the cookie.
 */
export async function saveUserLocale(locale: Locale): Promise<void> {
  const currentValue = cookies().get(CONSTANTS.cookie.locale)?.value

  if (currentValue === locale) {
    return
  }

  if (!locale) {
    console.error(
      // TODO: Заменить 'locale' на `${cookieName}`
      `ERROR: Attempting to save an empty 'locale' value in cookie '${CONSTANTS.cookie.locale}'.`
    )
    return
  }

  cookies().set(CONSTANTS.cookie.locale, locale)
}
