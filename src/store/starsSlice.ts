import { createSlice } from '@reduxjs/toolkit'

interface CounterState {
    repos: string[],
    count: number
}

const initialState: CounterState = { repos: [], count: 0 }

const starsSlice = createSlice({
    name: 'repoStarred',
    initialState,
    reducers: {
        setStarredRepo: (state, action) => {
            state.repos = action.payload;
            state.count = action.payload?.length;
        },
        addStarredRepo: (state, action) => {
            state.repos.push(action.payload);
            state.count += 1;
        },
        removeStarredRepo: (state, action) => {
            state.repos = state.repos.filter(repo => repo != action.payload);
            state.count -= 1;
        },
    },
})

export const { setStarredRepo, addStarredRepo, removeStarredRepo } = starsSlice.actions
export default starsSlice.reducer