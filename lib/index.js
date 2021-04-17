import _ from 'lodash'
import { get, writable } from 'svelte/store'
import { v4 as uuid } from 'uuid'

/**
 * Create a writable store with CRUD functions.
 * Each items contains an `id` property managed by the store itself.
 * @class Depot
 */
class Depot {
  constructor() {
    this.store = writable([])
  }

  /**
   * Add elements to the depot.
   * Accepts multiple arguments and arrays.
   *
   * @example add({}, {}, {})
   * @example add([{}, {}])
   */
  add() {
    if (arguments.length === 0) {
      return
    }

    // Flatten the arguments and insert the id
    let items = _.flattenDeep(arguments)
    items = items.map((item) => ({ id: uuid(), ...item }))

    // Update the store
    this.store.update((s) => [...s, ...items])
  }

  /**
   * Update elements in a depot.
   * Accepts multiple arguments and arrays.
   *
   * The whole element is being replaced based on the given id.
   *
   * @example update({ id: '1234', 'new_prop': 'abc' })
   */
  update() {
    if (arguments.length === 0) {
      return
    }

    // // Flatten the arguments and insert the id
    let items = _.flattenDeep(arguments)
    items = _.groupBy(items, 'id')

    this.store.update((s) => [
      ...s.map((i) => (_.has(items, i.id) ? _.last(items[i.id]) : i))
    ])
  }

  /**
   * Remove elements from the depot.
   * Accepts multiple arguments and arrays.
   *
   * @example remove({ 'id': 1234 })
   * @example remove('1234')
   */
  remove() {
    if (arguments.length === 0) {
      return
    }

    // Fetch a list of ids from the arguments
    let ids = _.flattenDeep(arguments)
    ids = ids.map((item) => (_.isObject(item) ? item['id'] : item))

    // Update the store
    this.store.update((s) => [...s.filter(({ id }) => ids.includes(id) === false)])
  }

  /**
   * @returns {*[]}
   */
  toArray() {
    return get(this.store)
  }

  /**
   * @returns {object}
   */
  first() {
    return _.first(this.toArray())
  }

  /**
   * @returns {object}
   */
  last() {
    return _.last(this.toArray())
  }

  /**
   * @returns {object}
   */
  find(where) {
    return _.find(this.toArray(), where)
  }

  /**
   * @returns {number}
   */
  size() {
    return _.size(this.toArray())
  }
}

export default () => new Depot(...arguments)
