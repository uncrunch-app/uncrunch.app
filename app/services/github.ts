import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.user?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserData: builder.query<any, void>({
      query: () => 'user',
    }),
  }),
});

export const { useGetUserDataQuery } = githubApi;
