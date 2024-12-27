import { toCapitalizeCase } from "./toCapitalizeCase"

  /**
   * Converts a string to "Title Case" (each word capitalized),
   * handling various delimiters such as spaces, hyphens, underscores,
   * and camelCase.
   *
   * @param str The string to convert.
   * @returns The string converted to "Title Case".
   */
  export const toTitleCase = (str: string): string => {
    return str
      .replace(/[-_]+/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .split(' ')
      .map((word) => toCapitalizeCase(word))
      .join(' ')
  }