<script>
    import { writable } from 'svelte/store'
    import books, { createBook, updateBook, deleteBook, findBookByAuthor } from './books'

    const bookForm = writable({
        title: '',
        author: ''
    })
</script>

<form on:submit|preventDefault={() => createBook($bookForm)}>
    <input type="text" name="title" bind:value={$bookForm.title}>
    <input type="text" name="author" bind:value={$bookForm.author}>
</form>

<ul>
    {#each $books as book}
        <li>
            <p class="title">{book.title}</p>
            <p class="author"><small>from: {book.author}</small></p>
        </li>
    {/each}
</ul>
