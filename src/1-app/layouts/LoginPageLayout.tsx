import { Logo } from '@/src/6-shared/ui/logo'
import { ReactNode } from 'react'
import { fetchThemeMode } from '@/src/6-shared/utils/themeCookies'
import LocaleSwitcher from '@/src/6-shared/LocaleSwitcher'
import { getTranslations } from 'next-intl/server'
import { Link } from '@nextui-org/react'

const LoginPageLayout = async ({ children }: { children: ReactNode }) => {
  const initialTheme = fetchThemeMode()
  const t = await getTranslations('Footer')

  function getCopyrightYears(startYear: number): string {
    const currentYear = new Date().getFullYear()

    if (startYear > currentYear) {
      throw new Error('Start year cannot be greater than the current year.')
    }

    if (startYear === currentYear) {
      return `${currentYear}`
    }

    return `${startYear} - ${currentYear}`
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Используем 100vh для полной высоты вьюпорта
        margin: 0, // Убираем отступы
        padding: 0,
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo width="64" height="64" />
        <div className="w-[180px]">
          <LocaleSwitcher />
        </div>
      </header>
      <div style={{ flex: 1 }}>
        {' '}
        {/* Этот div растягивается, чтобы заполнять пространство */}
        {children}
      </div>
      <footer>
        <div className="mb-2 mt-24 flex flex-col px-2 text-small font-extralight">
          <span>{t('rights')}</span>

          <span>
            <Link
              href="https://github.com/uncrunch-app/uncrunch.app"
              underline="hover"
              size="sm"
              color="foreground"
            >
              {t('sourceCode', { gitHosting: 'Github' })}
            </Link>
          </span>

          <span>
            {t('copyright', { years: `${getCopyrightYears(2024)}` })}{' '}
            {t('license', { license: 'AGPL-3.0' })}{' '}
            <Link
              href="https://github.com/teplostanski"
              underline="hover"
              color="foreground"
              size="sm"
            >
              {t('developer')}
            </Link>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default LoginPageLayout
