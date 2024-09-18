// forgejoUserApi.ts
import { forgejoApiBaseQuery } from '@/src/6-shared/api/forgejoApiConfig';
import { createApi } from '@reduxjs/toolkit/query/react'

export const forgejoUserApi = createApi({
  reducerPath: 'forgejoUserApi',
  baseQuery: forgejoApiBaseQuery(''), // Базовый URL будет задаваться динамически
  endpoints: (builder) => ({
    getForgejoUserData: builder.query<any, { baseUrl: string; token?: string }>({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const headers = arg?.token
          ? { Authorization: `Bearer ${arg.token}` }
          : undefined

        const result = await fetchWithBQ({
          url: `${arg.baseUrl}/user`, // URL передаем извне
          headers,
        })

        if (result.error) {
          return { error: result.error }
        }

        return { data: result.data }
      },
    }),
  }),
})

export const { useGetForgejoUserDataQuery, useLazyGetForgejoUserDataQuery } = forgejoUserApi
