import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async(content) => {
    const object = {content, votes: 0}
    const response = await axios.post(baseUrl,object)
    return response.data
}

const vote = async(id) => {
    const object = await axios.get(`${baseUrl}/${id}`)
    const response = await axios.put(`${baseUrl}/${object.data.id}`,{...object.data, votes: object.data.votes + 1})
    return response.data
}

export default {getAll, createNew, vote}