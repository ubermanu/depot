import {
  find,
  first,
  flattenDeep,
  groupBy,
  has,
  isObject,
  last,
  size
} from 'lodash-es'
import { get, writable } from 'svelte/store'
import uuid from 'uuid-random-es'

/**
 * Default depot options
 * @type {{uuid: *}}
 */
export const defaults = {
  uuid,
  id: 'id'
}

/**
 * Create a writable store with CRUD functions.
 * Each items contains an `id` property managed by the store itself.
 * @function depot
 */
export default function depot(options = {}) {
  const store = writable([])

  // Overwrite default options
  const opt = { ...defaults, ...options }

  /**
   * Public interface for the depot collection.
   * @type {any}
   */
  const self = {
    store,

    /**
     * Add elements to the depot.
     * Accepts multiple arguments and arrays.
     *
     * @example add({}, {}, {})
     * @example add([{}, {}])
     *
     * @return {any}
     */
    add() {
      if (arguments.length === 0) {
        return self
      }

      let items = flattenDeep([...arguments])
      items = items.map((item) => ({ [opt.id]: opt.uuid(), ...item }))

      // Update the store
      store.update((s) => [...s, ...items])

      return self
    },

    /**
     * Save elements in a depot.
     * Accepts multiple arguments and arrays.
     *
     * The whole element is being replaced based on the given id.
     *
     * @example save({ id: '1234', 'new_prop': 'abc' })
     *
     * @return {any}
     */
    save() {
      if (arguments.length === 0) {
        return self
      }

      let items = flattenDeep([...arguments])
      items = groupBy(items, opt.id)

      // Update the store
      store.update((s) => [
        ...s.map((i) => (has(items, i[opt.id]) ? last(items[i[opt.id]]) : i))
      ])

      return self
    },

    /**
     * Remove elements from the depot.
     * Accepts multiple arguments and arrays.
     *
     * @example remove({ 'id': 1234 })
     * @example remove('1234')
     *
     * @return {any}
     */
    remove() {
      if (arguments.length === 0) {
        return self
      }

      // Fetch a list of ids from the arguments
      let ids = flattenDeep([...arguments])
      ids = ids.map((item) => (isObject(item) ? item[opt.id] : item))

      // Update the store
      store.update((s) => [...s.filter(({ id }) => ids.includes(id) === false)])

      return self
    },

    /**
     * Remove all the values in the store.
     * @return {any}
     */
    empty() {
      store.set([])
      return self
    },

    /**
     * @returns {*[]}
     */
    values() {
      return get(store)
    },

    /**
     * @returns {object}
     */
    first() {
      return first(self.values())
    },

    /**
     * @returns {object}
     */
    last() {
      return last(self.values())
    },

    /**
     * @returns {object}
     */
    find(where) {
      return find(self.values(), where)
    },

    /**
     * @returns {number}
     */
    size() {
      return size(self.values())
    }
  }

  return self
}
