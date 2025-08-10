import React from 'react'
import { useDispatch } from 'react-redux'
import { newBlog } from '../reducers/blogReducer'
import { setNotification as notify } from '../reducers/notificationReducer'

import { Form, Button } from 'react-bootstrap'

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
  }

  return (
    <div>
      <h2>Create a New Blog</h2>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            data-testid="title"
            name="title"
            style={{ backgroundColor: 'lightgray', border: '2px solid black' }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            data-testid="url"
            name="url"
            style={{ backgroundColor: 'lightgray', border: '2px solid black' }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            data-testid="author"
            name="author"
            style={{ backgroundColor: 'lightgray', border: '2px solid black' }}
          />
        </Form.Group>
        <Button
          type="submit"
          className="mr-2"
          style={{ border: '2px solid black' }}
        >
          Create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlog
