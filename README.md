# Depot for Svelte

[![CI](https://github.com/ubermanu/depot/actions/workflows/ci.yml/badge.svg)](https://github.com/ubermanu/depot/actions/workflows/ci.yml)

Repository pattern implementation connected to a writable store.

### Install

    npm i svelte-depot

### Usage

Here is a basic CRUD example:

```js
// src/stores/books.js
import depot from 'svelte-depot'

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
```
