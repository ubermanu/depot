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

test('the repo can update elements', () => {
  const items = depot()
  items.add({}, {})

  const one = items.first()
  items.update({ ...one, custom_prop: '456789' })

  expect(items.toArray().length).toBe(2)
  expect(items.first()).toHaveProperty('custom_prop')
  expect(items.first().custom_prop).toBe('456789')
})

test('the repo can remove elements', () => {
  const items = depot()
  items.add({}, {}, {}, {}, {}, {})

  const head = items.first()
  const tail = items.last()

  expect(items.toArray().length).toBe(6)

  items.remove(head)
  expect(items.toArray().length).toBe(5)

  items.remove(tail.id)
  expect(items.toArray().length).toBe(4)
})
