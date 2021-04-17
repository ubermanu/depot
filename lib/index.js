import { get, writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

/**
 * Create a writable store with CRUD functions.
 * Each items contains an `id` property managed by the store itself.
 * @returns {*}
 */
export default () => {
  const store = writable([])
  const { update: u } = store

  /**
   * Add elements to the depot.
   * Accepts multiple arguments and arrays.
   */
  function add() {
    let items = []

    if (arguments.length === 0) {
      throw new Error('Nothing to add')
    }

    for (let i = 0, l = arguments.length; i < l; i++) {
      if (typeof arguments[i] !== 'object') {
        continue
      }

      if (Array.isArray(arguments[i])) {
        items = items.concat(arguments[i])
      } else {
        items.push(arguments[i])
      }
    }

    items = items.map((item) => ({ id: uuid(), ...item }))
    u((s) => [...s, ...items])
  }

  function update(item) {
    u((s) => [...s.map((i) => (i.id === item.id ? item : i))])
  }

  function destroy(item) {
    u((s) => [...s.filter((i) => i.id !== item.id)])
  }

  function toArray() {
    return get(store)
  }

  return {
    store,
    add,
    update,
    destroy,
    toArray
  }
}
