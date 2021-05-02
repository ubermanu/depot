<script>
  import books, { createBook, deleteBook } from './books'

  let title = ''
  let author = ''
</script>

<form on:submit|preventDefault={() => createBook(title, author)}>
  <input type="text" name="title" bind:value={title}>
  <input type="text" name="author" bind:value={author}>
  <button type="submit">Add</button>
</form>

<ul class="library">
  {#each $books as book}
    <li class="book">
      <p class="title">{book.title}</p>
      <p class="author"><small>from: {book.author}</small></p>
      <button class="action delete" on:click={() => deleteBook(book)}>×</button>
    </li>
  {/each}
</ul>
