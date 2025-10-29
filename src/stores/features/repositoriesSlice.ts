import { createSlice } from '@reduxjs/toolkit'
 
export interface RepositoriesState {
  repositories: [],
}

const initialState: RepositoriesState = {
  repositories: [],
}

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setRepositories(state, action){
        state.repositories = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setRepositories} = repositoriesSlice.actions

export default repositoriesSlice.reducer