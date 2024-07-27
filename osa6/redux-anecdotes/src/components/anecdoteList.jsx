import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if(state.filter === ''){
            return state.list
        }
        return state.list.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
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