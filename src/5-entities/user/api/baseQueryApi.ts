import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSession } from 'next-auth/react'
import { CustomSessionUser } from '@/app/api/auth/authOptions'
import { buildApiUrl, buildHeaders } from '@/src/6-shared/utils/apiUtils'

const getSessionData = async () => {
  const session = await getSession()
  const user = session?.user as CustomSessionUser | undefined
  if (!user) {
    throw new Error('User not found in session')
  }
  return user
}

export const baseQueryApi = async (path: string, api: any, extraOptions: any) => {
  const user = await getSessionData()

  if (!user?.instanceUrl || !user?.token) {
    return {
      error: { status: 401, data: 'Base URL or token not found in session' },
    }
  }

  const url = buildApiUrl(user.instanceUrl, path, user.token)
  const headers = buildHeaders(user.token)

  return fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: () => headers,
  })(url, api, extraOptions)
}
