import { configureStore } from '@reduxjs/toolkit'
import starReducer from '@/store/starsSlice'
import reposReducer from "@/store/reposSlice"

export const store = configureStore({
    reducer: {
        starredRepos: starReducer,
        repoList: reposReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
