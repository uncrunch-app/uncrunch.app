import ThemeSelectorClient from './ThemeSelectorClient'
import { fetchThemeMode } from '../utils/themeCookies';

export default async function ThemeSelector() {
  const initialTheme = await fetchThemeMode();

  // Передаем тему в клиентский компонент
  return <ThemeSelectorClient initialTheme={initialTheme} />
}
