import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loggingOut } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

const Navigator = () => {
  const loggedUser = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(loggingOut(loggedUser))
    navigate('/login')
  }

  return (
    <div>
      <Link style={{ padding: 5 }} to="/">
        blogs
      </Link>
      <Link style={{ padding: 5 }} to="/users">
        users
      </Link>
      {loggedUser.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Navigator
