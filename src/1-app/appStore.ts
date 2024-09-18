import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { githubUserApi } from '@/src/5-entities/user'
import { forgejoUserApi } from '../5-entities/user/api/forgejoUserApi'

export const store = configureStore({
  reducer: {
    [githubUserApi.reducerPath]: githubUserApi.reducer,
    [forgejoUserApi.reducerPath]: forgejoUserApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      githubUserApi.middleware,
      forgejoUserApi.middleware
    ),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
