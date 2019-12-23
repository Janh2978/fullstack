const reducer = (state = '', action) => {
  switch(action.type) {
    case 'NEW_FILTER':
      return action.data.value
    default:
      return state
  }
}

export const newFilter = (value) => {
  return {
    type: 'NEW_FILTER',
    data: { value }
  }
}

export default reducer