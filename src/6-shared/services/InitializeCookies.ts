'use client'

import { useEffect } from 'react'
import cookies from 'js-cookie'
import { locales } from '@/i18n/config'
import type { Locale } from '@/i18n/config'
import { CONSTANTS } from '@/shared/config'
import { saveUserLocale } from './localeCookies'
import { saveThemeMode } from './themeCookies'
import { themeNames } from '../themes/themeSettings'
import type { ThemeNames } from '../themes/themeSettings'

interface GetEnsureValidCookieProps<T> {
  validValues: readonly T[]
  defaultValue: T
  cookieName: string
}

interface CookieConfig<T> extends GetEnsureValidCookieProps<T> {
  saveFunction: (value: T) => Promise<void>
}

const userLocaleConfig = {
  validValues: locales,
  defaultValue: CONSTANTS.default.locale,
  cookieName: CONSTANTS.cookie.locale,
  saveFunction: saveUserLocale,
}

const themeModeConfig = {
  validValues: themeNames,
  defaultValue: CONSTANTS.default.theme,
  cookieName: CONSTANTS.cookie.theme,
  saveFunction: saveThemeMode,
}

const getEnsureValidCookie = async <T>(
  config: GetEnsureValidCookieProps<T>
) => {
  const cookieValue = cookies.get(config.cookieName)

  if (!cookieValue || !config.validValues.includes(cookieValue as T)) {
    return config.defaultValue
  }

  return cookieValue
}

const saveEnsureCookie = async <T>(config: CookieConfig<T>) => {
  const cookie = await getEnsureValidCookie(config)

  if (cookie === config.defaultValue) {
    await config.saveFunction(cookie as T)
  }
}

export const InitializeCookies = () => {
  useEffect(() => {
    saveEnsureCookie<Locale>(userLocaleConfig)
    saveEnsureCookie<ThemeNames>(themeModeConfig)
  }, [])

  return null
}
