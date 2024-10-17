export function getCopyrightYears(startYear: number): string {
  const currentYear = new Date().getFullYear()

  if (startYear > currentYear) {
    throw new Error('Start year cannot be greater than the current year.')
  }

  if (startYear === currentYear) {
    return `${currentYear}`
  }

  return `${startYear} - ${currentYear}`
}
