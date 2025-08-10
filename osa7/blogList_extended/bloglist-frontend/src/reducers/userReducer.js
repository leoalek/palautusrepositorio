import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    updateUser(state, action) {
      return state.map((user) =>
        user.id !== action.payload.id ? user : action.payload
      )
    }
  }
})

export const { setUsers, updateUser } = userSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const initUsers = await userService.getUsers()
    dispatch(setUsers(initUsers))
  }
}

export const userUpdate = (user) => {
  return async (dispatch) => {
    console.log(user)
    const updatedUser = await userService.getOneUser(user.id)
    dispatch(updateUser(updatedUser))
  }
}

export default userSlice.reducer
