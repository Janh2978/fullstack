import React from 'react'
import { connect } from 'react-redux'

import { Form, Button, Header, Container } from 'semantic-ui-react'

import { useField } from '../hooks'

import { setNotification } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

import Notification from './Notification'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username.value,
      password: password.value
    }
    username.reset()
    password.reset()
    try {
      await props.loginUser(credentials)
    } catch (exception) {
      console.log(exception)
      props.setNotification({
        text: 'wrong username or password',
        type: 'error'
      })
    }
  }

  return (
    <>
      <Container>
        <Header as='h1'>log in to application</Header>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>username</label>
            <input id='username' {...username.input}/>
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input id='password' {...password.input}/>
          </Form.Field>
          <Button type='submit' data-cy='submit'>login</Button>
        </Form>
      </Container>
    </>
  )
}

const mapDispatchToProps = {
  setNotification,
  loginUser
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)