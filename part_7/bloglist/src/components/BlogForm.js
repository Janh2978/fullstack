import React from 'react'
import { connect } from 'react-redux'

import { Form, Button, Header } from 'semantic-ui-react'

import { useField } from '../hooks'

import Togglable from './Togglable'
import BlogList from './BlogList'

import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {
  const blogFormRef = React.createRef()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const onSubmit = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      await props.addBlog({
        title: title.value,
        author: author.value,
        url: url.value
      })
      title.reset()
      author.reset()
      url.reset()
      props.setNotification({
        text: `a new blog ${title.value} by ${author.value}`,
        type: 'success'
      })
    } catch(exception) {
      console.log(exception)
    }
  }

  return (
    <>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <div>
          <Header as='h2'>Create new</Header>
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <label>title:</label>
              <input id='title' {...title.input} /><br></br>
            </Form.Field>
            <Form.Field>
              <label>author:</label>
              <input id='author' {...author.input} /><br></br>
            </Form.Field>
            <Form.Field>
              <label>url:</label>
              <input id='url' {...url.input} /><br></br>
            </Form.Field>
            <Button type="submit" data-cy='create'>create</Button>
          </Form>
        </div>
      </Togglable>
      <BlogList user={props.user}/>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  addBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogForm)