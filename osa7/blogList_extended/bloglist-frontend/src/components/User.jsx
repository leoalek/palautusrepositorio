import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)
  console.log(user)

  if (!user) {
    return null
  }
  console.log(user.blogs.map((b) => b.title))
  return (
    <div>
      <h2>{user.name}</h2>
      <p>added blogs</p>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
