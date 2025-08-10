import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleDelete }) => {
  //const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const canRemove = blog.user ? blog.user.username === storage.me() : true
  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </td>
      <td style={{ textAlign: 'right' }}>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>delete</button>
        )}
      </td>
    </tr>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object
  }).isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
