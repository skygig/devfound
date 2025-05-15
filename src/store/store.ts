import { configureStore } from '@reduxjs/toolkit'
import starReducer from '@/store/starsSlice'

export const store = configureStore({
    reducer: {
        starredRepos: starReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch