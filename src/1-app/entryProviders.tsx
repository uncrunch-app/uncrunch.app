'use client'

import { store } from './appStore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'
import theme from '../6-shared/styles/theme'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Нормализация стилей */}
          {children}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  )
}

export default Providers
