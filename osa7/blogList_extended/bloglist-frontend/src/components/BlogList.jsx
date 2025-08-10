import { useDispatch, useSelector } from 'react-redux'
import Blog from '../components/Blog'
import { setNotification as notify } from '../reducers/notificationReducer'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const byLikes = (a, b) => b.likes - a.likes

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
    }
  }

  return (
    <div>
      <Table striped>
        <tbody>
          {blogs
            .slice()
            .sort(byLikes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} handleDelete={handleDelete} />
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList
