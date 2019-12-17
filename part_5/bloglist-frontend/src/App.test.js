import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blog')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const loginButton = component.getByText('login')
    expect(loginButton).toBeDefined()

    const blogs = component.container.querySelector('.blog')
    expect(blogs).toBe(null)
  })

  test('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    localStorage.setItem('loggedUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    component.debug()

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(10)
  })
})