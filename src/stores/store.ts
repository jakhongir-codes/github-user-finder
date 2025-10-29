import { configureStore } from '@reduxjs/toolkit'
import repositoriesReducer from './features/repositoriesSlice'
import userReducer from "./features/userSlice"
import appReducer from "./features/appSlice"

export const store = configureStore({
  reducer: {
    repositories: repositoriesReducer,
    user: userReducer,
    app: appReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
