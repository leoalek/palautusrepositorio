import { render, screen } from '@testing-library/react'
import FormAddBlog from './formAddBlog'
import userEvent from '@testing-library/user-event'

test('form has right data when submitted', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<FormAddBlog handleNewBlog={createBlog}/>)

  const titleInput = screen.getByPlaceholderText('titleText')
  const authorInput = screen.getByPlaceholderText('authorText')
  const urlInput = screen.getByPlaceholderText('urlText')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Title Input')
  await user.type(authorInput, 'Author Input')
  await user.type(urlInput, 'Url Input')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Title Input',
    author: 'Author Input',
    url: 'Url Input',
  })
})