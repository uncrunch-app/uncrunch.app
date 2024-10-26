import error from '@/src/6-shared/services/errorMessages'
import { buildApiUrl, buildHeaders } from '@/src/6-shared/utils/apiUtils'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const buildQuery = ({
  baseUrl,
  token,
}: {
  baseUrl: string
  token: string
}) => ({
  url: buildApiUrl(baseUrl, '/user', token),
  headers: buildHeaders(token),
})

export const userWithoutSessionApi = createApi({
  reducerPath: 'userWithoutSessionApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getUserWithoutSession: builder.query<
      any,
      { baseUrl: string; token?: string }
    >({
      query: buildQuery,
      transformResponse: (response: any) => {
        
        if (!response) throw new Error(error.apiQuery.userDataNotFound)
        return response
      },
    }),
  }),
})

export const { useLazyGetUserWithoutSessionQuery } = userWithoutSessionApi
