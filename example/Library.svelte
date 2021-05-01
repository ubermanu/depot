<script>
  import { writable } from 'svelte/store'
  import books, { createBook, deleteBook } from './books'

  const bookForm = writable({
    title: '',
    author: ''
  })
</script>

<form on:submit|preventDefault={() => createBook($bookForm)}>
  <input type='text' name='title' bind:value={$bookForm.title}>
  <input type='text' name='author' bind:value={$bookForm.author}>
</form>

<ul class='library'>
  {#each $books as book}
    <li class='book'>
      <p class='title'>{book.title}</p>
      <p class='author'><small>from: {book.author}</small></p>
      <button class="action delete" on:click={() => deleteBook(book)}>×</button>
    </li>
  {/each}
</ul>
