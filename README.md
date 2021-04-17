# Depot for Svelte

Repository pattern implementation connected to a writable store.

### Usage

Here is a basic cart system.<br>
The quote refers to the item that contains the product and its quantity.

```js
// src/stores/cart.js
import depot from 'svelte-depot'

const cart = depot()
const { store, add, update, remove } = cart

export function addProductToCart(product, quantity) {
    add({ product, quantity })
}

export function updateQuoteQuantity(quote, quantity) {
    update({ ...quote, quantity })
}

export function removeQuote(quote) {
    remove(quote)
}

export default store
```
