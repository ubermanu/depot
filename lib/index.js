import _ from 'lodash'
import { get, writable } from 'svelte/store'
import { v4 } from 'uuid'

const defaultConfig = {
  uuid: v4
}

/**
 * Create a writable store with CRUD functions.
 * Each items contains an `id` property managed by the store itself.
 *
 * @param {{uuid: function}} config
 * @returns {*}
 */
export default function depot(config = {}) {
  const store = writable([])
  const { update: u } = store

  // Extend default configuration
  config = Object.assign(defaultConfig, config)
  const { uuid } = config

  /**
   * Add elements to the depot.
   * Accepts multiple arguments and arrays.
   *
   * @example add({}, {}, {})
   * @example add([{}, {}])
   */
  function add() {
    if (arguments.length === 0) {
      return
    }

    // Flatten the arguments and insert the id
    let items = _.flattenDeep(arguments)
    items = items.map((item) => ({ id: uuid(), ...item }))

    // Update the store
    u((s) => [...s, ...items])
  }

  /**
   * Update elements in a depot.
   * Accepts multiple arguments and arrays.
   *
   * The whole element is being replaced based on the given id.
   *
   * @example update({ id: '1234', 'new_prop': 'abc' })
   */
  function update() {
    if (arguments.length === 0) {
      return
    }

    // // Flatten the arguments and insert the id
    let items = _.flattenDeep(arguments)
    items = _.groupBy(items, 'id')

    u((s) => [...s.map((i) => (_.has(items, i.id) ? _.last(items[i.id]) : i))])
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
      return
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
