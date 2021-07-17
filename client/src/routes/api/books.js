import books from '../../../../collection-samples/books.json'

export async function get({ params }) {
  
  return {
    body: {
      books
    }
  }
}

