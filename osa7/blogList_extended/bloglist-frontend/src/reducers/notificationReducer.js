import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

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

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(notifier(content))
    setTimeout(() => {
      dispatch(notifierReset())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
