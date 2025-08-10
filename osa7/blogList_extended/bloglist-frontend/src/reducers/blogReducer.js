import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { userUpdate } from './userReducer'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      console.log(action)
      return state.filter((b) => b.id !== action.payload.id)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    }
  }
})

export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogSlice.actions

export const initialize = () => {
  return async (dispatch) => {
    const initBlogs = await blogService.getAll()
    dispatch(setBlogs(initBlogs))
  }
}

export const newBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(userUpdate(newBlog.user))
    dispatch(setNotification(`Blog created: ${blog.title}, ${blog.author}`))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    console.log('Before delete')
    await blogService.remove(blog.id)
    console.log('HERE')
    dispatch(removeBlog(blog))
    dispatch(setNotification(`Blog ${blog.title}, by ${blog.author} removed`))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    })
    dispatch(updateBlog(updatedBlog))
    dispatch(setNotification(`You liked ${blog.title} by ${blog.author}`))
  }
}

export default blogSlice.reducer
