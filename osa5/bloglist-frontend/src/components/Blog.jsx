import { useState } from 'react'

const Blog = ({ blog, updateLikes, user, deleteBlog }) => {
  const [extendInfo, setExtend] = useState(false)
  const [creator] = useState(blog.user.name)
  const [username] = useState(blog.user.username)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleExtension = () => {
    setExtend(!extendInfo)
  }

  const handleLike = () => {
    const blogObject = ({ ...blog, likes: blog.likes+1 })
    updateLikes(blogObject)
  }

  const deleteThis = () => {
    deleteBlog(blog)
  }

  return(
    <div style={blogStyle} className="blog">
      <div data-testid="blog-title">
        {blog.title} {blog.author}
        <button onClick={toggleExtension}>
          {extendInfo?'hide':'show'}</button>
      </div>
      {extendInfo && (
        <div data-testid="blog-info">
          <div>
            likes: {blog.likes}
            <button onClick={handleLike}>like</button>
            <br/>
            {blog.url}<br/>
            {creator}
          </div>
          <div>
            {user.username === username && (
              <button onClick={deleteThis}>delete</button>
            )}
          </div>
        </div>

      )}
    </div>
  )
}



export default Blog