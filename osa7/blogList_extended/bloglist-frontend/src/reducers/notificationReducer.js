import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notifier(state, action) {
      return action.payload
    },
    notifierReset() {
      return initialState
    }
  }
})

export const { notifier, notifierReset } = notificationSlice.actions

export const setNotification = (message, time = 5, type = 'success') => {
  return async (dispatch) => {
    dispatch(notifier({ message, type }))
    setTimeout(() => {
      dispatch(notifierReset())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
