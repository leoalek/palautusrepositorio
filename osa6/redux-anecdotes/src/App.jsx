import { useEffect } from 'react'
import NewAnecdote from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Filter from './components/filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializer } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializer())
  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App