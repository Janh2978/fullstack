import blogService from './../services/blog'
import loginService from './../services/login'

const reducer = (state = {}, action) => {
  switch(action.type) {
  case 'SIGN_IN':
    return action.data
  case 'SIGN_OUT':
    return {}
  default:
    return state
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      dispatch({
        type: 'SIGN_IN',
        data: loggedUser
      })
    }
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch({
      type: 'SIGN_IN',
      data: user
    })
  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'SIGN_OUT'
    })
  }
}


export default reducer