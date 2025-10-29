import { createSlice } from '@reduxjs/toolkit'

export interface AppState {
  error: string,
  loading: boolean
}

const initialState: AppState = {
  error: '',
  loading: false
}

export const appSlice = createSlice({
  name: 'appstate',
  initialState,
  reducers: {
    setError(state, action){
        state.error = action.payload
    },
    setLoading(state){
        state.loading = !state.loading
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setError} = appSlice.actions

export default appSlice.reducer