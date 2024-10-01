// apiConfig.ts
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'
import { CustomSessionUser } from '@/app/api/auth/authOptions'

export const githubApiBaseQuery = fetchBaseQuery({
  baseUrl: 'https://api.github.com/',
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
