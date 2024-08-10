import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { setNotification as notify } from '../reducers/notificationReducer'
import { removeBlog, likeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const byLikes = (a, b) => b.likes - a.likes

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog))
      dispatch(notify(`Blog ${blog.title}, by ${blog.author} removed`))
    }
  }

  return (
    <div>
      {blogs
        .slice()
        .sort(byLikes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} handleDelete={handleDelete} />
        ))}
    </div>
  )
}

export default BlogList
