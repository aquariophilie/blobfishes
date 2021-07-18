import db from '../../../json/db.js'

let books = db.books


export async function get (request) {
  return {
    status: 200,
    body: books
  }
}
