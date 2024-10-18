import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryApi } from './baseQueryApi'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryApi,
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => '/user',
    }),
  }),
})

export const { useGetUserQuery } = userApi;
