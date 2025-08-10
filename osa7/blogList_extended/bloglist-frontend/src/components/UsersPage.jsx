import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UsersPage = () => {
  const users = useSelector((state) => state.users)
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th></th>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ textAlign: 'left' }}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td style={{ textAlign: 'center' }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UsersPage
