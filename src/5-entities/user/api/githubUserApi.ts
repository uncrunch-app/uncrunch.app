//// githubUserApi.ts
//import { githubApiBaseQuery } from '@/shared/api/githubApiConfig'
//import { createApi } from '@reduxjs/toolkit/query/react'

//export const githubUserApi = createApi({
//  reducerPath: 'githubUserApi',
//  baseQuery: githubApiBaseQuery,
//  endpoints: (builder) => ({
//    getGithubUserData: builder.query<any, { token?: string }>({
//      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
//        const headers = arg?.token
//          ? { Authorization: `Bearer ${arg.token}` }
//          : undefined

//        const result = await fetchWithBQ({
//          url: 'user',
//          headers,
//        })

//        if (result.error) {
//          return { error: result.error }
//        }

//        return { data: result.data }
//      },
//    }),
//  }),
//})

//export const { useGetGithubUserDataQuery, useLazyGetGithubUserDataQuery } = githubUserApi
