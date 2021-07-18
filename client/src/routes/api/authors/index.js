import db from '../../../json/db.js'

let authors = db.authors

export async function get (request) {
  return {
    status: 200,
    body: authors
  }
}
