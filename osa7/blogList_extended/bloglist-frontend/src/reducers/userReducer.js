import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      console.log(action.payload)
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const initUsers = await userService.getUsers()
    dispatch(setUsers(initUsers))
  }
}

export default userSlice.reducer
