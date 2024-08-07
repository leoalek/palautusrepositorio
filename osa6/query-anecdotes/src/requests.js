import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
    return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = async (object) => {
    return await axios.post(`${baseUrl}`,object).then(res => res.data)
}

export const updateAnecdote =async (updatedAnecdote) => {
    await axios.put(`${baseUrl}/${updatedAnecdote.id}`,updatedAnecdote).then(res => res.data)
}