import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { buildApiUrl, buildHeaders } from '@/shared/utils/apiUtils'
import { getSessionUser } from '@/shared/utils/getSessionUser'

export const baseQueryApi = async (
  path: string,
  api: any,
  extraOptions: any
) => {
  const user = await getSessionUser()

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
