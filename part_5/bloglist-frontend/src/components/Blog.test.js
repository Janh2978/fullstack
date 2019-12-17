import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

test('renders only name and author', () => {
  const blog = {
    title: 'titulo',
    author: 'autor',
    likes: 0,
    id: '3ded'
  }

  const component = render(
    <Blog
      blog={blog}
      user={{ name: 'nombre', username: 'nombreusuario' }}
      update={() => { console.log('update') }}
      remove={() => { console.log('remove') }}
      currentUser={{ username: 'nombreusuario' }}/>
  )

  const visibleDefault = component.container.querySelector('.visibleDefault')
  expect(visibleDefault).toHaveTextContent(
    'titulo autor'
  )

  const visibleClick = component.container.querySelector('.visibleClick')
  expect(visibleClick).toHaveStyle('display: none')
})

test('clicking the button makes blog post visible', () => {
  const blog = {
    title: 'titulo',
    author: 'autor',
    likes: 0,
    id: '3ded'
  }

  const component = render(
    <Blog
      blog={blog}
      user={{ name: 'nombre', username: 'nombreusuario' }}
      update={() => { console.log('update') }}
      remove={() => { console.log('remove') }}
      currentUser={{ username: 'nombreusuario' }}/>
  )
  const visibleDefault = component.container.querySelector('.visibleDefault')
  fireEvent.click(visibleDefault)

  const visibleClick = component.container.querySelector('.visibleClick')
  expect(visibleClick).not.toHaveStyle('display: none')
})