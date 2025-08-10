import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loggingOut } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'

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
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>blogs</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown
              title="menu"
              id="basic-nav-dropdown"
              className="bg-dark text-light"
            >
              <NavDropdown.Item as={Link} to="/" style={{ padding: 5 }}>
                blogs
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/users" style={{ padding: 5 }}>
                users
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <Button
                variant="primary"
                onClick={handleLogout}
                className="w-100"
              >
                logout
              </Button>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>{loggedUser.name} logged in</Navbar.Text>
      </Navbar>
    </div>
  )
}

export default Navigator
