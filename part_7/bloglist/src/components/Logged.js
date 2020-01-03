import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Header, Menu } from 'semantic-ui-react'

import {
  BrowserRouter as Router,
  Route, withRouter, Link
} from 'react-router-dom'

import BlogForm from './BlogForm'
import Notification from './Notification'
import Users from './Users'
import User from './User'

import userService from './../services/user'

import { logoutUser } from './../reducers/userReducer'
import Blog from './Blog'

const LogoutH = (props) => {
  const logOut = (e) => {
    e.preventDefault()
    props.logoutUser()
    props.history.push('/')
  }

  return (
    <div onClick={logOut}>Logout</div>
  )
}
const Logout = withRouter(LogoutH)

const Logged = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    (async () => {
      setUsers(await userService.getAll())
    })()
  }, [props.blogs])

  const userById = (id) => users.find(u => u.id === id)
  const blogById = (id) => props.blogs.find(b => b.id === id)

  return (
    <Container>
      <Router>
        <div>
          <Menu>
            <Menu.Item link>
              <Link to="/">blogs</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to="/users">users</Link>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                {props.user.name} logged in
              </Menu.Item>
              <Menu.Item link>
                <Logout logoutUser={props.logoutUser} />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <Notification />
          <Header as='h2'>Blog App</Header>
        </div>
        <Route exact path="/" render={() => <BlogForm />} />
        <Route exact path="/users" render={() => <Users users={users}/>} />
        <Route exact path="/users/:id" render={({ match }) =>
          <User user={userById(match.params.id)} />
        } />
        <Route exact path="/blog/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)}/>
        } />
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  logoutUser
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logged)