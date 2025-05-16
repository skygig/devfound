import { createSlice } from '@reduxjs/toolkit'

type repoType = {
    title: string,
    desc: string | null,
    stars: number,
    forks: number,
    issues: number,
    goodFirstIssues: number,
    avatar: string,
    languages: any,
    ycBatch: number,
    url: string,
}

interface reposState {
    repos: repoType[],
    count: 0
}

const initialState: reposState = { repos: [], count: 0 }

const reposSlice = createSlice({
    name: 'repos',
    initialState,
    reducers: {
        setRepos: (state, action) => {
            state.repos = action.payload;
            state.count = action.payload?.length;
        },
        setReposCount: (state, action) => {
            state.count = action.payload;
        }
    },
})

export const { setRepos, setReposCount } = reposSlice.actions
export default reposSlice.reducer