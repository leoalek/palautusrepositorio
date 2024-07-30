import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers:{
    voteAnecdote(state, action) {
      const votedAnecdote = action.payload
      const id = votedAnecdote.id

      const newAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
      }
      return state.map(anecdote =>
         anecdote.id !== id ? anecdote : newAnecdote)
         .sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})



export const {voteAnecdote, appendAnecdote, setAnecdote} = anecdoteSlice.actions

export const initializer = () => {
  return async dispatch => {
    const anecodotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecodotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voting = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)

    dispatch(voteAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer