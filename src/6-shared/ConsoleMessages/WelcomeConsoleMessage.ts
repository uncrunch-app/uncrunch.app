'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { links } from '../services/links'

export const WelcomeConsoleMessage = () => {
  const t = useTranslations('Messages.console.welcome')

  const TITLE_STYLE = 'font-size: 20px; font-weight: bold;'
  const TEXT_STYLE = 'font-size: 13px;'

  useEffect(() => {
    console.log(
      `%c${t('title')}\n\n%c${t('description')}\n\n%c${t('contribute', { link: links.github.contribute })}\n%c${t('issue', { link: links.github.issue })}\n%c${t('donate', { link: links.donate })}`,
      TITLE_STYLE,
      TEXT_STYLE,
      TEXT_STYLE,
      TEXT_STYLE,
      TEXT_STYLE
    )
  }, [t])

  return null
}
