import { Logo } from '@/src/6-shared/ui/logo'
import { ReactNode } from 'react'
import { fetchThemeMode } from '@/src/6-shared/utils/themeCookies'
import LocaleSwitcher from '@/src/6-shared/LocaleSwitcher'
import { getTranslations } from 'next-intl/server'
import { Link } from '@nextui-org/react'
import {
  LICENSE,
} from '@/src/6-shared/constants/constants'
import { getCopyrightYears } from '@/src/6-shared/services/getCopyrightYears'
import { links } from '@/src/6-shared/services/links'

const LoginPageLayout = async ({ children }: { children: ReactNode }) => {
  const initialTheme = fetchThemeMode()
  const t = await getTranslations('Pages.login.layout')

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo
          width="64"
          height="64"
          bgColor="hsl(var(--nextui-primary))"
          color="hsl(var(--nextui-secondary))"
        />
        <div className="w-[180px]">
          <LocaleSwitcher />
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer>
        <div className="mb-2 mt-24 flex flex-col px-2 text-small font-extralight">
          <span>{t('footer.rights')}</span>

          <span>
            <Link
              href={links.github.org_repo}
              underline="hover"
              size="sm"
              color="foreground"
            >
              {t('footer.sourceCode', { gitHosting: 'Github' })}
            </Link>
          </span>

          <span>
            {t('footer.copyright', { years: `${getCopyrightYears(2024)}` })}{' '}
            {t('footer.license', { license: LICENSE })}{' '}
            <Link
              href={links.github.dev}
              underline="hover"
              color="foreground"
              size="sm"
            >
              {t('footer.developer')}
            </Link>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default LoginPageLayout
