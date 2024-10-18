const isDevelopment = process.env.NODE_ENV === 'development'

export const buildApiUrl = (baseUrl: string, path: string, token?: string) => {
  const fullUrl = `${baseUrl}${path}`

  if (isDevelopment) {
    return `/api/proxy?url=${encodeURIComponent(fullUrl)}&token=${token}`
  }

  return fullUrl
}

export const buildHeaders = (token?: string) => {
  const headers = new Headers()

  if (token && !isDevelopment) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  return headers
}
