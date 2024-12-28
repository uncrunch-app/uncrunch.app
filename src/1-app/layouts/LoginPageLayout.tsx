import { Logo } from '@/shared/ui/logo'
import { ReactNode } from 'react'
import LocaleSwitcher from '@/shared/ui/LocaleSwitcher'
import { getTranslations } from 'next-intl/server'
import { Link } from '@nextui-org/link'
import { CONSTANTS } from '@/shared/config'
import { getCopyrightYears } from '@/shared/utils/getCopyrightYears'
import { LINKS } from '@/shared/config'

const LoginPageLayout = async ({ children }: { children: ReactNode }) => {
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
        <div className="mr-8 w-32">
          <LocaleSwitcher />
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer>
        <div className="mb-2 mt-24 flex flex-col px-2 text-small font-extralight">
          <span>{t('footer.rights')}</span>

          <span>
            <Link
              href={LINKS.github.orgRepo}
              underline="hover"
              size="sm"
              color="foreground"
            >
              {t('footer.sourceCode', { gitHosting: 'Github' })}
            </Link>
          </span>

          <span>
            {t('footer.copyright', { years: `${getCopyrightYears(2024)}` })}{' '}
            {t('footer.license', { license: CONSTANTS.license })}{' '}
            <Link
              href={LINKS.github.developer}
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
