'use client'

import { store } from './appStore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { useRouter } from 'next/navigation'
import { NextUIProvider } from '@nextui-org/system'

const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const useHref = (href: string) => href

  return (
    <Provider store={store}>
      <SessionProvider>
        <NextUIProvider navigate={router.push} useHref={useHref}>
          {children}
        </NextUIProvider>
      </SessionProvider>
    </Provider>
  )
}

export default Providers
