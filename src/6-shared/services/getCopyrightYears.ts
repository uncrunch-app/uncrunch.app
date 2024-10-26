import error from '@/src/6-shared/services/errorMessages'

export function getCopyrightYears(startYear: number): string {
  const currentYear = new Date().getFullYear()

  if (startYear > currentYear) {
    throw new Error(error.misc.yearExceeded)
  }

  if (startYear === currentYear) {
    return `${currentYear}`
  }

  return `${startYear} - ${currentYear}`
}
