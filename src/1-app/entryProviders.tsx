'use client'

import { store } from './appStore'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material'
import theme from '../6-shared/styles/theme'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/*<GlobalStyles
            styles={{
              '@keyframes mui-auto-fill': {
                from: { display: 'block' },
              },
              '@keyframes mui-auto-fill-cancel': {
                from: { display: 'block' },
              },
              // Стили для автозаполнения
              'input:-webkit-autofill': {
                transition: 'background-color 5000s ease-in-out 0s',
              },
            }}
          />*/}
          {children}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  )
}

export default Providers
