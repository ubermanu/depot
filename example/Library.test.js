import { mount } from 'dainte'
import { tick } from 'svelte'

test('create a book', async () => {
  const { window, document } = await mount('./example/Library.svelte')

  expect(document.querySelectorAll('.book').length).toBe(0)

  const author = document.querySelector('[name="author"]')
  author.value = 'Marcel Pagnol'
  author.dispatchEvent(new window.Event('input'))

  const title = document.querySelector('[name="author"]')
  title.value = 'La gloire de mon père'
  title.dispatchEvent(new window.Event('input'))

  await tick()

  document.querySelector('form').submit()

  await tick()

  expect(document.querySelectorAll('.book').length).toBe(1)
})
