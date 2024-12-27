'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { LINKS } from '@/shared/config'

export const WelcomeConsoleMessage = () => {
  const t = useTranslations('Messages.console.welcome')

  const TITLE_STYLE = 'font-size: 20px; font-weight: bold;'
  const TEXT_STYLE = 'font-size: 13px;'

  useEffect(() => {
    console.log(
      `%c${t('title')}\n\n%c${t('description')}\n\n%c${t('contribute', { link: LINKS.github.contribute })}\n%c${t('issue', { link: LINKS.github.issue })}\n%c${t('donate', { link: LINKS.donate })}`,
      TITLE_STYLE,
      TEXT_STYLE,
      TEXT_STYLE,
      TEXT_STYLE,
      TEXT_STYLE
    )
  }, [t])

  return null
}
