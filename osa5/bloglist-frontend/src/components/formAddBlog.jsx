import { useState } from 'react'
import PropTypes from 'prop-types'

const FormAddBlog = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }
    handleNewBlog(blogObject)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>Add new blog</h2>
      <form onSubmit={handleOnSubmit}>
        <div>
                    title:
          <input type='text'value={title}name='Title'onChange={({ target }) => setTitle(target.value)} placeholder='titleText'></input><br/>
                    author:
          <input type='text'value={author}name='Author'onChange={({ target }) => setAuthor(target.value)} placeholder='authorText'></input><br/>
                    url:
          <input type='text'value={url}name='Url'onChange={({ target }) => setUrl(target.value)} placeholder='urlText'></input>
        </div>
        <button data-testid={'submit-newBlog'}type='submit'>create</button>
      </form>
    </div>

  )
}

FormAddBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default FormAddBlog