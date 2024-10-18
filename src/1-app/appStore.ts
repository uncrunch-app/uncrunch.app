import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userWithoutSessionApi } from '../5-entities/user/api/userWithoutSessionApi'
import { repoApi } from '../5-entities/user/api/repoApi'
import { userApi } from '../5-entities/user/api/userApi'

export const store = configureStore({
  reducer: {
    [userWithoutSessionApi.reducerPath]: userWithoutSessionApi.reducer,
    [repoApi.reducerPath]: repoApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userWithoutSessionApi.middleware,
      repoApi.middleware,
      userApi.middleware
    ),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
