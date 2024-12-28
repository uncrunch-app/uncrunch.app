'use client'

import { CONSTANTS } from '@/shared/config'
import { WelcomeConsoleMessage } from './WelcomeConsoleMessage'

export const ConsoleMessages = () => {
  if (CONSTANTS.isProduction) {
    return <WelcomeConsoleMessage />
  }

  return null
}
