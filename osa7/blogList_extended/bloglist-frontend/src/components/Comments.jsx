import { useSelector } from 'react-redux'
import Togglable from './Togglable'
import NewComment from './newComment'
import { useRef } from 'react'

const Comments = ({ blogId }) => {
  const commentFromRef = useRef()
  const comments = useSelector((state) => state.comments)

  if (!comments) {
    return null
  }
  return (
    <div>
      <h1>Comments</h1>
      <Togglable buttonLabel="new comment" ref={commentFromRef}>
        <NewComment
          toggleVisibility={() => commentFromRef.current.toggleVisibility()}
          blogId={blogId}
        />
      </Togglable>
      <ul>
        {comments.slice().map((comment) => (
          <li key={comment.id}>{comment.comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
