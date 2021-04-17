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
