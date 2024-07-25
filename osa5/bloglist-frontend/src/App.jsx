import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import FormAddBlog from './components/formAddBlog'
import Togglable from './components/togglable'

const TIMEOUT = 2000

const Notification = ({ message,className }) => {
  if(message === null){
    return(null)
  }
  return(
    <div className={className}>
      {message}
    </div>
  )

}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [className,setClassName] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedUser',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setMessage('logged in')
      setClassName('success')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
        setClassName('')
      },TIMEOUT)
    } catch (exception) {
      setMessage('wrong credentials')
      setClassName('error')
      setTimeout(() => {
        setMessage(null)
        setClassName('')
      }, TIMEOUT)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setMessage('logged out')
    setClassName('success')
    setTimeout(() => {
      setMessage(null)
      setClassName('')
    }, TIMEOUT)
  }

  const handleNewBlog = async (blogObject) => {
    try{
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setClassName('success')
      blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
        setClassName('')
      }, 1000)
    }catch (exception) {
      setMessage('could not add Blog')
      setClassName('error')
      setTimeout(() => {
        setMessage(null)
        setClassName('')
      }, TIMEOUT)
    }
  }

  const updateLikes = async (uptadedBlogObject) => {
    try{
      const updatedBlog = await blogService.like(uptadedBlogObject)
      const updateBlogList = blogs.map(blog => blog.id === updatedBlog.id? updatedBlog : blog)
      setBlogs(updateBlogList.sort((a,b) => b.likes - a.likes))

    }catch(exception){
      setMessage('could not update')
      setClassName('error')
      setTimeout(() => {
        setMessage(null)
        setClassName('')
      }, TIMEOUT)
    }
  }

  const deleteBlog = async (blog) => {
    if(window.confirm(`remove blog ${blog.title} by ${blog.author}`)){
      await blogService.deleteBlog(blog)
      setBlogs(blogs.filter(blogNow => blogNow.id !== blog.id))
    }
  }

  const newBlogForm = () => {
    return(
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <FormAddBlog
          handleNewBlog={handleNewBlog}
        />
      </Togglable>
    )
  }

  const blogList = () => {
    return(
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} user = {user} deleteBlog={deleteBlog}/>
        )}
      </div>
    )
  }

  if(user === null){
    return(
      <div>
        <h2>login in to application</h2>
        <Notification message={message}className={className}></Notification>
        <form onSubmit={handleLogin} data-testid="login-form">
          <div>
            username:
            <input
              data-testid="username"
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}/><br/>
            password:
            <input
              data-testid="password"
              type='text'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <div>
            <button type='submit'>login</button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}className={className}></Notification>
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        {newBlogForm()}
      </div>
      {blogList()}
    </div>
  )
}

export default App