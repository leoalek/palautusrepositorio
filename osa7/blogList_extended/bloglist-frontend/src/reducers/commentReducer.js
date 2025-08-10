import { createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comments'
import { setNotification } from './notificationReducer'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [],
  reducers: {
    setComments(state, action) {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setComments, appendComment } = commentSlice.actions

export const initialize = (blogId) => {
  return async (dispatch) => {
    const initComments = await commentService.getComments(blogId)
    dispatch(setComments(initComments))
  }
}

export const newComment = (comment, blogId) => {
  return async (dispatch) => {
    const newComment = await commentService.create(comment, blogId)
    dispatch(appendComment(newComment))
    dispatch(setNotification('comment created'))
  }
}

export default commentSlice.reducer
