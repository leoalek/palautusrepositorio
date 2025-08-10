import { loggingIn } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'

import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleLogin} className="w-25">
      <Notification />
      <Form.Group className="mb-3">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" data-testid="username" name="username" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" data-testid="password" name="password" />
      </Form.Group>

      <Button type="submit">login</Button>
    </Form>
  )
}

export default Login
