import { CONSTANTS, ROUTES } from "@/shared/config"

export const buildApiUrl = (baseUrl: string, path: string, token: string) => {
  const fullUrl = `${baseUrl}${path}`

  if (CONSTANTS.isDevelopment) {
    return ROUTES.proxy(fullUrl, token)
  }

  return fullUrl
}

export const buildHeaders = (token?: string) => {
  const headers = new Headers()

  if (token && !CONSTANTS.isDevelopment) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}
