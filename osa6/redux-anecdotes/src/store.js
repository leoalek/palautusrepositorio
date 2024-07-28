import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer:{
        list: anecdoteReducer,
        filter: filterReducer,
        notif: notificationReducer
    }
})

export default store