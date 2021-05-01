import depot from '../lib/index'

const books = depot()
const { store, add, save, remove, find } = books

export function createBook(title, author) {
  add({ title, author })
}

export function updateBook(book) {
  save(book)
}

export function deleteBook(book) {
  remove(book)
}

export function findBookByAuthor(author) {
  return find({ author })
}

export default store
