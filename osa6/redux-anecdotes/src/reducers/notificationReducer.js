import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notifSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        notifier(state, action){
            return action.payload
        },
        reset(){
            return initialState
        }
    }
})

export const {notifier, reset} = notifSlice.actions
export default notifSlice.reducer