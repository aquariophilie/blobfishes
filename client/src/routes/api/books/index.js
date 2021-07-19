import db from '../../../json/db.js'

const books = db.books

export async function get (request) {
  return {
    status: 200,
    body: books
  }
}
