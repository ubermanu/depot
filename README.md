# Depot for Svelte

Repository pattern implementation connected to a writable store.

### Install

    npm i svelte-depot

### Usage

Here is a basic cart system.<br>
The quote refers to the item that contains the product and its quantity.

```js
// src/stores/cart.js
import depot from 'svelte-depot'

const cart = depot()
const { store, add, find, update, remove } = cart

// Add a new quote item into the cart
export function addProduct(product, quantity) {
    add({ product, quantity })
}

// If the product is in the cart, update its quantity
// If the quantity < 0, remove the product
export function updateProductQuantity(product, quantity) {
    const quote = find({ product })
    if (quote) {
        if (quantity > 0) {
            update({ ...quote, quantity })
        } else {
            remove(quote)
        }
    }
}

// Remove the quote for a product
export function removeProduct(product) {
    const quote = find({ product })
    quote && remove(quote)
}

export default store
```
