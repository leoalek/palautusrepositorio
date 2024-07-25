import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import User from '../../../backend/models/user'

//only title as exercise 5.7 is done
test('render blog title', () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    url: 'urlTest',
    likes:0,
    user:{
      username: 'blogUsernameTest',
      name: 'blogNameTest',
    }
  }

  render(<Blog blog={blog}/>)

  const basicElement = screen.getByTestId('blog-title')
  expect(basicElement).toBeDefined()

  //extra info hidden
  const extendElement = screen.queryByTestId('blog-info')
  expect(extendElement).toBeNull()
})

test('clicking show button shows extended information', async () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    url: 'urlTest',
    likes:0,
    user:{
      username: 'blogUsernameTest',
      name: 'blogNameTest',
    }
  }

  const loggeduser = {
    name: 'name',
    username: 'username'
  }


  render(<Blog blog={blog} user={loggeduser}/>)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const element = screen.queryByTestId('blog-info')
  expect(element).toHaveTextContent('urlTest')
  expect(element).toHaveTextContent(0)
  expect(element).toHaveTextContent('blogNameTest')

})

test('like button clicked twice and called twice', async () => {
  const blog = {
    title: 'titleTest',
    author: 'authorTest',
    url: 'urlTest',
    likes:0,
    user:{
      username: 'blogUsernameTest',
      name: 'blogNameTest',
    }
  }

  const loggeduser = {
    name: 'name',
    username: 'username'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} user={loggeduser} updateLikes={mockHandler}/>)

  const user = userEvent.setup()
  const showButton = screen.getByText('show')

  await user.click(showButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})