import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryApi } from './baseQueryApi'

export const repoApi = createApi({
  reducerPath: 'repoApi',
  baseQuery: baseQueryApi,
  endpoints: (builder) => ({
    getUserRepositories: builder.query<any, void>({
      query: () => '/user/repos',
    }),
  }),
})

export const { useGetUserRepositoriesQuery } = repoApi
