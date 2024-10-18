import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userWithoutSessionApi = createApi({
  reducerPath: 'userWithoutSessionApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getUserWithoutSession: builder.query<any, { baseUrl: string; token?: string }>({
      query: ({ baseUrl, token }) => ({
        url: `${baseUrl}/user`,
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }),
      transformResponse: (response: any) => {
        if (!response) throw new Error('User data not found')
        return response
      },
    }),
  }),
})

export const { useLazyGetUserWithoutSessionQuery } = userWithoutSessionApi
