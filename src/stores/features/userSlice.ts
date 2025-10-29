import { createSlice} from '@reduxjs/toolkit'

export interface UserState {
  user: null,
}

const initialState: UserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    setUser(state, action){
        state.user = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions

export default userSlice.reducer