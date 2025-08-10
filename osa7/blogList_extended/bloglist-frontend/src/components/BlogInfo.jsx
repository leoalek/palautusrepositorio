import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { initialize } from '../reducers/commentReducer'
import { useEffect } from 'react'
import Comments from './Comments'
import { Button } from 'react-bootstrap'

const BlogInfo = ({ blog }) => {
  //console.log(blog)
  const dispatch = useDispatch()

  const nameOfUser = blog && blog.user ? blog.user.name : 'anonymous'

  useEffect(() => {
    if (blog && blog?.id) {
      dispatch(initialize(blog.id))
    }
  }, [dispatch, blog])

  const handleVote = async (blog) => {
    //console.log('updating', blog)
    dispatch(likeBlog(blog))
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
        likes: <span className="me-3">{blog.likes}</span>
        <Button onClick={() => handleVote(blog)}>like</Button>
      </p>
      <p>created by {nameOfUser}</p>
      <Comments blogId={blog.id} />
    </div>
  )
}
export default BlogInfo
