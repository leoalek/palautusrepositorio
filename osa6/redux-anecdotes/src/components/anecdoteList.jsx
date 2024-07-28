import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notifier, reset } from "../reducers/notificationReducer"

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if(state.filter === ''){
            return state.list
        }
        return state.list.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote({id}))
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(notifier(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(reset())
        }, 5000)
      }

    return(
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>  
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
      )}
        </div>
    )
}

export default AnecdoteList