import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { notifier, reset } from "../reducers/notificationReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notifier(`new anecdote created '${content}'`))
    setTimeout(() => {
      dispatch(reset())
    },5000)
  }

  return(
  <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
  </div>
  )
}

export default NewAnecdote
