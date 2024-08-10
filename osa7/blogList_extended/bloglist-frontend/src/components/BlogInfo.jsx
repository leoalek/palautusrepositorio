import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { setNotification as notify } from '../reducers/notificationReducer'

const BlogInfo = ({ blog }) => {
  console.log(blog)
  const dispatch = useDispatch()

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const handleVote = async (blog) => {
    console.log('updating', blog)
    dispatch(likeBlog(blog))
    dispatch(notify(`You liked ${blog.title} by ${blog.author}`))
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p>
        {' '}
        likes: {blog.likes}{' '}
        <button onClick={() => handleVote(blog)}>like</button>
      </p>
      <p>created by {nameOfUser}</p>
    </div>
  )
}
export default BlogInfo
