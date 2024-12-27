import { ERRORS } from '@/shared/config'

export function getCopyrightYears(startYear: number): string {
  const currentYear = new Date().getFullYear()

  if (startYear > currentYear) {
    throw new Error(ERRORS.misc.yearExceeded)
  }

  if (startYear === currentYear) {
    return `${currentYear}`
  }

  return `${startYear} - ${currentYear}`
}
