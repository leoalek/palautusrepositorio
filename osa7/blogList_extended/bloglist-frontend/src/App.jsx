import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import BlogInfo from './components/BlogInfo'
import Login from './components/Login'
import Notification from './components/Notification'
import Navigator from './components/Navigator'
import Users from './components/Users'
import Allblogs from './components/Allblogs'
import User from './components/User'

//initial blogs
import { initialize as initBlogs } from './reducers/blogReducer'

//initial users
import { initialize as initUsers } from './reducers/userReducer'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useMatch
} from 'react-router-dom'

const App = () => {
  const loggedUser = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  console.log(users)

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
    <div>
      <h2>blogs</h2>
      <Notification />
      <Navigator />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={user} />} />
        <Route path="/" element={loggedUser ? <Allblogs /> : <Login />} />
        <Route path="/blogs/:id" element={<BlogInfo blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
