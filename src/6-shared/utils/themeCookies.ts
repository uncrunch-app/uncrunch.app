'use server'

import { cookies } from 'next/headers'
import { COOKIE_THEME, DEFAULT_THEME } from '@/src/6-shared/constants/constants'

export async function fetchThemeMode(): Promise<string> {
  const themeCookie = cookies().get(COOKIE_THEME)
  return themeCookie ? themeCookie.value : DEFAULT_THEME
}

export async function saveThemeMode(theme: string): Promise<void> {
  cookies().set(COOKIE_THEME, theme)
}
