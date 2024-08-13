import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';
import { CustomSessionUser } from '../api/auth/[...nextauth]/route';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
    prepareHeaders: async (headers, { getState }) => {
      let token: string | undefined;

      // Получаем токен из состояния или переданного параметра
      const session = await getSession();
      const user = session?.user as CustomSessionUser | undefined;
      token = user?.token;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<any, { token?: string }>({
      queryFn: async (arg, _queryApi, _extraOptions, fetchWithBQ) => {
        const headers = arg?.token
          ? { Authorization: `Bearer ${arg.token}` }
          : undefined;

        const result = await fetchWithBQ({
          url: 'user',
          headers,
        });

        if (result.error) {
          return { error: result.error };
        }

        return { data: result.data };
      },
    }),
  }),
});

export const { useGetUserDataQuery, useLazyGetUserDataQuery } = githubApi;
