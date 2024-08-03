import { configureStore } from '@reduxjs/toolkit'

import notificationReducer from './reducers/notificationReducer'

//reducers here
const store = configureStore({
  reducer: {
    notification: notificationReducer
  }
})
