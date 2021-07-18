import axios from 'axios'

const apiPath = "/api"
const authApiPath = `${apiPath}/authors`

async function getAuthors() {
  const res = await fetch(authApiPath)
  const jsonRes = await res.json()
  return jsonRes 
}

async function delAuthor(authorId) {
  const res = await fetch(authApiPath,{
    method: "del",
    body: ({
      id: authorId
    })
  })
}

async function getBooks() {
  res = await axios.get('/api/books')
  return res.data
}

function deleteBook(book) {
  const path = `/api/books/${book.id}`;
  axios.delete(path)
    .then(() => {
      getBooks();
    })
    .catch((error) => {
      console.error(error);
      getBooks();
    });
};


export default {
  getAuthors,
  delAuthor
}
