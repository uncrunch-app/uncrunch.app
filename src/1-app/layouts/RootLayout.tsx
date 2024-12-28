import { ReactNode } from 'react'
import Providers from '../providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import '@/shared/styles/global.css'
import { fetchThemeMode } from '@/shared/services/themeCookies'
import { PageLoader } from '@/shared/ui/PageLoader'
import { ConsoleMessages } from '@/shared/ConsoleMessages'
import { InitializeCookies } from '@/shared/services/InitializeCookies'

import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: [
    'cyrillic',
    'cyrillic-ext',
    'greek',
    'greek-ext',
    'latin',
    'latin-ext',
    'vietnamese',
  ],
})

export const metadata = {
  title: 'Uncrunch',
  description: 'indexPageDesc',
  keywords: 'keywords',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/ico',
        url: '/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicons/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicons/favicon-32x32.png',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicons/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/favicons/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/manifest.webmanifest',
}

const RootLayout = async ({ children }: { children: ReactNode }) => {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()
  const locale = await getLocale()

  const language = locale.includes('-') ? locale.split('-')[0] : locale || 'en'

  const initialTheme = await fetchThemeMode()

  return (
    <html lang={language} className={initialTheme}>
      <body className={inter.className}>
        <PageLoader />
        <InitializeCookies />
        <NextIntlClientProvider messages={messages}>
          <ConsoleMessages />
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
