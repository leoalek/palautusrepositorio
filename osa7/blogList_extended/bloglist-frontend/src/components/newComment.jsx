import React from 'react'
import { useDispatch } from 'react-redux'
import { newComment } from '../reducers/commentReducer'
import { Button, Form } from 'react-bootstrap'

const NewComment = ({ toggleVisibility, blogId }) => {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    toggleVisibility()

    dispatch(newComment(comment, blogId))
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Label>New Comment:</Form.Label>
        <Form.Control type="text" data-testid="comment" name="comment" />
        <Button type="submit">Create</Button>
      </Form>
    </div>
  )
}

export default NewComment
