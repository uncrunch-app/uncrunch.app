import { ReactNode } from 'react'
import Providers from '../entryProviders'
//import '@/src/6-shared/styles/global.scss'
//import '@/src/6-shared/constants/colors.scss'

//import 'normalize.css/normalize.css';
//import '@fontsource/inter/200.css';
//import '@fontsource/inter/300.css';
//import '@fontsource/inter/400.css';
//import '@fontsource/inter/500.css';
//import '@fontsource/inter/600.css';
//import '@fontsource/inter/700.css';
//import '@fontsource/inter/800.css';
//import '@fontsource/inter/900.css';

export const metadata = {
  title: 'Uncrunch',
  description: 'indexPageDesc',
  keywords: 'keywords',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/ico',
        url: '/favicons/favicon.ico',
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

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ru">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
