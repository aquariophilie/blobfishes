import db from '../../../json/db.js'

let authors = db.authors
let books = db.books

function newId () {
  let newId = books.reduce((a, c) => { return (c.id > a) ? c.id : a   }, 0)

  return 1 + newId
}

export async function get (request) {
  return {
    status: 200,
    body: authors
  }
}


export async function put (request) {
  const author = JSON.parse(request.body)
  author['id'] = newId()
  authors.push(author)
  return {
    status: 200,
    body: {
      status: 'Success'
    }
  }
}