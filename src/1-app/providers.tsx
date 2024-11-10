'use client'

import { store } from './appStore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const Providers = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const useHref = (href: string) => href;

  return (
    <Provider store={store}>
      <SessionProvider>
        <NextUIProvider navigate={router.push} useHref={useHref}>{children}</NextUIProvider>
      </SessionProvider>
    </Provider>
  )
}

export default Providers
