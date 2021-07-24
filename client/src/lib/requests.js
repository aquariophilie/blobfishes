import axios from 'axios'

const apiPath = '/api/author'

function getAuthors () {
  axios.get(`${apiPath}`)
    .then((res) => {
      return (res.data)
    })
}

export default {
  getAuthors
}
