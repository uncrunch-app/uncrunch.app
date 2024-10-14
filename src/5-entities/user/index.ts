import {
  githubUserApi,
  useGetGithubUserDataQuery,
  useLazyGetGithubUserDataQuery,
} from './api/githubUserApi'

import type { GithubUser } from './model/types'

export type { GithubUser }
export {
  githubUserApi,
  useGetGithubUserDataQuery,
  useLazyGetGithubUserDataQuery,
}
