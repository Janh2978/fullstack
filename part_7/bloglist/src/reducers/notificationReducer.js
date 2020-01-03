const reducer = (state = {}, action) => {
  switch(action.type) {
  case 'ADD_NOTIFICATION':
    return {
      text: action.data.text,
      type: action.data.type
    }
  case 'REMOVE_NOTIFICATION':
    return ''
  default:
    return state
  }
}

export const setNotification = (message) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, 5000)
  }
}

export default reducer