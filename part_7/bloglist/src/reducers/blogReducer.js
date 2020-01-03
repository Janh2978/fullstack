import blogService from './../services/blog'

const reducer = (state = [], action) => {
  switch(action.type) {
  case 'UPDATE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data.blogUpdated
    )
  case 'COMMENT_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data.blogCommented
    )
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}
export const addBlog = (newObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (id, newObj) => {
  return async dispatch => {
    const blogUpdated = await blogService.update(id, newObj)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { id, blogUpdated }
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export const addComentBlog = (id, commentObj) => {
  return async dispatch => {
    const blogCommented = await blogService.addComment(id, commentObj)
    dispatch({
      type: 'COMMENT_BLOG',
      data: { id, blogCommented }
    })
  }
}

export default reducer