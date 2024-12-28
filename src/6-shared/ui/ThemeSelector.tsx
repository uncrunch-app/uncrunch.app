import ThemeSelectorClient from './ThemeSelectorClient'
import { fetchThemeMode } from '../services/themeCookies'
import { ThemeNames } from '../themes/themeSettings'

export default async function ThemeSelector() {
  const initialTheme = await fetchThemeMode()

  // Передаем тему в клиентский компонент
  return <ThemeSelectorClient initialTheme={initialTheme as ThemeNames} />
}
