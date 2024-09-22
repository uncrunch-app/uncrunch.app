'use client'

import { store } from './appStore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from '@/src/6-shared/styles/theme'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </Provider>
    </I18nextProvider>
  )
}

export default Providers
