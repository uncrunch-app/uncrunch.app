'use client'

import { store } from './appStore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
//import { ThemeProvider, CssBaseline } from '@mui/material'
//import theme from '@/src/6-shared/styles/theme'
//import { I18nextProvider } from 'react-i18next'
import { NextUIProvider } from '@nextui-org/react'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        {/*<ThemeProvider theme={theme}>*/}
        {/*<CssBaseline />*/}
        <NextUIProvider>{children}</NextUIProvider>
        {/*</ThemeProvider>*/}
      </SessionProvider>
    </Provider>
  )
}

export default Providers
