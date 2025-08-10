import axios from 'axios'

const baseUrl = '/api/blogs'

const create = async (comment, id) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment
  })
  return response.data
}

const getComments = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

export default { create, getComments }
