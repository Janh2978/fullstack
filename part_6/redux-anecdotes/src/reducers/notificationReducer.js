const reducer = (state = '', action) => {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
      return action.data.message
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      data: { message }
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, time*1000)
  }
}

export default reducer