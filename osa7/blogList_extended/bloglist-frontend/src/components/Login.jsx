import { loggingIn } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(loggingIn({ username, password }))
    navigate('/')
  }

  return (
    <form onSubmit={handleLogin}>
      <Notification />
      <label>
        Username:
        <input type="text" data-testid="username" name="username" />
      </label>
      <label>
        Password:
        <input type="password" data-testid="password" name="password" />
      </label>
      <input type="submit" value="Login" />
    </form>
  )
}

export default Login
