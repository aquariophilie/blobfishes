import authors from '../../json/authors.json'

export async function get (request) {
  return {
    status: 200,
    body: authors
  }
}
