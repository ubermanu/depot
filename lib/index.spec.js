import depot from './index'

test('the repo can be created and contain the store', () => {
  const items = depot()
  expect(items.size()).toBe(0)
  expect(items.values()).toEqual([])
})

test('add an element', () => {
  const items = depot()

  items.add({})
  expect(items.size()).toBe(1)

  items.add([{}, {}, {}, {}])
  expect(items.size()).toBe(5)

  items.add({}, {}, {})
  expect(items.size()).toBe(8)
})

test('update an element', () => {
  const items = depot()
  items.add({}, {})

  const one = items.first()
  items.save({ ...one, custom_prop: '456789' })

  expect(items.size()).toBe(2)
  expect(items.first()).toHaveProperty('custom_prop')
  expect(items.first().custom_prop).toBe('456789')
})

test('remove an element', () => {
  const items = depot()
  items.add({}, {}, {}, {}, {}, {})

  const head = items.first()
  const tail = items.last()

  expect(items.size()).toBe(6)

  items.remove(head)
  expect(items.size()).toBe(5)

  items.remove(tail.id)
  expect(items.size()).toBe(4)
})

test('find an element', () => {
  const items = depot()

  const users = [
    { user: 'barney', age: 36, active: true },
    { user: 'fred', age: 40, active: false },
    { user: 'pebbles', age: 1, active: true }
  ]

  items.add(users)

  expect(items.find((o) => o.age < 40).user).toBe('barney')
  expect(items.find({ age: 1, active: true }).user).toBe('pebbles')
  expect(items.find(['active', false]).user).toBe('fred')
  expect(items.find('active').user).toBe('barney')
})

test('can chain multiple crud methods', () => {
  const items = depot()

  items
    .add({ name: 'John Doe' })
    .save({ ...items.first(), name: 'Johanna Doe' })
    .remove(items.first())

  expect(items.size()).toBe(0)
})

test('the repo can be deconstructed', () => {
  const items = depot()
  const { add, save, remove } = items

  add({ name: 'John Doe' })
  save({ ...items.first(), name: 'Johanna Doe' })
  remove(items.first())

  expect(items.size()).toBe(0)
})

test('the repo can be deconstructed and chain methods', () => {
  const items = depot()
  const { add, save, remove } = items

  add({ name: 'John Doe' })
  save({ ...items.first(), name: 'Johanna Doe' })
  remove(items.first())

  expect(items.size()).toBe(0)

  expect(add({ name: 'John Doe' }).remove(items.first()).size()).toBe(0)
})
