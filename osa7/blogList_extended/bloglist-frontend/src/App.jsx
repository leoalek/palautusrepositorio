import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogInfo from './components/BlogInfo'
import Login from './components/Login'
import Notification from './components/Notification'
import Navigator from './components/Navigator'
import UsersPage from './components/UsersPage'
import Allblogs from './components/Allblogs'
import UserPage from './components/UserPage'

//initial blogs
import { initialize as initBlogs } from './reducers/blogReducer'

//initial users
import { initialize as initUsers } from './reducers/userReducer'

import { Routes, Route, useMatch } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import './index.css'

const App = () => {
  const loggedUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  let match = useMatch('/users/:id')
  const user = match
    ? users.find((user) => user.id === String(match.params.id))
    : null

  match = useMatch('/blogs/:id')
  const blog = match
    ? blogs.find((blog) => blog.id === String(match.params.id))
    : null

  //init blogs and users
  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  if (!loggedUser) {
    return (
      <div>
        <h2>blogs</h2>
        <Login />
      </div>
    )
  }

  return (
    <Container>
      <div>
        <Notification />
        <Navigator />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={loggedUser ? <Allblogs /> : <Login />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage user={user} />} />
          <Route path="/blogs/:id" element={<BlogInfo blog={blog} />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
