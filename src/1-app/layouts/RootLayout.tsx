import { ReactNode } from 'react'
import Providers from '../providers'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '@/src/6-shared/styles/global.css'

import 'normalize.css/normalize.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import { fetchThemeMode } from '@/src/6-shared/utils/themeCookies'
import { PageLoader } from '@/src/6-shared/ui/PageLoader'

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

  const initialTheme = await fetchThemeMode()

  return (
    <html lang="ru" className={initialTheme}>
      <body>
        <PageLoader />
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
