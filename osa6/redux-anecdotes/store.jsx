import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer:{
        list: anecdoteReducer,
        filter: filterReducer
    }
})

export default store