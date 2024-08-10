import BlogList from './BlogList'
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { useRef } from 'react'

const Allblogs = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Allblogs
