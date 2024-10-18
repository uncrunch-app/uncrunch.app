import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'
import { CustomSessionUser } from '@/app/api/auth/authOptions'

export const baseQueryApi = async (args: string, api: any, extraOptions: any) => {
  const session = await getSession()
  const user = session?.user as CustomSessionUser | undefined

  const baseUrl = user?.instanceUrl
  const token = user?.token

  if (!baseUrl || !token) {
    return {
      error: { status: 401, data: 'Base URL or token not found in session' },
    }
  }

  const result = await fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })(args, api, extraOptions) // Передаем args, api и extraOptions в fetchBaseQuery

  return result
}
