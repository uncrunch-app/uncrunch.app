'use server'

import { cookies } from 'next/headers'
import { CONSTANTS } from '@/shared/config'
import { themeNames, ThemeNames } from '../themes/themeSettings'

// TODO: Переписать на общий класс FetchCookie
export async function fetchThemeMode(): Promise<string> {
  const cookieValue = cookies().get(CONSTANTS.cookie.theme)?.value

  if (!cookieValue || !themeNames.includes(cookieValue as ThemeNames)) {
    return CONSTANTS.default.theme
  }

  return cookieValue
}

// TODO: Переписать на общий класс SaveCookie
export async function saveThemeMode(theme: ThemeNames): Promise<void> {
  const currentValue = cookies().get(CONSTANTS.cookie.theme)?.value

  if (currentValue === theme) {
    return
  }

  if (!theme) {
    console.error(
      // TODO: Заменить 'theme' на `${cookieName}`
      `ERROR: Attempting to save an empty 'theme' value in cookie '${CONSTANTS.cookie.theme}'.`
    )
    return
  }

  cookies().set(CONSTANTS.cookie.theme, theme)
}
