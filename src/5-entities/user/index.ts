import {
  githubUserApi,
  useGetUserDataQuery,
  useLazyGetUserDataQuery,
} from './api/githubUserApi'
import type { GithubUser } from './model/types'
import UserCard from './ui/UserCard/UserCard'

export type { GithubUser }
export { githubUserApi, useGetUserDataQuery, useLazyGetUserDataQuery, UserCard }
