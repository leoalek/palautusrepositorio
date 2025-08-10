import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserPage = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }
  //console.log(user.blogs.map((b) => b.title))
  return (
    <div>
      <h2>{user.name}</h2>
      <Table striped>
        <thead>
          <tr>
            <th>added blogs</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserPage
