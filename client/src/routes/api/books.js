import books from '../../json/books.json'

export async function get (request) {
  return {
    status: 200,
    body: books
  }
}
