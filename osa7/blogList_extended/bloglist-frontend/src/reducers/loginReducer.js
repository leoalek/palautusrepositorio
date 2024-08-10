import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storage from '../services/storage'
import { setNotification as notify } from './notificationReducer'
import { useNavigate } from 'react-router-dom'

const loginSlice = createSlice({
  name: 'login',
  initialState: storage.loadUser() || null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout() {
      return null
    }
  }
})

export const { login, logout } = loginSlice.actions

export const loggingIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      console.log('user', user)
      storage.saveUser(user)
      dispatch(login(user))
      dispatch(notify(`Welcome back, ${user.name}`))
    } catch (error) {
      dispatch(notify('Wrong credentials', undefined, 'error'))
    }
  }
}

export const loggingOut = (user) => {
  return async (dispatch) => {
    storage.removeUser()
    dispatch(logout())
    dispatch(notify(`Bye, ${user.name}!`))
  }
}

export default loginSlice.reducer
