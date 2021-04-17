import depot from './index'

test('the repo can be created and contain the store', () => {
  const items = depot()
  expect(Object.keys(items)).toContain('store')
})

test('the repo can add elements', () => {
  const items = depot()

  items.add({})
  expect(items.toArray().length).toBe(1)

  items.add([{}, {}, {}, {}])
  expect(items.toArray().length).toBe(5)

  items.add({}, {}, {})
  expect(items.toArray().length).toBe(8)
})

test('the repo can remove elements', () => {
  const items = depot()

  items.add({}, {}, {}, {}, {}, {})
  expect(items.toArray().length).toBe(6)

  const head = items.first()
  const tail = items.last()

  items.remove(head)
  expect(items.toArray().length).toBe(5)

  items.remove(tail.id)
  expect(items.toArray().length).toBe(4)
})
