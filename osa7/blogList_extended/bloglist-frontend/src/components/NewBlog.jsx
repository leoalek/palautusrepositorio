import React from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { setNotification as notify } from '../reducers/notificationReducer'

const NewBlog = ({ toggleVisibility }) => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const url = event.target.url.value
    const author = event.target.author.value

    event.target.title.value = ''
    event.target.url.value = ''
    event.target.author.value = ''

    toggleVisibility()

    dispatch(newBlog({ title, url, author }))
    dispatch(notify(`Blog created: ${title}, ${author}`))
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" data-testid="title" name="title" />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" data-testid="url" name="url" />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" data-testid="author" name="author" />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default NewBlog
