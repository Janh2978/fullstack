import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import LoginForm from './components/LoginForm'
import Logged from './components/Logged'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeBlogs()
    props.setUser()
  }, [])

  return (
    <div>
      <div>
        {
          props.user.token === undefined
            ? <LoginForm />
            : <Logged />
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setUser
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)