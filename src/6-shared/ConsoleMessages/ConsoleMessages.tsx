'use client'

import { WelcomeConsoleMessage } from './WelcomeConsoleMessage'

export const ConsoleMessages = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  if (isProduction) {
    return <WelcomeConsoleMessage />
  }
  
  return null
}
