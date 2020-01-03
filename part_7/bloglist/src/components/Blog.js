import React from 'react'
import { connect } from 'react-redux'

import { Form, List, Header } from 'semantic-ui-react'

import { updateBlog, removeBlog, addComentBlog } from './../reducers/blogReducer'

import { useField } from './../hooks'

import {
  withRouter
} from 'react-router-dom'

const RemoveH = (props) => {
  const onClick = (e) => {
    e.preventDefault()
    props.remove(props.blog.id, props.blog.title, props.blog.author)
    props.history.push('/')
  }

  return (
    <div>
      <button onClick={onClick} data-cy='remove'>remove</button>
    </div>
  )
}
const Remove = withRouter(RemoveH)

const Blog = (props) => {
  const comment = useField('text')

  const likeBlog = async () => {
    await props.updateBlog(props.blog.id, {
      title: props.blog.title,
      author: props.blog.author,
      url: props.blog.url,
      likes: props.blog.likes + 1,
      user: props.blog.user.id? props.blog.user.id : props.blog.user
    })
  }

  const remove = async () => {
    if (window.confirm(`remove blog ${props.blog.title} by ${props.blog.author}`)) await props.removeBlog(props.blog.id)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await props.addComentBlog(props.blog.id, {
      comment: comment.value
    })
    comment.reset()
  }

  if (props.blog === undefined) {
    return null
  }

  return (
    <div>
      <Header as='h1'>{props.blog.title}</Header>
      <p>{props.blog.url}</p>
      <div>{props.blog.likes}<button onClick={() => {likeBlog(props.blog.id)}} data-cy='like'>like</button></div>
      <div>added by {props.blog.user.id ? props.blog.user.name : props.user.name}</div>
      {
        !props.blog.user.id || props.blog.user.username === props.user.username
          ? <Remove blog={props.blog} remove={remove} />
          : null
      }
      <div>
        <Header as='h2'>comments</Header>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <input id='comment' {...comment.input}/>
            <button type='submit' data-cy='addComment'>add comment</button>
          </Form.Field>
        </Form>
        <List>
          {
            props.blog.comments.map((c, i) =>
              <List.Item key={i}>{c}</List.Item>
            )
          }
        </List>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  updateBlog,
  removeBlog,
  addComentBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)