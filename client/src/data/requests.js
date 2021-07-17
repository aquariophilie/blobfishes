import axios from 'axios'

async function getBooks() {
  const response = axios.get('/api/books')

  return response.data
}

export default {
  getBooks,
}
