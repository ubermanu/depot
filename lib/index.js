import _ from 'lodash'
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
   *
   * @example add({}, {}, {})
   * @example add([{}, {}])
   */
  function add() {
    if (arguments.length === 0) {
      throw new Error('Nothing to add')
    }

    // Flatten the arguments and insert the id
    let items = _.flattenDeep(arguments)
    items = items.map((item) => ({ id: uuid(), ...item }))

    // Update the store
    u((s) => [...s, ...items])
  }

  function update(item) {
    u((s) => [...s.map((i) => (i.id === item.id ? item : i))])
  }

  /**
   * Remove elements from the depot.
   * Accepts multiple arguments and arrays.
   *
   * @example remove({ 'id': 1234 })
   * @example remove('1234')
   */
  function remove() {
    if (arguments.length === 0) {
      throw new Error('Nothing to remove')
    }

    // Fetch a list of ids from the arguments
    let ids = _.flattenDeep(arguments)
    ids = ids.map((item) => (_.isObject(item) ? item['id'] : item))

    // Update the store
    u((s) => [...s.filter(({ id }) => ids.includes(id) === false)])
  }

  /**
   * @returns {*[]}
   */
  function toArray() {
    return get(store)
  }

  return {
    store,
    add,
    first: () => _.first(toArray()),
    last: () => _.last(toArray()),
    update,
    remove,
    toArray
  }
}
