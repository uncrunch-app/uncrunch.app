import { ERRORS } from '@/shared/config'
import { buildApiUrl, buildHeaders } from '@/shared/utils/apiUtils'
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
        if (!response) throw new Error(ERRORS.apiQuery.userDataNotFound)
        return response
      },
    }),
  }),
})

export const { useLazyGetUserWithoutSessionQuery } = userWithoutSessionApi
