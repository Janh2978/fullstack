import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SimpleBlog from './SimpleBlog'

test('renders title, author and amount of likes', () => {
  const blog = {
    title: 'titulo',
    author: 'autor',
    likes: 0
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={() => {console.log('asd')}}/>
  )

  const titleAuthor = component.container.querySelector('.titleAuthor')
  expect(titleAuthor).toHaveTextContent(
    'titulo autor'
  )

  const likesOnclick = component.container.querySelector('.likesOnclick')
  expect(likesOnclick).toHaveTextContent(
    'blog has 0 likes'
  )
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'titulo',
    author: 'autor',
    likes: 0
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})