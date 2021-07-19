import db from '../../../json/db.js'

const authors = db.authors

export async function get (request) {
  try {
    const bid = request.params.slug
    const book = await authors.find(({ id }) => id == bid)
    return {
      status: 200,
      body: book
    }
  } catch (err) {
    return {
      status: 500,
      body: {
        error: 'A server error occured: ',
        type: '' + err
      }
    }
  }
}

export async function del (request) {
  const bid = request.params.slug
  const ret = authors.findIndex(({ id }) => id == bid)
  if (ret >= 0) {
    authors.splice(ret, 1)
  }
  return {
    status: 200,
    body: { i: ret }
  }
}
