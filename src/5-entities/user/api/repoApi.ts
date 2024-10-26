import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryApi } from './baseQueryApi'
import { endpoints } from '@/src/6-shared/services/endpoints'
import { getSessionUser } from '@/src/6-shared/services/getSessionUser'


const getNessesaryData = async () => {
  const user = await getSessionUser()
  const endpoint = endpoints[user.gitHosting]
  return { owner: user.login, endpoint }
}

export const repoApi = createApi({
  reducerPath: 'repoApi',
  baseQuery: baseQueryApi,
  endpoints: (builder) => ({
    getListRepos: builder.query<any, void>({
      queryFn: async (_arg, _queryApi, _extraOptions, baseQuery) => {
        const { endpoint } = await getNessesaryData()
        return await baseQuery(endpoint.repo.getListRepos)
      },
    }),
    getRepo: builder.query<any, { repo: string }>({
      queryFn: async ({ repo }, _queryApi, _extraOptions, baseQuery) => {
        const { endpoint, owner } = await getNessesaryData()
        return await baseQuery(endpoint.repo.getRepo(owner, repo))
      },
    }),
  }),
})

export const { useGetListReposQuery, useGetRepoQuery } = repoApi
