// forgejoApiConfig.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'
import { CustomSessionUser } from '@/app/api/auth/[...nextauth]/route'

export const forgejoApiBaseQuery = (baseUrl: string) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers) => {
      let token: string | undefined

      // Получаем токен из сессии
      const session = await getSession()
      const user = session?.user as CustomSessionUser | undefined
      token = user?.token

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  })
